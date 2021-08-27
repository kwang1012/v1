import styles from 'styles/WorkCard.module.scss';
import LanguageIcon from '@material-ui/icons/Language';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { useTheme } from '@material-ui/core';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function WorkCard({ work, index, sectionRef }) {

    const theme = useTheme();
    const ref = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                toggleActions: 'play none none none',
                // scrub: true,
                start: 'top top',
                end: 'bottom',
                // markers: true
            }
        })
            .from(ref.current, {
                rotate: 360,
                x: '-100vw',
                duration: 2,
            });
    }, []);

    return (
        <div className={styles.workCard} style={{ backgroundColor: work.color, boxShadow: theme.palette.boxShadow }} ref={ref} onClick={work.action}>
            {
                {
                    'web': <LanguageIcon style={{ fontSize: '30px' }} />,
                    'app': <WhatshotIcon style={{ fontSize: '30px' }} />,
                    'plane': <FlightTakeoffIcon style={{ fontSize: '30px' }} />
                }[work.icon]
            }
            <h2>{work.name}</h2>
            <h4>{work.description}</h4>
        </div>
    )
}