import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <section className="footer-wrapper py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <Link to={"/"}>
                <svg
                  id="logo-16"
                  className="logooo"
                  width="100"
                  height="48"
                  viewBox="0 0 109 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M64.9315 11.4284C62.1883 8.6852 58.9316 6.5091 55.3475 5.0245C51.7633 3.5399 47.9219 2.7758 44.0424 2.7758C40.1629 2.7758 36.3215 3.5399 32.7373 5.0245C29.1532 6.5091 25.8965 8.6852 23.1533 11.4284L44.0424 32.3174L64.9315 11.4284Z"
                    class="ccompli1"
                    fill="#FFD200"
                  ></path>{" "}
                  <path
                    d="M44.0686 32.3475C46.8118 35.0907 50.0684 37.2667 53.6526 38.7513C57.2367 40.2359 61.0782 41 64.9577 41C68.837 41 72.679 40.2359 76.263 38.7513C79.847 37.2667 83.104 35.0907 85.847 32.3475L64.9577 11.4584L44.0686 32.3475Z"
                    class="ccompli2"
                    fill="#06E07F"
                  ></path>{" "}
                  <path
                    d="M44.017 32.3429C41.2738 35.0861 38.0171 37.2621 34.433 38.7467C30.8488 40.2313 27.0074 40.9954 23.1279 40.9954C19.2484 40.9954 15.407 40.2313 11.8228 38.7467C8.2387 37.2621 4.982 35.0861 2.2388 32.3429L23.1279 11.4538L44.017 32.3429Z"
                    class="ccustom"
                    fill="#E3073C"
                  ></path>{" "}
                  <path
                    d="M64.9831 11.433C67.726 8.6898 70.983 6.5138 74.567 5.0292C78.151 3.5446 81.993 2.7805 85.872 2.7805C89.752 2.7805 93.593 3.5446 97.177 5.0292C100.761 6.5138 104.018 8.6898 106.761 11.433L85.872 32.3221L64.9831 11.433Z"
                    class="ccustom"
                    fill="#1F84EF"
                  ></path>{" "}
                </svg>
              </Link>
              <p>Features</p>
              <Link to={"/about"}>
                {" "}
                <p>About</p>
              </Link>
              <Link to={"/contact"}>
                {" "}
                <p>Contact</p>
              </Link>
              <p>Blog</p>
            </div>
            <div className="col-md-4 col-12">
              <h2 className="mb-4">Support</h2>
              <p>Troubleshooting</p>
              <p>Complaints</p>
              <p>Updates</p>
              <p>Manuals</p>
            </div>
            <div className="col-md-4 col-12">
              <h2 className="mb-3">Resources</h2>
              <p>FAQS</p>
              <p>Downloads</p>
              <p>Policies</p>
              <p>Guidlines</p>
            </div>
          </div>
        </div>
        <footer className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-4 mb-4 d-flex  flex-column ">
                <h2 className="text-white">Contact Us</h2>
                <div className="">
                  <address>
                  
                    No 1240 Benin, Edo State
                    <br />
                    Nigeria
                  </address>
                  <p>
                    <a href="tel:+234 8103193091" className="hotline">
                      +234 810556677
                    </a>{" "}
                  </p>
                  <p>
                    <a href="mailto:davidodimayo@gmail.com" className="hotline">
                     John-doe@gmail.com
                    </a>{" "}
                  </p>
                </div>

                <div className="social-btn">
                  <a>
                    <FaFacebook />
                  </a>
                  <a>
                    <FaTwitter />
                  </a>
                  <a>
                    <FaLinkedin />
                  </a>
                  <a>
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 pb">
                <p>
                  &copy;{new Date().getFullYear()} powered by ,Moses
                  <span className="logo-x">X</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
