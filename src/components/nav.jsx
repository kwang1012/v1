import styles from 'styles/nav.module.scss';
import { Button } from '@material-ui/core';
import ThemeSwitch from './ThemeSwitch';
import { dark, light } from "src/store/theme";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@material-ui/styles';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Nav({ scrollTo }) {

    const dispatch = useDispatch();
    let theme = useTheme();
    const ref = useRef();
    const idleTime = useRef(-1);
    const currentTheme = useSelector(state => state.theme.value);

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
        <nav className={styles.nav} ref={ref}
            style={{ backgroundColor: theme.palette.body, boxShadow: theme.palette.shadow }}>
            <ul style={{ color: theme.palette.bodyConstract }}>
                <li onClick={() => scrollTo('top')}>Kai Wang</li>
                <li onClick={() => scrollTo('work')}><span>01.</span>Works<span></span></li>
                <li onClick={() => scrollTo('writing')}><span>02.</span>Writings<span></span></li>
                <li onClick={() => scrollTo('contact')}><span>03.</span>Contact<span></span></li>
                <ThemeSwitch checked={currentTheme == 'light'} onChange={setTheme} className={styles.switch} />
                <Button className={styles.resume} color="primary" variant="outlined">Resume</Button>
            </ul>
        </nav >
    )
}