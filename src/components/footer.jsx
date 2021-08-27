import styles from 'styles/footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core';

const providers = ['facebook', 'instagram', 'twitter'];

export default function Footer() {

    const theme = useTheme();
    const themeValue = useSelector(state => state.theme.value);

    function goto(provider) {
        switch (provider) {
            case 'facebook':
                window.open(
                    'https://www.facebook.com/kwang871012',
                    '_blank' // <- This is what makes it open in a new window.
                );
                break
            case 'instagram':
                window.open(
                    'https://www.facebook.com/kwang871012',
                    '_blank' // <- This is what makes it open in a new window.
                );
                break;
            case 'twitter':
                window.open(
                    'https://www.facebook.com/kwang871012',
                    '_blank' // <- This is what makes it open in a new window.
                );
                break;;
        }
    }

    return (
        <footer className={[styles.footer, themeValue === 'dark' ? styles.darkCover : ''].join(' ')}>
            <div className={styles.mediaList}>
                {
                    providers.map((provider, i) => {
                        return (
                            <FontAwesomeIcon key={i} className={styles.media} icon={['fab', provider]} size="2x" onClick={() => goto(provider)} />
                        );
                    })
                }
            </div>
            <Box component='h3' color='footer.text'>© 2021 by Kai Wang.</Box>
        </footer>
    );
}