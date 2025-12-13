import { useState, useEffect } from 'react';
import styles from '../styles/Reviews.module.css';

const Reviews = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultReviews = [
    {
      customerName: 'Priya Sharma',
      rating: 5,
      comment: 'The Golden Turmeric drink is amazing! I have been drinking it for 2 weeks and already feel more energetic. No artificial taste at all.',
      verified: true
    },
    {
      customerName: 'Rajesh Kumar',
      rating: 5,
      comment: 'As a diabetic, the Jamun Lemon Balance has been a game changer. Helps me manage my sugar levels naturally. Highly recommend!',
      verified: true
    },
    {
      customerName: 'Ananya Desai',
      rating: 4,
      comment: 'Love the Beetroot Heart Balance! Tastes great and I feel the difference in my stamina during workouts.',
      verified: true
    },
    {
      customerName: 'Vikram Malhotra',
      rating: 5,
      comment: 'Finally, Ayurvedic drinks that actually taste good! The convenience of ready-to-drink format is perfect for my busy lifestyle.',
      verified: true
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  if (!isClient) return null;

  return (
    <section className={styles.reviews} id="reviews">
      <div className={`container ${styles.reviewsContainer}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className={styles.subtitle}>
            Real people, real results. Join thousands experiencing Ayurvedic wellness.
          </p>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>10,000+</span>
            <span className={styles.metricLabel}>Bottles Enjoyed</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>4.8</span>
            <span className={styles.metricLabel}>Average Rating</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>95%</span>
            <span className={styles.metricLabel}>Would Recommend</span>
          </div>
        </div>

        <div className={styles.slider}>
          <button 
            onClick={prevReview} 
            className={styles.sliderButton}
            aria-label="Previous review"
          >
            ←
          </button>

          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`${styles.star} ${i < displayReviews[currentIndex].rating ? styles.filled : ''}`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className={styles.comment}>
              "{displayReviews[currentIndex].comment}"
            </p>

            <div className={styles.reviewer}>
              <div className={styles.reviewerAvatar}>
                {displayReviews[currentIndex].customerName.charAt(0)}
              </div>
              <div className={styles.reviewerInfo}>
                <h4 className={styles.reviewerName}>
                  {displayReviews[currentIndex].customerName}
                </h4>
                {displayReviews[currentIndex].verified && (
                  <span className={styles.verified}>
                    ✓ Verified Customer
                  </span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={nextReview} 
            className={styles.sliderButton}
            aria-label="Next review"
          >
            →
          </button>
        </div>

        <div className={styles.dots}>
          {displayReviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

