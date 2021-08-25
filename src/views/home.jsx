import Nav from 'src/components/nav';
import styles from 'styles/home.module.scss';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { useTheme } from '@material-ui/styles';
import Footer from 'src/components/footer';

gsap.registerPlugin(TextPlugin);

const words = [
    'Kai Wang.',
    'A Computer Scientist.',
    'A Software Engineer.'
]

export default function HomeView() {

    const boxRef = useRef();
    const hiRef = useRef();
    const textRef = useRef();
    const cursorRef = useRef();

    const theme = useTheme();

    useEffect(() => {
        gsap.to(cursorRef.current, { opacity: 0, ease: 'power2.inOut', repeat: -1 });
        let boxTL = gsap.timeline();
        boxTL.to(boxRef.current, { duration: 1, width: '17vw', delay: 0.5, ease: 'power4.inOut' })
            .from(hiRef.current, {
                duration: 1, y: '5vw', ease: 'power3.out', onComplete: () => {
                    masterTL.play();
                }
            });
        let masterTL = gsap.timeline({ repeat: -1 }).pause();
        words.forEach(word => {
            let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tl.to(textRef.current, { duration: 1, text: word });
            masterTL.add(tl);
        });
    }, []);
    return (
        <>
            <Nav />
            <main className={styles.main} style={{ backgroundColor: theme.palette.backgroundColor }}>
                <div className={styles.header}>
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span className={styles.box} ref={boxRef}></span>
                        <span className={styles.hi} ref={hiRef}>Hi, I'm</span>
                        <span className={styles.text} ref={textRef}></span>
                        <span className={styles.cursor} ref={cursorRef}>_</span>
                    </h1>
                    <h2>
                        I'm currently a graduate student at NTHU.<br />
                        I major in DAG scheduling algo. in DL.<br />
                        Also, I work at Skymizer as an intern & focus on optimizing the performance of DL inference.
                    </h2>
                </div>
                <div className={styles.work}>

                </div>
            </main>
            <Footer />
        </>
    );
}