import styles from '../styles/TrustStrip.module.css';

const TrustStrip = () => {
  const benefits = [
    {
      icon: '🌿',
      title: 'Ayurvedic Formulations',
      description: 'Traditional recipes'
    },
    {
      icon: '🚫',
      title: 'No Added Sugar',
      description: 'Natural sweetness only'
    },
    {
      icon: '❄️',
      title: 'Cold-Pressed',
      description: 'Retains nutrients'
    },
    {
      icon: '🔬',
      title: 'Clinically Inspired',
      description: 'Science-backed herbs'
    },
    {
      icon: '🇮🇳',
      title: 'Made in India',
      description: 'With love & care'
    }
  ];

  return (
    <section className={styles.trustStrip}>
      <div className={`container ${styles.trustContainer}`}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.trustItem}>
            <div className={styles.icon}>{benefit.icon}</div>
            <div className={styles.content}>
              <h4 className={styles.title}>{benefit.title}</h4>
              <p className={styles.description}>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;

