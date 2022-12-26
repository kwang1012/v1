import { Box, useTheme, Tooltip } from '@mui/material';
import gsap from 'gsap';
import { useRef } from 'react';
import styles from 'styles/PublicationCard.module.scss';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function PublicationCard({ pub, index }) {
  const theme = useTheme();

  const ref = useRef();

  useEffect(() => {
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'play none none none',
      },
      // x: '-100vw',
      y: '50px',
      duration: 1,
      opacity: 0,
      delay: (index % 2) * 0.2,
    });
  }, []);

  return (
    <Box
      ref={ref}
      className={styles.writingCard}
      bgcolor="card.background"
      style={{ boxShadow: theme.palette.shadow }}
      onClick={
        pub.link
          ? () => {
              window.open(pub.link, '_blank');
            }
          : () => {}
      }
    >
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          <span className={styles.tag}>{pub.venueShort}</span>
          <span className={styles.tag}>{pub.author}</span>
        </div>
        <Tooltip title={pub.title}>
          <div className={styles.title}>{pub.title}</div>
        </Tooltip>
        <div className={styles.content}>{pub.abstract}</div>
      </div>
    </Box>
  );
}
