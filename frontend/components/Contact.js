import { useState } from 'react';
import { submitContact } from '../utils/api';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await submitContact(formData);
      setStatus({ type: 'success', message: response.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={`container ${styles.contactContainer}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className={styles.subtitle}>
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📧</div>
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:ravya.health@gmail.com" className={styles.infoLink}>
                    ravya.health@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <h4>Call Us</h4>
                  <a href="tel:+919868314313" className={styles.infoLink}>
                    +91 98683 14313
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <h4>Visit Us</h4>
                  <p>New Delhi, Delhi, India</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>⏰</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/919868314313?text=Hello%20RAVYA%2C%20I%20would%20like%20to%20know%20more%20about%20your%20Ayurvedic%20wellness%20drinks%21" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <span className={styles.whatsappIcon}>💬</span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className={styles.right}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className={styles.formRow}>
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

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us more about your inquiry..."
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
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

