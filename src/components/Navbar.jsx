import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link  from "next/link";
import Image from 'next/image'
import styles from "@/styles/navbar.module.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);


  const goToContact = () => {
    const contactElement = document.getElementById('contact');
    contactElement.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} href="/">
        <div className={styles.navbarLogo}>
          <Image src={'/logo.svg'} alt="Mubariz Ahmed" width={100} height={24}/>
        </div>
      </Link>
      <div className={styles.links}>
        <Link className={styles.link} href="/">
          info
        </Link>
        <Link className={styles.link} href="/projects">
          projects
        </Link>
        <Link className={styles.link} href="/projects">
          other
        </Link>
      </div>
      <div className={styles.button} >
        <button type="button" onClick={() => goToContact()}>Contact</button>
      </div>
      <div className={styles.menu}>
        {toggleMenu ? (
          <RiCloseLine
            color="var(--color-current)"
            size={27}
            onClick={() => setToggleMenu(false)}
            className={styles.menuIcon}
          />
        ) : (
          <RiMenu3Line
            color="var(--color-current)"
            size={27}
            onClick={() => setToggleMenu(true)}
            className={styles.me}
          />
        )}
        {toggleMenu && (
          <div className={styles.menuContainer} onClick={() => setToggleMenu(false)}>
            <Link className={styles.link} href="/">
              info
            </Link>
            <Link className={styles.link} href="/projects">
              projects
            </Link>
            <Link className={styles.link} href="/projects">
              other
            </Link>
            <div className={styles.button +' '+ styles.menuButton}>
              <button type="button" onClick={() => goToContact()}>Contact</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
