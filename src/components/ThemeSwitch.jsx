import { useState, useEffect } from 'react';
import styles from 'styles/ThemeSwitch.module.scss';
import NightStayIcon from '@mui/icons-material/NightsStay';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box } from '@mui/material';

export default function ThemeSwitch({ inMenu, size, ...props }) {
  const [value, setValue] = useState(props.checked);

  useEffect(() => {
    setValue(props.checked);
  }, [props.checked]);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  function onClick() {
    setValue((prevValue) => !prevValue);
  }

  return (
    <Box {...props}>
      <div
        className={[styles.container, styles[size]].join(' ')}
        onClick={onClick}
        style={{ backgroundColor: inMenu ? '#eaebec' : value ? '#cacbcc' : '#5a5b5c' }}
      >
        <NightStayIcon className={[styles.icon, styles.night].join(' ')} />
        <Brightness7Icon className={[styles.icon, styles.day].join(' ')} />
        <div className={[styles.handler, value ? styles.light : styles.dark].join(' ')}></div>
      </div>
    </Box>
  );
}
