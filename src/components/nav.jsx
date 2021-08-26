import styles from 'styles/nav.module.scss';
import { Button } from '@material-ui/core';
import ThemeSwitch from './ThemeSwitch';
import { dark, light } from "src/store/theme";
import { useDispatch } from "react-redux";
import { useTheme } from '@material-ui/styles';
import { useEffect } from 'react';

export default function Nav({ scrollTo }) {

    const dispatch = useDispatch();
    let theme = useTheme();

    useEffect(() => {

    }, [theme]);

    function setTheme(isLight) {
        if (isLight) dispatch(light());
        else dispatch(dark());
    }
    return (
        <nav className={styles.nav} style={{ backgroundColor: theme.palette.body, boxShadow: theme.palette.shadow }}>
            <ul style={{ color: theme.palette.bodyConstract }}>
                <li onClick={() => scrollTo('top')}>Kai Wang</li>
                <li onClick={() => scrollTo('work')}>Works<span></span></li>
                <li onClick={() => scrollTo('writing')}>Writings<span></span></li>
                <li onClick={() => scrollTo('contact')}>Contact<span></span></li>
                <div className={styles.flexRight}>
                    <ThemeSwitch checked={true} onChange={setTheme} />
                    <Button className={styles.resume} color="primary" variant="outlined">Resume</Button>
                </div>
            </ul>
        </nav >
    )
}