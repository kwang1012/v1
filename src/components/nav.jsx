import styles from 'styles/nav.module.scss';
import { Button, Box } from '@mui/material';
import ThemeSwitch from './ThemeSwitch';
import { dark, light } from "src/store/theme";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

gsap.registerPlugin(ScrollTrigger);

export default function Nav({ scrollTo }) {

    const dispatch = useDispatch();
    let theme = useTheme();
    const ref = useRef();
    const idleTime = useRef(-1);
    const currentTheme = useSelector(state => state.theme.value);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const showAnim = gsap.from(ref.current, {
            yPercent: -100,
            paused: true,
            duration: 0.4,
            ease: 'power4.inOut'
        }).progress(1);

        ScrollTrigger.create({
            start: 'top top',
            end: 999999,
            onUpdate: (self) => {
                showAnim.reverse();
                idleTime.current = 1;
            }
        });

        setInterval(() => {
            idleTime.current--;
            if (idleTime.current == 0) {
                showAnim.play();
            }
        }, 1000)
    }, []);

    function setTheme(isLight) {
        if (isLight) dispatch(light());
        else dispatch(dark());
    }

    return (
        <Box component='nav' className={styles.nav} ref={ref}
            bgcolor='background.default'
            style={{ boxShadow: theme.palette.shadow }}>
            <ul>
                <li onClick={() => scrollTo('top')}>Kai Wang</li>
                <li onClick={() => scrollTo('work')} className={styles.normal}><span>01.</span>Works<span></span></li>
                <li onClick={() => scrollTo('writing')} className={styles.normal}><span>02.</span>Writings<span></span></li>
                <li onClick={() => scrollTo('contact')} className={styles.normal}><span>03.</span>Contact<span></span></li>
                <ThemeSwitch checked={currentTheme == 'light'} onChange={setTheme} className={[styles.switch, styles.normal].join(' ')} />
                <Button className={[styles.resume, styles.normal].join(' ')} color="primary" variant="outlined">Resume</Button>
                <Box onClick={() => setIsMenuOpen(true)}><MenuIcon className={[styles.hamburger, styles.rwd].join(' ')} /></Box>
            </ul>
            <Box className={[styles.mobileMenu, styles.rwd, isMenuOpen ? styles.open : ''].join(' ')}>
                <Box className={styles.wrapper}>
                    <Box className={[styles.bg, isMenuOpen && styles.open].join(' ')}></Box>
                    <Box className={[styles.bg1, isMenuOpen && styles.open].join(' ')}></Box>
                    <Box className={styles.menu}>
                        <ul>
                            <li onClick={() => scrollTo('top')}>Kai Wang</li>
                            <li onClick={() => scrollTo('work')}>01.Works</li>
                            <li onClick={() => scrollTo('writing')}>02.Writings</li>
                            <li onClick={() => scrollTo('contact')}>03.Contact</li>
                            <Button className={styles.resume} color="primary" variant="outlined">Resume</Button>
                            <ThemeSwitch checked={currentTheme == 'light'} onChange={setTheme} className={styles.switch} inMenu={true} />
                        </ul>
                    </Box>
                    <Box className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}><HighlightOffIcon color='primary' style={{ fontSize: '40px' }} /></Box>
                </Box>
            </Box>
        </Box >
    )
}