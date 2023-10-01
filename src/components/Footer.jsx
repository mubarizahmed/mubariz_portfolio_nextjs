import React, {  } from "react";
import { IconContext } from "react-icons";
import { FaLinkedinIn, FaGithub, FaXing } from "react-icons/fa";


import "@/styles/footer.module.css";

const Footer = ({ linkedIn, gitHub }) => {

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={'/logo-H_w.svg'} alt="Mubariz Ahmed Logo" />
          </div>
          <div className="footer-icons">
            <IconContext.Provider
              value={{ color: "black", style: { verticalAlign: "middle" } }}
            >
              <a className="footer-icon" href={linkedIn} aria-label="LinkedIn Profile">
                <FaLinkedinIn />
              </a>

              <a className="footer-icon" href={gitHub} aria-label="GitHub Profile">
                <FaGithub />
              </a>

              <a className="footer-icon" href={linkedIn} aria-label="Xing Profile">
                <FaXing />
              </a>
            </IconContext.Provider>
          </div>
        </div>
        <div className="footer-right">
          
          <form
            className="footer-form"
            target="_blank"
            action="https://formsubmit.co/6b9d3482af1163a987ab4003f4d165fa "
            method="POST"
            id="contact"
          >
            <h2>Contact:</h2>
            <div className="form-group">
              <div className="form-col">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-text">
                <textarea
                  placeholder="Your Message"
                  className="form-control"
                  name="message"
                  rows="10"
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className="form-button">
              Submit Form
            </button>
          </form>
        </div>
      </div>
      <div className="footer-copywright">
        <p>Copyright © 2022 Mubariz Ahmed. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
