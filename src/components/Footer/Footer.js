'useClient';

import Newsletter from 'components/Newsletter/Newsletter';
import Facebook from 'components/Social/Facebook';
import Instagram from 'components/Social/Instagram';
import Mail from 'components/Social/Mail';
import Pinterest from 'components/Social/Pinterest';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={`${styles.main} `}>
      <div className={styles.upperPart}>
        <div className={styles.newsletter}>
          <div className={styles.container}>
            <div className={`${''} headingH3`}>
              Get insider tips on Portugal&rsquo;s best wedding spots and personal travel stories from my life as a
              wedding photographer. Sign up to explore Portugal with me.
            </div>

            <div className={styles.newsletterInput}>
              <label htmlFor="newsletter" className={`${' '} textS bold`}>
                Sign up to newsletter
              </label>
              <Newsletter />
              <span className={`${styles.helper} textXS`}>
                By signing up to our newsletter you agree to our <Link href="/privacy-policy">privacy policy</Link>.
              </span>
            </div>
          </div>
        </div>
        <div className={`${styles.footerCol} `}>
          <div>
            <span className="textS letterSpacing bold">Explore</span>
            <ul className="textS letterSpacing">
              <li>
                <Link href="/about">About me</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/session">Portfolio</Link>
              </li>
              <li>
                <Link href="/">Blog</Link>
              </li>
            </ul>
          </div>
          {/* <div className={`${styles.footerCol} `}> */}
          <div>
            <span className="textS letterSpacing bold">Support</span>
            <ul className="textS letterSpacing">
              <li>
                <Link href="/contacts">Contact</Link>
              </li>
              <li>
                <Link href="#">Terms</Link>
              </li>
              <li>
                <Link href="#">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomPart}>
        <div className={`${styles.rights} textXXS`}>
          <span>All rights reserved - Ola Nandalona 2024</span>
          <Link href="https://noonewaystudio.com/" target="_blank" rel="noopener noreferrer">
            <span>Design: Nooneway Studio</span>
          </Link>
        </div>
        <div className={`${styles.media} `}>
          <Facebook iconBg={styles.iconBg} />
          <Instagram iconBg={styles.iconBg} />
          <Pinterest iconBg={styles.iconBg} />
          <Mail iconBg={styles.iconBg} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
