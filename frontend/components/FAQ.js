import { useState } from 'react';
import styles from '../styles/FAQ.module.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Are RAVYA drinks safe to consume daily?',
      answer: 'Yes, our drinks are formulated with natural Ayurvedic herbs and are safe for daily consumption. However, if you have any existing medical conditions or are pregnant/nursing, we recommend consulting your healthcare provider before use.'
    },
    {
      question: 'Do your drinks contain added sugar?',
      answer: 'No, RAVYA drinks contain zero added refined sugar. Any sweetness comes from natural fruit extracts and the inherent sugars present in the herbs and botanicals we use. Our formulations prioritize health over taste, though we\'ve worked hard to make them delicious!'
    },
    {
      question: 'How often should I drink RAVYA beverages?',
      answer: 'For optimal results, we recommend drinking one bottle daily, preferably after meals. Ayurvedic wellness works best with consistent use over 30-60 days. You can drink them at room temperature or chilled.'
    },
    {
      question: 'Who can drink RAVYA wellness drinks?',
      answer: 'Our drinks are suitable for adults aged 18+ looking to support their wellness naturally. They\'re especially beneficial for health-conscious individuals, those managing specific conditions (with doctor approval), and anyone seeking the benefits of Ayurveda without the hassle of preparation.'
    },
    {
      question: 'What is the shelf life of your drinks?',
      answer: 'Our cold-pressed drinks have a shelf life of 6 months when unopened and stored in a cool, dry place. Once opened, consume within 24 hours and keep refrigerated. Check the manufacturing date on each bottle.'
    },
    {
      question: 'Do you ship across India?',
      answer: 'Yes! We ship to all major cities and towns across India. Shipping typically takes 3-5 business days. Orders above ₹999 qualify for free shipping. We use cold chain logistics to ensure freshness.'
    },
    {
      question: 'What is your return and refund policy?',
      answer: 'We offer a 7-day return policy if you\'re not satisfied with your purchase. Products must be unopened and in original condition. For damaged or defective products, we offer full refunds or replacements. Contact our support team for assistance.'
    },
    {
      question: 'Are your products certified?',
      answer: 'Yes, all RAVYA products are FSSAI approved and manufactured in certified facilities following strict quality standards. We also conduct third-party testing for purity and potency.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={`container ${styles.faqContainer}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className={styles.subtitle}>
            Everything you need to know about RAVYA wellness drinks
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.contact}>
          <p>Still have questions?</p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-secondary"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

