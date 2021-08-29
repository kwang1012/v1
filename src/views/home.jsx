import Nav from 'src/components/nav';
import styles from 'styles/home.module.scss';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { useTheme } from '@material-ui/styles';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WritingCard from 'src/components/WritingCard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { Box, Button, TextField } from '@material-ui/core';
import WorkCard from 'src/components/WorkCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactCard from 'src/components/ContactCard';

const providers = ['facebook', 'instagram', 'twitter'];

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const words = [
    'Kai Wang.',
    'A Computer Scientist.',
    'A Software Engineer.'
];

const writings = [
    {
        title: 'Using Nest.js to build a well-structured backend project.',
        tags: ['nest.js'],
        action: () => {
            window.open('https://bruce1198.medium.com/using-nest-js-to-build-a-well-structured-backend-project-28d62054fa19', '_blank')
        }
    },
    {
        title: 'DAG scheduling in the AI world.',
        tags: ['research', 'DAG'],
        action: () => { }
    },
    {
        title: 'Flutter: Create a beautiful cross-platform mobile app in hours.',
        tags: ['Flutter', 'APP'],
        action: () => {
            window.open('https://bruce1198.medium.com/lets-learn-flutter-4054ea5c43a1', '_blank')
        }
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
                scrub: true,
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    duration: { min: 0.1, max: 0.6 },
                    ease: 'power2.out'
                },
                pinSpacing: false,
                end: () => "+=" + (window.innerHeight * (panels.length - 1))
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
    function goto(provider) {
        switch (provider) {
            case 'facebook':
                window.open(
                    'https://www.facebook.com/kwang871012',
                    '_blank' // <- This is what makes it open in a new window.
                );
                break
            case 'instagram':
                window.open(
                    'https://www.instagram.com/kwang871012',
                    '_blank' // <- This is what makes it open in a new window.
                );
                break;
            case 'twitter':
                window.open(
                    'https://twitter.com/kwang871012',
                    '_blank' // <- This is what makes it open in a new window.
                );
                break;
        }
    }


    return (
        <>
            <Nav scrollTo={scrollTo} />
            <main className={styles.main} ref={mainRef}>
                <Box component='header' display='flex' flexDirection='column' width={1} height='100vh'
                    overflow='hidden'
                    textAlign='center'
                    className={styles.header} ref={headerRef}>
                    <h4></h4>
                    <h1>
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
                    <h4 >
                        Scroll Down<br />
                        <ExpandMoreIcon ref={moreRef} />
                    </h4>
                </Box>
                <section className={[styles.work, themeValue === 'dark' && styles.darkCover].join(' ')} ref={workRef}>
                    {/* <div className={styles.background}><img src="/images/work.jpg" /></div> */}
                    <h1 >
                        <span>01.</span> Works
                    </h1>
                    <div className={styles.workList}>
                        {
                            works.map((work, i) => <WorkCard work={work} index={i} key={i} sectionRef={ref => (workRef => ref)} />)
                        }
                    </div>
                </section>
                <section className={[styles.writing, themeValue === 'dark' && styles.darkCover].join(' ')} ref={writingRef}>
                    <h1>
                        <span>02.</span> Writings
                    </h1>
                    <div className={styles.writingList}>
                        {
                            writings.map((writing, i) => <WritingCard writing={writing} index={i} key={i} />)
                        }
                    </div>
                </section>
                <section className={[styles.contact, themeValue === 'dark' && styles.darkCover].join(' ')} ref={contactRef}>
                    <h1>
                        <span>03.</span> Contact
                    </h1>
                    <div className={styles.contactRow}>
                        <ContactCard className={styles.contactCard} />
                        <div className={styles.contactInfo}>
                            <h3>Email</h3>
                            <p>kswang@lsalab.cs.nthu.edu.tw</p>
                            <h3>Social Media</h3>

                            <div className={styles.mediaList}>
                                {
                                    providers.map((provider, i) => {
                                        return (
                                            <FontAwesomeIcon key={i} className={styles.media} icon={['fab', provider]} size="2x" onClick={() => goto(provider)} />
                                        );
                                    })
                                }
                            </div>
                            <Box component='h3' color='footer.text'>© 2021 by Kai Wang.</Box>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}