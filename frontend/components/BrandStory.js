import { useState } from 'react';
import styles from '../styles/BrandStory.module.css';

const BrandStory = () => {
  const [activeCard, setActiveCard] = useState(0);

  const storyCards = [
    {
      id: 1,
      image: '/Cards_image_1.png',
      title: 'Ancient Wisdom',
      subtitle: 'Rooted in 5000 Years of Ayurveda',
      description: 'Every bottle carries the essence of time-tested Ayurvedic formulations, carefully preserved for modern wellness seekers.'
    },
    {
      id: 2,
      image: '/Cards_image_2.png',
      title: 'Modern Convenience',
      subtitle: 'Ready-to-Drink Wellness',
      description: 'Traditional herbs meet contemporary lifestyle. No brewing, no mixing - just open, sip, and experience authentic Ayurveda.'
    },
    {
      id: 3,
      image: '/Cards_image_3.png',
      title: 'Pure & Natural',
      subtitle: '100% Authentic Ingredients',
      description: 'Cold-pressed herbs, zero artificial additives, and small-batch production ensure every sip delivers genuine wellness.'
    }
  ];

  return (
    <section className={styles.brandStory}>
      <div className={`container ${styles.storyContainer}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Story</span>
          <h2 className={styles.title}>
            The <span className="text-gradient">RAVYA</span> Journey
          </h2>
          <p className={styles.subtitle}>
            From ancient Ayurvedic texts to your modern lifestyle
          </p>
        </div>

        {/* Large Featured Card */}
        <div className={styles.featuredCard}>
          <div className={styles.cardImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={storyCards[activeCard].image} 
              alt={storyCards[activeCard].title}
              className={styles.mainImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{storyCards[activeCard].title}</h3>
            <p className={styles.cardSubtitle}>{storyCards[activeCard].subtitle}</p>
            <p className={styles.cardDescription}>{storyCards[activeCard].description}</p>
          </div>
        </div>

        {/* Card Selector Dots */}
        <div className={styles.cardSelector}>
          {storyCards.map((card, index) => (
            <button
              key={card.id}
              className={`${styles.selectorDot} ${activeCard === index ? styles.active : ''}`}
              onClick={() => setActiveCard(index)}
              aria-label={`View ${card.title}`}
            >
              <span className={styles.dotLabel}>{card.title}</span>
            </button>
          ))}
        </div>

        {/* All Cards Grid */}
        <div className={styles.cardsGrid}>
          {storyCards.map((card, index) => (
            <div 
              key={card.id}
              className={`${styles.storyCard} ${activeCard === index ? styles.activeStoryCard : ''}`}
              onClick={() => setActiveCard(index)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.cardImageSmall}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.title} />
                <div className={styles.cardOverlay}>
                  <span className={styles.readMore}>Read More →</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h4>{card.title}</h4>
                <p>{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Values */}
        <div className={styles.brandValues}>
          <div className={styles.value}>
            <div className={styles.valueIcon}>🌿</div>
            <h5>Authenticity</h5>
            <p>Real Ayurvedic herbs, no shortcuts</p>
          </div>
          <div className={styles.value}>
            <div className={styles.valueIcon}>💚</div>
            <h5>Transparency</h5>
            <p>What you see is what you get</p>
          </div>
          <div className={styles.value}>
            <div className={styles.valueIcon}>✨</div>
            <h5>Quality</h5>
            <p>Small-batch, cold-pressed excellence</p>
          </div>
          <div className={styles.value}>
            <div className={styles.valueIcon}>🎯</div>
            <h5>Purpose</h5>
            <p>Wellness that fits your lifestyle</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

