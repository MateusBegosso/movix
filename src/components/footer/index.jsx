import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import ContentWrapper from "../contentWrapper";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="footer__menuItems">
          <li className="footer__menuItem">Terms Of Use</li>
          <li className="footer__menuItem">Privacy-Policy</li>
          <li className="footer__menuItem">About</li>
          <li className="footer__menuItem">Blog</li>
          <li className="footer__menuItem">FAQ</li>
        </ul>
        <div className="footer__infoText">
          Desenvolvido por Mateus Begosso &#x1f920;
        </div>
        <div className="footer__socialIcons">
          <a
            className="footer__icon"
            href="https://github.com/MateusBegosso"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            className="footer__icon"
            href="https://www.linkedin.com/in/mateus-begosso"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
