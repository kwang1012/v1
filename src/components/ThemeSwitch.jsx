import { useState, useEffect } from "react";
import styles from 'styles/ThemeSwitch.module.scss';
import NightStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';

export default function ThemeSwitch({ checked, onChange }) {

    const [value, setValue] = useState(checked);

    useEffect(() => {
        setValue(checked)
    }, [checked]);

    useEffect(() => {
        onChange(value);
    }, [value]);

    function onClick() {
        setValue(prevValue => !prevValue);
    }

    return (
        <div className={styles.container} onClick={onClick}>
            <NightStayIcon style={{ color: '#1b3e7a' }} />
            <Brightness7Icon style={{ color: '#FF5733' }} />
            <div className={styles.handler} style={{ transform: value ? 'translateX(0)' : 'translateX(28px)' }}></div>
        </div>
    );
}