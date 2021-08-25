import styles from 'styles/footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const providers = ['facebook', 'instagram', 'twitter'];

export default function Footer() {

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
        <footer className={styles.footer}>
            <div className={styles.mediaList}>
                {
                    providers.map(provider => {
                        return (
                            <FontAwesomeIcon className={styles.media} icon={['fab', provider]} size="2x" onClick={() => goto(provider)} />
                        );
                    })
                }
            </div>
            <h3>© 2021 by Kai Wang.</h3>
        </footer>
    );
}