import styles from '../styles/Story.module.css';

const Story = () => {
  return (
    <section className={styles.story} id="about">
      <div className={`container ${styles.storyContainer}`}>
        <div className={styles.storyContent}>
          <div className={styles.storyLeft}>
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/ancient_image.png" 
                alt="Ancient Ayurvedic Wellness - RAVYA" 
                className={styles.lifestyleImage}
              />
              <div className={styles.decorCircle} style={{ backgroundColor: '#F4B942' }}></div>
              <div className={styles.decorCircle2} style={{ backgroundColor: '#6B2E7A' }}></div>
            </div>
          </div>

          <div className={styles.storyRight}>
            <h2 className={styles.storyTitle}>
              Ancient Ayurveda, <br />
              <span className="text-gradient">Modern Ready-to-Drink</span>
            </h2>

            <p className={styles.storyText}>
              We&apos;ve taken time-honored Ayurvedic recipes passed down through generations 
              and transformed them into convenient, delicious wellness drinks. No more 
              brewing, mixing, or measuring – just open, sip, and feel the difference.
            </p>

            <div className={styles.promise}>
              <h4 className={styles.promiseTitle}>Our Ayurvedic Promise</h4>
              <ul className={styles.promiseList}>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Only pure, ethically-sourced Ayurvedic herbs and botanicals</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Science-backed formulations with traditional wisdom</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Small-batch production for maximum freshness and potency</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>No artificial colors, flavors, or preservatives</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>FSSAI approved and third-party tested for quality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;

