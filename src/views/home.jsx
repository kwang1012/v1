import Nav from 'src/components/nav';
import styles from 'styles/home.module.scss';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { useTheme } from '@material-ui/styles';
import Footer from 'src/components/footer';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WritingCard from 'src/components/WritingCard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import WorkCard from 'src/components/WorkCard';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const words = [
    'Kai Wang.',
    'A Computer Scientist.',
    'A Software Engineer.'
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

    const headerRef = useRef();
    const workRef = useRef();
    const writingRef = useRef();
    const contactRef = useRef();

    const theme = useTheme();
    const themeValue = useSelector(state => state.theme.value);

    const mainRef = useRef();
    const q = gsap.utils.selector(mainRef);
    const moreRef = useRef();

    const works = [
        {
            name: 'KLEA',
            icon: 'web',
            color: '#B8E1FF',
            description: 'A express-like web server written in C++.',
            action: () => {
                window.open('https://github.com/bruce1198/klea.git', '_blank')
            }
        },
        {
            name: 'KKAPP',
            icon: 'app',
            color: '#F3C178',
            description: 'A personal side-project for trying new tech.',
            action: () => { }
        },
        {
            name: 'OverSea See',
            icon: 'plane',
            color: '#E8AEB7',
            description: 'A platform for students who\'d like to study abroad.',
            action: () => { }
        }
    ];

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

        let moreTL = gsap.timeline({ repeat: -1, yoyo: true });
        moreTL.from(moreRef.current, { y: '-5px', ease: 'power2.in', duration: 0.2 })
            .to(moreRef.current, { y: '5px', ease: 'power2.out', duration: 0.2 });

        const panels = q('section, header');
        gsap.to(panels, {
            yPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: mainRef.current,
                pin: true,
                start: 'top top',
                scrub: 1,
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    duration: { min: 0.1, max: 0.1 },
                    ease: 'power2.inOut'
                },
                pinSpacing: false,
                end: () => "+=" + (window.innerHeight * (panels.length - 1) + 100)
            }
        })

    }, []);

    function scrollIntoView(target) {
        const bodyRect = document.body.getBoundingClientRect().top;
        window.scrollTo({
            top: target.getBoundingClientRect().top - bodyRect,
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
            <main className={styles.main} style={{ backgroundColor: theme.palette.backgroundColor }} ref={mainRef}>
                <header className={styles.header} ref={headerRef}>
                    <h4></h4>
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
                    <h4 style={{ color: theme.palette.bodyConstract }}>
                        Scroll Down<br />
                        <ExpandMoreIcon ref={moreRef} />
                    </h4>
                </header>
                <section className={[styles.work, themeValue === 'dark' ? styles.darkCover : ''].join(' ')} ref={workRef}>
                    {/* <div className={styles.background}><img src="/images/work.jpg" /></div> */}
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span>01.</span> Works
                    </h1>
                    <div className={styles.workList}>
                        {
                            works.map((work, i) => <WorkCard work={work} index={i} key={i} sectionRef={ref => (workRef => ref)} />)
                        }
                    </div>
                </section>
                <section className={[styles.writing, themeValue === 'dark' ? styles.darkCover : ''].join(' ')} ref={writingRef}>
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span>02.</span> Writings
                    </h1>
                    <div className={styles.writingList}>
                        {
                            writings.map((writing, i) => <WritingCard writing={writing} index={i} key={i} />)
                        }
                    </div>
                </section>
                <section className={[styles.contact, themeValue === 'dark' ? styles.darkCover : ''].join(' ')} ref={contactRef}>
                    <h1 style={{ color: theme.palette.bodyConstract }}>
                        <span>03.</span> Contact
                    </h1>
                    <div className={styles.contactRow}>
                        <div className={styles.contactCard} style={{ backgroundColor: theme.palette.cardBackground, boxShadow: theme.palette.boxShadow }}>
                            <h1 style={{ color: theme.palette.bodyConstract }}>Drop me a line</h1>
                            <h2 style={{ color: theme.palette.bodyConstract }}>Name (required)</h2>
                            <TextField size="small" variant="outlined" className={styles.input} /><br />
                            <h2 style={{ color: theme.palette.bodyConstract }}>Email Address (required)</h2>
                            <TextField size="small" variant="outlined" className={styles.input} /><br />
                            <h2 style={{ color: theme.palette.bodyConstract }}>Message (required)</h2>
                            <TextField size="small" variant="outlined" className={styles.input} multiline={true} maxRows={3} /><br />
                            <Button className={styles.button} variant="outlined" color="primary">Send</Button>
                        </div>
                        <div className={styles.contactImage}></div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}