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
];

const works = [
    0, 1, 2
];

const writings = [
    {
        title: 'Using Nest.js to build a well-structured backend project.',
        tags: ['nest.js']
    },
    {
        title: 'DAG scheduling in the AI world.',
        tags: ['research', 'DAG']
    },
    {
        title: 'Flutter: Create a beautiful cross-platform mobile app in hours.',
        tags: ['Flutter', 'APP']
    }
];

export default function HomeView() {

    const boxRef = useRef();
    const hiRef = useRef();
    const textRef = useRef();
    const cursorRef = useRef();

    const workRef = useRef();
    const writingRef = useRef();
    const contactRef = useRef();

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

    function scrollIntoView(target) {
        const bodyRect = document.body.getBoundingClientRect().top;
        const offset = 20;
        window.scrollTo({
            top: target.getBoundingClientRect().top - bodyRect - offset,
            behavior: 'smooth'
        });;
    }

    function scrollTo(where) {
        switch (where) {
            case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'work':
                scrollIntoView(workRef.current);
                break
            case 'writing':
                scrollIntoView(writingRef.current);
                break;
            case 'contact':
                scrollIntoView(contactRef.current);
                break;;
        }
    }

    return (
        <>
            <Nav scrollTo={scrollTo} />
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
                <div className={styles.work} ref={workRef}>
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span>01.</span> Works
                    </h1>
                    <div className={styles.workList}>
                        <div className={styles.workCard} style={{ backgroundColor: theme.palette.cardBackground, boxShadow: theme.palette.boxShadow }}>

                        </div>
                        <div className={styles.workCard} style={{ backgroundColor: theme.palette.cardBackground, boxShadow: theme.palette.boxShadow }}>

                        </div>
                        <div className={styles.workCard} style={{ backgroundColor: theme.palette.cardBackground, boxShadow: theme.palette.boxShadow }}>

                        </div>
                    </div>
                </div>
                <div className={styles.writing} ref={writingRef}>
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span>02.</span> Writings
                    </h1>
                    <div className={styles.writingList}>
                        {
                            writings.map((writing, i) => {
                                return (
                                    <div key={i} className={styles.writingCard} style={{ backgroundColor: theme.palette.cardBackground, boxShadow: theme.palette.boxShadow }}>
                                        <div className={styles.wrapper}>
                                            <div className={styles.tags}>
                                                {
                                                    writing.tags.map((tag, tid) => {
                                                        return <span key={tid} className={styles.tag}>{tag}</span>
                                                    })
                                                }
                                            </div>
                                            <div className={styles.title} style={{ color: theme.palette.bodyConstract }}>
                                                {writing.title}
                                            </div>
                                            <div className={styles.content}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className={styles.contact} ref={contactRef}>
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span>03.</span> Contact
                    </h1>
                </div>
            </main>
            <Footer />
        </>
    );
}