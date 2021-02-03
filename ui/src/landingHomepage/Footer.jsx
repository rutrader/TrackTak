import React from "react";

const Footer = () => {
  return (
    <footer class="footer pt-150 gray-bg">
      <img src="assets/img/shape/footer-bg.svg" alt="" class="footer-bg" />
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="footer-links text-center">
              <a href="index.html" class="logo">
                <img src="assets/img/logo/logo-2.svg" alt="" />{" "}
              </a>
              <div class="footer-social-links">
                <ul>
                  <li>
                    <a href="javascript:void(0)">
                      <i class="lni lni-linkedin-original"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <nav class="footer-menu">
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#service">Service</a>
                  </li>
                  <li>
                    <a href="#process">Process</a>
                  </li>
                  <li>
                    <a href="#team">Team</a>
                  </li>
                  <li>
                    <a href="#blog">Blog</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="copyright-area text-center">
          <p class="mb-0">© 2021 tracktak ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
