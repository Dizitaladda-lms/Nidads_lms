import styles from './Hero7.module.css';

const Hero7 = () => {
  const cards = [
    {
      id: 1,
      image: encodeURI('/studentImages/Abhishek Rawat .png'),
      number: '25000+',
      label: 'Happy Students'
    },
    {
      id: 2,
      image: '/whyChooseUs/growth partners.webp',
      number: '18+',
      label: 'Industry Partners'
    },
    {
      id: 3,
      image: '/whyChooseUs/clients.webp',
      number: '30+',
      label: 'Happy Alumni'
    },
    {
      id: 4,
      image: '/whyChooseUs/learning module.webp',
      number: '150+',
      label: 'Learning Modules'
    }
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          {/* <div className={styles.badge}>
            <span className={styles.badgeIcon}>🎯</span>
            <span className={styles.badgeText}>Why Choose Us</span>
          </div> */}
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.description}>
            Our programs combine hands-on projects, expert mentorship, and a flexible schedule.<br/> <b>Practical curriculum,</b><b> Career support,</b><b> Industry-relevant tools,</b> and <b>lifelong community</b> to launch your data career.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.videoContainer}>
                <img
                  className={styles.video}
                  src={card.image}
                  alt={card.label}
                  width={320}
                  height={240}
                />
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                  <p className={styles.number}>{card.number}</p>
                  <p className={styles.label}>{card.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero7;