import styles from 'styles/nav.module.scss';
import { Button, Box, IconButton, Backdrop, AppTheme } from '@mui/material';
import ThemeSwitch from './ThemeSwitch';
import { dark, light } from '@/store/theme';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '@/store';
import { ReactSVG } from 'react-svg';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  scrollTo?: Function;
  isSimple: boolean;
};

export default function Nav({ scrollTo, isSimple }: Props) {
  const dispatch = useDispatch();
  let theme: AppTheme = useTheme();
  const ref = useRef();
  const idleTime = useRef(-1);
  const currentTheme = useSelector((state: RootState) => state.theme.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const [loaded, setLoaded] = useState('');

  const reloadSVG = () => {
    setLoaded('');
    setTimeout(() => {
      setLoaded('/brand.svg');
    }, 30);
  };

  useEffect(() => {
    if (loaded != '') setTimeout(reloadSVG, 5000);
  }, [loaded]);

  useEffect(reloadSVG, []);

  const tabs = useMemo(() => {
    if (isSimple) {
      return [
        {
          // text: 'Kai Wang',
          text: loaded !== '' && <ReactSVG src={loaded} />,
          onClick: () => router.push('/'),
          url: '/',
        },
        // {
        //   text: 'Home',
        //   onClick: () => router.push('/'),
        // },
        {
          text: 'Publications',
          onClick: () => router.push('/pubs'),
          url: '/pubs',
        },
        {
          text: 'Experiences',
          onClick: () => router.push('/experiences'),
          url: '/experiences',
        },
        {
          text: 'Blog',
          onClick: () => router.push('/blog'),
          url: '/blog',
        },
        {
          text: 'Miscellaneous',
          onClick: () => router.push('/miscellaneous'),
          url: '/miscellaneous',
        },
      ];
    } else {
      return [
        {
          text: 'Kai Wang',
          onClick: () => scrollTo?.('top'),
        },
        {
          text: 'Publications',
          onClick: () => scrollTo?.('writing'),
        },
        {
          text: 'Experiences',
          onClick: () => scrollTo?.('work'),
        },
        {
          text: 'Contact',
          onClick: () => scrollTo?.('contact'),
        },
      ];
    }
  }, [isSimple, loaded]);

  useEffect(() => {
    if (!isSimple) {
      const showAnim = gsap
        .from(ref.current!, {
          yPercent: -100,
          paused: true,
          duration: 0.4,
          ease: 'power4.inOut',
        })
        .progress(1);

      ScrollTrigger.create({
        start: 'top top',
        end: 999999,
        onUpdate: (self) => {
          showAnim.reverse();
          idleTime.current = 1;
        },
      });

      setInterval(() => {
        idleTime.current--;
        if (idleTime.current == 0) {
          showAnim.play();
        }
      }, 1000);
    }
  }, [isSimple]);

  function setTheme(isLight: boolean) {
    if (isLight) dispatch(light());
    else dispatch(dark());
  }

  return (
    <Box
      component="nav"
      className={styles.nav}
      ref={ref}
      bgcolor="background.default"
      style={{ boxShadow: !isSimple ? theme.palette.shadow : '', borderBottom: isSimple ? '1px #eee solid' : '' }}
    >
      <ul>
        {tabs.map((tab, i) => {
          if (i === 0)
            return (
              <li key={i} onClick={tab.onClick}>
                {tab.text}
              </li>
            );
          return (
            <li key={i} onClick={tab.onClick} className={styles.normal}>
              <span>{`0${i}.`}</span>
              {tab.text}
              <span></span>
            </li>
          );
        })}
        <ThemeSwitch
          checked={currentTheme == 'light'}
          onChange={setTheme}
          className={[styles.switch, styles.normal].join(' ')}
          size={isSimple ? 'sm' : ''}
        />
        {!isSimple && (
          <Button className={[styles.resume, styles.normal].join(' ')} color="primary" variant="outlined">
            <a
              style={{ textDecoration: 'none' }}
              href="https://lsalab.cs.nthu.edu.tw/~kswang/cv.pdf"
              target="_blank"
              rel="noreferrer"
              download
            >
              Resume
            </a>
          </Button>
        )}
        <Box onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className={[styles.hamburger, styles.rwd].join(' ')} />
        </Box>
      </ul>
      <Backdrop
        open={isMenuOpen}
        className={[styles.mobileMenu, styles.rwd, isMenuOpen ? styles.open : ''].join(' ')}
        onClick={(e) => {
          if ((e.target as HTMLInputElement).id === 'overlay') setIsMenuOpen(false);
        }}
      >
        <Box id="overlay" className={styles.wrapper}>
          <Box className={[styles.bg, isMenuOpen && styles.open].join(' ')}></Box>
          <Box className={[styles.bg1, isMenuOpen && styles.open].join(' ')}></Box>
          <Box className={styles.menu}>
            <ul>
              {tabs.map((tab, i) => {
                if (i === 0)
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        tab.onClick();
                        setIsMenuOpen(false);
                      }}
                    >
                      {tab.text}
                    </li>
                  );
                return (
                  <li
                    key={i}
                    onClick={() => {
                      tab.onClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {`0${i}.${tab.text}`}
                  </li>
                );
              })}
              <Button className={styles.resume} color="primary" variant="outlined">
                <a
                  style={{ textDecoration: 'none' }}
                  href="https://lsalab.cs.nthu.edu.tw/~kswang/cv.pdf"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  Resume
                </a>
              </Button>
              <ThemeSwitch
                checked={currentTheme == 'light'}
                onChange={setTheme}
                className={styles.switch}
                inMenu={true}
              />
            </ul>
          </Box>
          <IconButton className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <HighlightOffIcon color="primary" style={{ fontSize: '40px' }} />
          </IconButton>
        </Box>
      </Backdrop>
    </Box>
  );
}
