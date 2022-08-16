import Nav from 'src/components/nav';
import styles from 'styles/home.module.scss';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { useTheme } from '@mui/material/styles';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WritingCard from 'src/components/WritingCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import WorkCard from 'src/components/WorkCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactCard from 'src/components/ContactCard';

const providers = ['facebook', 'instagram', 'twitter'];

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const words = ['Kai Wang.', 'A Computer Scientist.', 'A Software Engineer.'];

const writings = [
  {
    title:
      'An automatic learning based execution and resource management system for optimizing Hadoop workload in clouds',
    tags: ['JPDC’22', 'Co-author'],
    action: () => {
      window.open('https://www.sciencedirect.com/science/article/abs/pii/S0743731522001289', '_blank');
    },
    content:
      'Hadoop is a popular computing framework designed to deliver timely and cost-effective data processing on a large cluster of commodity machines. It relieves the burden of the programmers dealing with distributed programming, and an ecosystem of Big Data solutions has developed around it. However, Hadoop’s job execution time can greatly depend on its runtime configurations and resource selections. Given the more than 100 job configuration settings provided by Hadoop, and diverse resource instance options in a cloud or virtualized computing environment, running Hadoop jobs still requires a substantial amount of expertise and experience. To address this challenge, we apply a deep neural network to predict Hadoop’s job time based on historical execution data, and propose optimization methods to reduce job execution time and cost. The results show that our prediction method achieves almost 90% time prediction accuracy and clearly outperforms three other state-of-the-art regression-based prediction methods. Based on the time prediction, our proposed configuration search method and job scheduling algorithm successfully shorten the execution time of a single Hadoop job by more than a factor of 2 and reduce the time of processing a batch of Hadoop jobs by 40% ~65%.',
  },
  {
    title: 'Optimal Static Bidding Strategy for Running Batch Jobs with Hard Deadline Constraints on Spot Instances',
    tags: ['Submitted to UCC’22', 'First Author'],
    action: () => {},
    content:
      'Spot-instances(SI) is an auction-based pricing scheme used by cloud providers. It allows users to place bids for spare computing instances and rent them at a substantially lower price compared to the fixed on-demand price. This inexpensive computational power is at the cost of availability, because a spot instance can be revoked whenever the spot market price exceeds the bid. Therefore, SI has become an attractive option for applications without requiring real-time availability constraints, such as the batch jobs in different application domains, including big data analytics, scientific computing, and deep learning. For batch jobs, service interruptions and execution delays can be tolerated as long as their service quality is gauged by an execution deadline. Hence, this paper aims to develop a static bidding strategy for minimizing the monetary cost of a batch job with hard deadline constraints. We formulate the problem as a Markov chain process and use Dynamic Programming to find the optimal bid in polynomial time. Experiments conducted on real workloads from Amazon Spot Instance historical prices show that our proposed strategy successfully outperformed two state-of-art dynamic bidding strategies~(Amazing, DBA), and several deadline agnostic static bidding strategies with lower cost and fault tolerance overhead. ',
  },
  {
    title: 'A Reservation-Based List Scheduling for Embedded Systems with Memory Constraints',
    tags: ['Submitted to SC’22', 'First Author'],
    action: () => {
      // window.open('https://bruce1198.medium.com/lets-learn-flutter-4054ea5c43a1', '_blank')
    },
    content:
      'Many embedded systems have hard resource constraints that make schedules found by list scheduling heuristics invalid. In this paper, we show the problems caused by memory constraints and deadlocks during the scheduling process. We propose new extensions for list scheduling algorithms and make them take memory constraints into account. The experiment shows that our methods can solve deadlocks effectively and reduce total memory usage drastically compared to original scheduling heuristics.',
  },
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

  const themeValue = useSelector((state) => state.theme.value);

  const mainRef = useRef();
  const q = gsap.utils.selector(mainRef);
  const moreRef = useRef();

  const works = [
    {
      name: 'ITRI',
      icon: 'app',
      color: '#B8E1FF',
      description: 'Implement NVDLA using C++.',
      action: () => {
        window.open('https://github.com/bruce1198/klea.git', '_blank');
      },
    },
    {
      name: 'Twister5',
      icon: 'web',
      color: '#F3C178',
      description: 'Use Vuejs to build the admin panel monitor the status of servers',
      action: () => {},
    },
    {
      name: 'Skymizer',
      icon: 'plane',
      color: '#E8AEB7',
      description: 'Forest Runtime - \n Runtime that can execute executables provided by ONNC.',
      action: () => {},
    },
  ];

  useEffect(() => {
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
  function goto(provider) {
    switch (provider) {
      case 'facebook':
        window.open(
          'https://www.facebook.com/kwang871012',
          '_blank' // <- This is what makes it open in a new window.
        );
        break;
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
          <div style={{ display: 'flex', width: '60%', margin: '20px auto' }}>
            <h2 style={{ flex: 1, paddingRight: 10 }}>
              I'm currently a graduate student at NTHU.
              <br />
              My research interest covers topics around parallel computing including MPI and CUDA programming. Also, I
              am familiar with cloud computing such as resource provisioning strategies.
              <br />
              In addition, I work at Skymizer as an intern & focus on optimizing the performance of DL inference.
            </h2>
            <img src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png" alt="" />
          </div>
          <h4>
            Scroll Down
            <br />
            <ExpandMoreIcon ref={moreRef} />
          </h4>
        </Box>
        <section className={[styles.writing, themeValue === 'dark' && styles.darkCover].join(' ')} ref={writingRef}>
          <h1>
            <span>02.</span> Publications
          </h1>
          <div className={styles.writingList}>
            <div className={styles.list}>
              {writings.map((writing, i) => (
                <WritingCard writing={writing} index={i} key={i} />
              ))}
            </div>
          </div>
        </section>
        <section className={[styles.work, themeValue === 'dark' && styles.darkCover].join(' ')} ref={workRef}>
          <h1>
            <span>01.</span> Experiences
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
                      onClick={() => goto(provider)}
                    />
                  );
                })}
              </div>
              <Box component="h3" color="footer.text">
                © 2021 by Kai Wang.
              </Box>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
