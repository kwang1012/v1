import { useState, useEffect } from "react";
import styles from 'styles/ThemeSwitch.module.scss';
import NightStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';

export default function ThemeSwitch({ checked, onChange }) {

    const [value, setValue] = useState(checked);

    useEffect(() => {
        setValue(checked);
    }, [checked]);

    useEffect(() => {
        onChange(value);
    }, [value]);

    function onClick() {
        setValue(prevValue => !prevValue);
    }

    return (
        <div className={styles.container} onClick={onClick}>
            <NightStayIcon className={[styles.icon, styles.night].join(' ')} />
            <Brightness7Icon className={[styles.icon, styles.day].join(' ')} />
            <div className={[styles.handler, value ? styles.light : styles.dark].join(' ')}></div>
        </div>
    );
}