import styles from 'styles/nav.module.scss';
import { Button, Box, Link, IconButton, Backdrop } from '@mui/material';
import ThemeSwitch from './ThemeSwitch';
import { dark, light } from 'src/store/theme';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

gsap.registerPlugin(ScrollTrigger);

export default function Nav({ scrollTo, isSimple }) {
  const dispatch = useDispatch();
  let theme = useTheme();
  const ref = useRef();
  const idleTime = useRef(-1);
  const currentTheme = useSelector((state) => state.theme.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const tabs = useMemo(() => {
    if (isSimple) {
      return [
        {
          text: 'Kai Wang',
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
          onClick: () => scrollTo('top'),
        },
        {
          text: 'Publications',
          onClick: () => scrollTo('writing'),
        },
        {
          text: 'Experiences',
          onClick: () => scrollTo('work'),
        },
        {
          text: 'Contact',
          onClick: () => scrollTo('contact'),
        },
      ];
    }
  }, [isSimple]);

  useEffect(() => {
    if (!isSimple) {
      const showAnim = gsap
        .from(ref.current, {
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

  function setTheme(isLight) {
    if (isLight) dispatch(light());
    else dispatch(dark());
  }

  return (
    <Box
      component="nav"
      className={styles.nav}
      ref={ref}
      bgcolor="background.default"
      style={{ boxShadow: !isSimple && theme.palette.shadow, borderBottom: isSimple && '1px #eee solid' }}
    >
      <ul>
        {tabs.map((tab, i) => {
          if (i === 0)
            return (
              <li key={i} onClick={tab.onClick}>
                <Link href={tab.url} className="no-underline text-inherit">
                  {tab.text}
                </Link>
              </li>
            );
          return (
            <li key={i} className={styles.normal}>
              <Link href={tab.url} className="no-underline text-inherit">
                <span>{`0${i}.`}</span>
                {tab.text}
                <span></span>
              </Link>
            </li>
          );
        })}
        <ThemeSwitch
          checked={currentTheme == 'light'}
          onChange={setTheme}
          className={[styles.switch, styles.normal].join(' ')}
          size={isSimple && 'sm'}
        />
        {!isSimple && (
          <Button className={[styles.resume, styles.normal].join(' ')} color="primary" variant="outlined">
            <Link
              style={{ textDecoration: 'none' }}
              href="https://lsalab.cs.nthu.edu.tw/~kswang/cv.pdf"
              target="_blank"
              download
            >
              Resume
            </Link>
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
          if (e.target.id === 'overlay') setIsMenuOpen(false);
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
                <Link
                  style={{ textDecoration: 'none' }}
                  href="https://lsalab.cs.nthu.edu.tw/~kswang/cv.pdf"
                  target="_blank"
                  download
                >
                  Resume
                </Link>
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
