import Nav from 'src/components/nav';
import styles from 'styles/home.module.scss';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { useTheme } from '@mui/material/styles';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PublicationCard from 'src/components/PublicationCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import WorkCard from 'src/components/WorkCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactCard from 'src/components/ContactCard';
import { useRouter } from 'next/router';
import { providers } from 'src/const';
import { onClickProvider } from 'src/utils';
import Image from 'next/image';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const words = ['Kai Wang.', 'A Computer Scientist.', 'A Software Engineer.'];

export default function HomeView({ pubs }) {
  const boxRef = useRef();
  const hiRef = useRef();
  const textRef = useRef();
  const cursorRef = useRef();

  const headerRef = useRef();
  const workRef = useRef();
  const writingRef = useRef();
  const contactRef = useRef();

  const themeValue = useSelector((state) => state.theme.value);

  const mainRef = useRef();
  const q = gsap.utils.selector(mainRef);
  const moreRef = useRef();
  const router = useRouter();

  const works = [
    {
      name: 'ITRI',
      icon: 'app',
      color: '#B8E1FF',
      description: 'Implement NVDLA using C++.',
      action: () => router.push('/project/itri'),
    },
    {
      name: 'Twister5',
      icon: 'web',
      color: '#F3C178',
      description: 'Use Vuejs to build the admin panel monitor the status of servers',
      action: () => router.push('/project/twister5'),
    },
    {
      name: 'Skymizer',
      icon: 'plane',
      color: '#E8AEB7',
      description: 'Forest Runtime - \n Runtime that can execute executables provided by ONNC.',
      action: () => router.push('/project/skymizer'),
    },
  ];

  useEffect(() => {
    if (navigator.userAgentData.mobile) return;
    gsap.to(cursorRef.current, { opacity: 0, ease: 'power2.inOut', repeat: -1 });
    let boxTL = gsap.timeline();
    boxTL.to(boxRef.current, { duration: 1, width: '17vw', delay: 0.5, ease: 'power4.inOut' }).from(hiRef.current, {
      duration: 1,
      y: '5vw',
      ease: 'power3.out',
      onComplete: () => {
        masterTL.play();
      },
    });
    let masterTL = gsap.timeline({ repeat: -1 }).pause();
    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tl.to(textRef.current, { duration: 1, text: word });
      masterTL.add(tl);
    });

    let moreTL = gsap.timeline({ repeat: -1, yoyo: true });
    moreTL
      .from(moreRef.current, { y: '-5px', ease: 'power2.in', duration: 0.2 })
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
          ease: 'power2.out',
        },
        pinSpacing: false,
        end: () => '+=' + window.innerHeight * (panels.length - 1),
      },
    });
  }, []);

  function scrollIntoView(target) {
    const bodyRect = document.body.getBoundingClientRect().top;
    window.scrollTo({
      top: target.getBoundingClientRect().top - bodyRect,
      behavior: 'smooth',
    });
  }

  function scrollTo(where) {
    switch (where) {
      case 'top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'work':
        scrollIntoView(workRef.current);
        break;
      case 'writing':
        scrollIntoView(writingRef.current);
        break;
      case 'contact':
        scrollIntoView(contactRef.current);
        break;
    }
  }

  return (
    <div>
      <Nav scrollTo={scrollTo} />
      <main className={styles.main} ref={mainRef}>
        <Box
          component="header"
          display="flex"
          flexDirection="column"
          width={1}
          height="100vh"
          overflow="hidden"
          textAlign="center"
          className={styles.header}
          ref={headerRef}
        >
          <h4></h4>
          <h1>
            <span className={styles.box} ref={boxRef}></span>
            <span className={styles.hi} ref={hiRef}>
              Hi, I'm
            </span>
            <span className={styles.text} ref={textRef}></span>
            <span className={styles.cursor} ref={cursorRef}>
              _
            </span>
          </h1>
          <div style={{ margin: '20px auto' }}>
            <h2 style={{ flex: 1, paddingRight: 10 }}>
              I'm currently a graduate student at NTHU.
              <br />
              My research interest covers topics around parallel computing including MPI and CUDA programming. Also, I
              am familiar with cloud computing such as resource provisioning strategies.
              <br />
              In addition, I work at Skymizer as an intern & focus on optimizing the performance of DL inference.
            </h2>
            <Image src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png" width={150} height={150} />
          </div>
          <h4>
            Scroll Down
            <br />
            <ExpandMoreIcon ref={moreRef} />
          </h4>
        </Box>
        <section className={[styles.writing, themeValue === 'dark' && styles.darkCover].join(' ')} ref={writingRef}>
          <h1>
            <span>01.</span> Publications
          </h1>
          <div className={styles.writingList}>
            <div className={styles.list}>
              {pubs.map((pub, i) => (
                <PublicationCard pub={pub} index={i} key={i} />
              ))}
            </div>
          </div>
        </section>
        <section className={[styles.work, themeValue === 'dark' && styles.darkCover].join(' ')} ref={workRef}>
          <h1>
            <span>02.</span> Experiences
          </h1>
          <div className={styles.workList}>
            {works.map((work, i) => (
              <WorkCard work={work} index={i} key={i} sectionRef={(ref) => (workRef) => ref} />
            ))}
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
                {providers.map((provider, i) => {
                  return (
                    <FontAwesomeIcon
                      key={i}
                      className={styles.media}
                      icon={['fab', provider]}
                      size="2x"
                      onClick={() => onClickProvider(provider)}
                    />
                  );
                })}
              </div>
              <Box component="h3" color="footer.text">
                Copyright © 2021-2022 Kai Wang.
              </Box>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
