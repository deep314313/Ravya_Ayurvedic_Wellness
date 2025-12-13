import Image from 'next/image';
import styles from '../styles/AyurvedicScience.module.css';

const AyurvedicScience = () => {
  const points = [
    {
      icon: '🌿',
      title: 'Food as Medicine',
      description: 'Ayurveda teaches that the right foods and herbs can prevent and heal. Our drinks embody this ancient principle.'
    },
    {
      icon: '⚡',
      title: 'Convenient Functionality',
      description: 'No brewing or prep time. Get the benefits of traditional Ayurvedic formulations in a ready-to-drink format.'
    },
    {
      icon: '🔬',
      title: 'Better Than Supplements',
      description: 'Whole herb extracts in liquid form offer superior absorption compared to pills or capsules.'
    }
  ];

  return (
    <section className={styles.science} id="ayurvedic-science">
      <div className={`container ${styles.scienceContainer}`}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.herbsIllustration}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/ayurvedic_image_section.png" 
                alt="Ayurvedic Herbs and Ingredients" 
                className={styles.ayurvedicImage}
              />
            </div>
          </div>

          <div className={styles.right}>
            <h2 className={styles.title}>
              Why Ayurvedic <br />
              <span className="text-gradient">Functional Drinks?</span>
            </h2>

            <p className={styles.description}>
              Modern science is finally catching up to what Ayurveda has known for 
              5,000 years: plants and herbs contain powerful compounds that support 
              our body&apos;s natural healing abilities. We&apos;ve made it delicious and 
              effortless to tap into this wisdom every single day.
            </p>

            <div className={styles.points}>
              {points.map((point, index) => (
                <div key={index} className={styles.point}>
                  <div className={styles.pointIcon}>{point.icon}</div>
                  <div className={styles.pointContent}>
                    <h4 className={styles.pointTitle}>{point.title}</h4>
                    <p className={styles.pointDescription}>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.badges}>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                <span>FSSAI Compliant</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                <span>Non-GMO</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                <span>No Artificial Colors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AyurvedicScience;

