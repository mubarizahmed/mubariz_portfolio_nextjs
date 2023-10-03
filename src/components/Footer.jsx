import React, { } from "react";
import { FaLinkedinIn, FaGithub, FaXing } from "react-icons/fa";

import styles from "@/styles/footer.module.css";

const Footer = () => {
  const linkedIn = "https://www.linkedin.com/in/mubariz-ahmed/";
  const gitHub = "https://github.com/mubarizahmed"

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={'/logo-H_w.svg'} alt="Mubariz Ahmed Logo" />
          </div>
          <div className={styles.icons}>

            <a className={styles.icon} href={linkedIn} aria-label="LinkedIn Profile">
              <FaLinkedinIn />
            </a>

            <a className={styles.icon} href={gitHub} aria-label="GitHub Profile">
              <FaGithub />
            </a>

            <a className={styles.icon} href={linkedIn} aria-label="Xing Profile">
              <FaXing />
            </a>
          </div>
        </div>
        <div className={styles.right}>

          <form
            className={styles.form}
            target="_blank"
            action="https://formsubmit.co/6b9d3482af1163a987ab4003f4d165fa "
            method="POST"
            id="contact"
          >
            <h2>Contact:</h2>
            <div className={styles.formGroup}>
              <div className={styles.formCol}>
                <input
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className={styles.formText}>
                <textarea
                  placeholder="Your Message"
                  className={styles.input}
                  name="message"
                  rows="10"
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className={styles.formButton}>
              Submit Form
            </button>
          </form>
        </div>
      </div>
      <div className={styles.copywright}>
        <p>Copyright © 2022 Mubariz Ahmed. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
