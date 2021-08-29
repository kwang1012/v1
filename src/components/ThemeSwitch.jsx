import { useState, useEffect } from "react";
import styles from 'styles/ThemeSwitch.module.scss';
import NightStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Box } from "@material-ui/core";

export default function ThemeSwitch(props) {

    const [value, setValue] = useState(props.checked);

    useEffect(() => {
        setValue(props.checked);
    }, [props.checked]);

    useEffect(() => {
        props.onChange(value);
    }, [value]);

    function onClick() {
        setValue(prevValue => !prevValue);
    }

    return (
        <Box {...props}>
            <div className={styles.container} onClick={onClick} style={{ backgroundColor: props.inMenu ? '#eaebec' : '#5a5b5c' }}>
                <NightStayIcon className={[styles.icon, styles.night].join(' ')} />
                <Brightness7Icon className={[styles.icon, styles.day].join(' ')} />
                <div className={[styles.handler, value ? styles.light : styles.dark].join(' ')}></div>
            </div>
        </Box>
    );
}