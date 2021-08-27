import { Box, useTheme } from '@material-ui/core';
import gsap from 'gsap';
import { useRef } from 'react';
import styles from 'styles/WritingCard.module.scss';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function WritingCard({ writing, index }) {

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
            delay: (index % 2) * 0.2
        })
    }, [])

    return (
        <Box ref={ref} className={styles.writingCard} bgcolor='card.background' style={{ boxShadow: theme.palette.shadow }}>
            <div className={styles.wrapper}>
                <div className={styles.tags}>
                    {
                        writing.tags.map((tag, tid) => {
                            return <span key={tid} className={styles.tag}>{tag}</span>
                        })
                    }
                </div>
                <div className={styles.title}>
                    {writing.title}
                </div>
                <div className={styles.content}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
        </Box>
    )
}