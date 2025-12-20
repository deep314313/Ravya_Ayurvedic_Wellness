const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const CareerApplication = require('../models/CareerApplication');
const { 
  sendCareerApplicationNotificationToAdmin,
  sendCareerApplicationConfirmationToApplicant 
} = require('../utils/emailService');

// Configure multer for file upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PDF and Word documents
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'), false);
    }
  }
});

// Submit career application with file upload
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, position, coverLetter } = req.body;

    // Validation
    if (!name || !email || !phone || !position) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone, and position are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    let resumeData = null;

    // Upload resume to Cloudinary if provided
    if (req.file) {
      try {
        // Generate unique filename: name_phonenumber_timestamp
        const timestamp = Date.now();
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const sanitizedPhone = phone.replace(/[^0-9]/g, '');
        const fileExtension = req.file.originalname.split('.').pop();
        const publicId = `ravya_careers/${sanitizedName}_${sanitizedPhone}_${timestamp}`;

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw', // For PDF/DOC files
              public_id: publicId,
              folder: 'ravya_careers',
              use_filename: false,
              unique_filename: false
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(req.file.buffer);
        });

        resumeData = {
          fileName: req.file.originalname,
          cloudinaryUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          fileType: req.file.mimetype
        };

      } catch (uploadError) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to upload resume. Please try again.' 
        });
      }
    }

    // Create application
    const application = new CareerApplication({
      name,
      email,
      phone,
      position,
      resume: resumeData,
      coverLetter: coverLetter || ''
    });

    await application.save();

    // Send thank you email to applicant (don't wait for it)
    sendCareerApplicationConfirmationToApplicant(email, name, position)
      .catch(() => {});

    // Send notification to admin (don't wait for it)
    sendCareerApplicationNotificationToAdmin({
      name,
      email,
      phone,
      position,
      resume: resumeData ? { 
        fileName: resumeData.fileName, 
        fileType: resumeData.fileType,
        url: resumeData.cloudinaryUrl 
      } : null,
      coverLetter
    }).catch(() => {});

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully! We will review it and get back to you soon.' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all applications (admin only - simple password check)
router.get('/applications', async (req, res) => {
  try {
    // Simple password check via query parameter or header
    const adminPassword = req.query.password || req.headers['x-admin-password'];
    const requiredPassword = process.env.ADMIN_PASSWORD || 'ravya2026';
    
    if (adminPassword !== requiredPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Admin password required.' 
      });
    }
    
    const applications = await CareerApplication.find().sort({ appliedAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get application by ID
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await CareerApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Download resume by application ID (admin only) - Fetches from Cloudinary and serves with proper headers
router.get('/applications/:id/resume', async (req, res) => {
  try {
    // Simple password check
    const adminPassword = req.query.password || req.headers['x-admin-password'];
    const requiredPassword = process.env.ADMIN_PASSWORD || 'ravya2026';
    
    if (adminPassword !== requiredPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Admin password required.' 
      });
    }
    
    const application = await CareerApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    if (!application.resume || !application.resume.cloudinaryUrl) {
      return res.status(404).json({ success: false, message: 'Resume not found for this application' });
    }
    
    // Generate proper filename: name_phonenumber_timestamp.extension
    const originalFileName = application.resume.fileName || 'resume.pdf';
    const fileExtension = originalFileName.split('.').pop();
    const sanitizedName = application.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const sanitizedPhone = application.phone.replace(/[^0-9]/g, '');
    const timestamp = new Date(application.appliedAt).getTime();
    const fileName = `${sanitizedName}_${sanitizedPhone}_${timestamp}.${fileExtension}`;
    
    const fileType = application.resume.fileType || 'application/pdf';
    
    // Use the stored Cloudinary URL and ensure it's https
    let cloudinaryUrl = application.resume.cloudinaryUrl;
    
    // Ensure https protocol (Cloudinary secure_url should already be https, but double-check)
    if (!cloudinaryUrl.startsWith('https://')) {
      cloudinaryUrl = cloudinaryUrl.replace('http://', 'https://');
    }
    
    // Add download transformation to force download
    const downloadUrl = cloudinaryUrl.replace(
      '/upload/',
      '/upload/fl_attachment/'
    );
    
    // Parse URL and fetch using https module
    const https = require('https');
    const url = require('url');
    const parsedUrl = url.parse(downloadUrl);
    
    // Ensure we're using https
    if (parsedUrl.protocol !== 'https:') {
      return res.status(500).json({ 
        success: false, 
        message: 'Invalid URL protocol. HTTPS required.' 
      });
    }
    
    // Fetch file from Cloudinary
    https.get(downloadUrl, (cloudinaryRes) => {
      if (cloudinaryRes.statusCode !== 200) {
        return res.status(cloudinaryRes.statusCode).json({ 
          success: false, 
          message: 'Failed to fetch file from Cloudinary' 
        });
      }
      
      // Collect file data
      const chunks = [];
      cloudinaryRes.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      cloudinaryRes.on('end', () => {
        const fileBuffer = Buffer.concat(chunks);
        
        // Set proper headers for file download
        res.setHeader('Content-Type', fileType);
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);
        res.setHeader('Content-Length', fileBuffer.length);
        res.setHeader('Cache-Control', 'no-cache');
        
        // Send file buffer
        res.send(fileBuffer);
      });
    }).on('error', () => {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to download file. Please try again.' 
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

