import styles from '../styles/HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: '🎯',
      title: 'Choose Your Focus',
      description: 'Pick Immunity, Sugar Balance, or Heart Health based on your wellness goals'
    },
    {
      number: '02',
      icon: '🥤',
      title: 'Drink Daily',
      description: 'Enjoy 1 bottle after meals or as recommended. It\'s that simple!'
    },
    {
      number: '03',
      icon: '✨',
      title: 'Feel the Difference',
      description: 'Experience the benefits of Ayurveda over 30 days of consistent use'
    }
  ];

  return (
    <section className={styles.howItWorks} id="how-it-works">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className={styles.subtitle}>
            Ayurvedic wellness made incredibly simple
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,10 L100,10" stroke="#F4B942" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                    <polygon points="95,5 100,10 95,15" fill="#F4B942" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.disclaimer}>
          <p>
            * These statements have not been evaluated by medical authorities. 
            This product is not intended to diagnose, treat, cure, or prevent any disease. 
            Consult your healthcare provider before use, especially if you have existing conditions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

