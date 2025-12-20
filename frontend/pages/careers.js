import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitCareerApplication } from '../utils/api';
import styles from '../styles/Careers.module.css';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Video Editor Intern (Remote) – Ravya Health',
    coverLetter: ''
  });
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'Resume file size should be less than 5MB' });
        return;
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setStatus({ type: 'error', message: 'Please upload PDF or Word document only' });
        return;
      }

      setResume(file);
      setResumePreview(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('coverLetter', formData.coverLetter);
      
      // Append resume file if selected
      if (resume) {
        formDataToSend.append('resume', resume);
      }

      const response = await submitCareerApplication(formDataToSend);
      setStatus({ type: 'success', message: response.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: 'Video Editor Intern (Remote) – Ravya Health',
        coverLetter: ''
      });
      setResume(null);
      setResumePreview(null);
      // Reset file input
      const fileInput = document.getElementById('resume');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit application. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Careers at Ravya | Join Our Team</title>
        <meta name="description" content="Join Ravya Health - We&apos;re looking for creative interns. Apply for Video Editor Intern position (Remote)." />
      </Head>

      <Navbar />
      
      <main className={styles.careersPage}>
        <section className={styles.hero}>
          <div className={`container ${styles.container}`}>
            <h1 className={styles.heroTitle}>
              Join the <span className="text-gradient">Ravya</span> Team
            </h1>
            <p className={styles.heroSubtitle}>
              We&apos;re building the future of Ayurvedic wellness. Come grow with us!
            </p>
          </div>
        </section>

        <section className={styles.jobListing}>
          <div className={`container ${styles.container}`}>
            <div className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <div className={styles.jobBadge}>🎥 Video Editor Intern (Remote) – Ravya Health</div>
                <div className={styles.jobMeta}>
                  <span>📍 Remote</span>
                  <span>⏱️ 2 Months</span>
                  <span>💰 ₹2,000/month + incentives</span>
                </div>
              </div>

              <div className={styles.jobContent}>
                <div className={styles.section}>
                  <h3>Internship Details</h3>
                  <ul>
                    <li><strong>Duration:</strong> 2 Months</li>
                    <li><strong>Mode:</strong> Remote</li>
                    <li><strong>Stipend:</strong> ₹2,000/month + performance-based incentives</li>
                    <li><strong>Type:</strong> Internship (Hands-on, learning-focused)</li>
                  </ul>
                </div>

                <div className={styles.section}>
                  <h3>🏢 Company Description</h3>
                  <p>
                    Ravya Health is a modern Ayurvedic wellness startup focused on building functional ready-to-drink health beverages for everyday use. The brand blends Ayurvedic ingredients with simple, modern formats to address common health needs such as sugar balance, immunity, and heart health.
                  </p>
                  <p>
                    Ravya is currently in the research and prototype stage, working on product formulation, taste development, and early brand building. We are looking for creative interns who want to learn and grow with an early-stage wellness brand.
                  </p>
                </div>

                <div className={styles.section}>
                  <h3>🎯 Role Description</h3>
                  <p>
                    We are looking for a Video Editor Intern / Reel Maker to create short-form video content for social media platforms such as Instagram Reels and Shorts.
                  </p>
                  <p>
                    You will collaborate remotely with the founding team to turn raw clips into engaging, well-paced videos that tell simple and relatable stories around health, ingredients, and brand concepts.
                  </p>
                </div>

                <div className={styles.section}>
                  <h3>🛠️ Key Responsibilities</h3>
                  <ul>
                    <li>Edit short-form videos (Reels, Shorts)</li>
                    <li>Basic color correction and visual enhancement</li>
                    <li>Add captions, text overlays, transitions, and simple motion effects</li>
                    <li>Convert raw footage into engaging storytelling content</li>
                    <li>Maintain consistency with brand style</li>
                    <li>Experiment with trends and reel formats</li>
                  </ul>
                </div>

                <div className={styles.section}>
                  <h3>✅ Requirements (Basic & Practical)</h3>
                  <ul>
                    <li>Basic understanding of video editing (mobile or desktop)</li>
                    <li>Familiarity with tools like: CapCut / VN / InShot / Adobe Premiere Pro (any one)</li>
                    <li>AI-based video editing tools are welcome</li>
                    <li>Understanding of storytelling, framing, and pacing</li>
                    <li>Ability to create engaging short videos</li>
                    <li>Creativity, consistency, and willingness to learn</li>
                    <li>Interest in health, wellness, or content creation is a plus</li>
                    <li><strong>No prior professional experience required</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.applicationForm}>
          <div className={`container ${styles.container}`}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Apply Now</h2>
              <p className={styles.formSubtitle}>
                Fill in your details below. We&apos;ll review your application and get back to you soon!
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="position">Position *</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      readOnly
                      className={styles.readOnly}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resume">Resume (Optional)</label>
                  <div className={styles.fileUpload}>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                    />
                    <label htmlFor="resume" className={styles.fileLabel}>
                      {resumePreview || 'Choose file (PDF or Word, max 5MB)'}
                    </label>
                  </div>
                  {resumePreview && (
                    <p className={styles.filePreview}>✓ {resumePreview}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="coverLetter">Cover Letter / Message (Optional)</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us why you&apos;re interested in this position..."
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`${styles.status} ${styles[status.type]}`}>
                    {status.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

