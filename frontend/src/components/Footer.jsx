import React from 'react';

const Footer = () => (
  <footer id="footer" className="footer">
    <div className="container footer-top">
      <div className="row gy-4">
        {/* Footer About Section */}
        <div className="col-lg-4 col-md-8 footer-about">
          <a href="index.html" className="d-flex align-items-center">
            <span className="sitename">FlexStart</span>
          </a>
          <div className="footer-contact pt-3">
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
            <p className="mt-3">
              <strong>Phone:</strong> <span>+1 5589 55488 55</span>
            </p>
            <p>
              <strong>Email:</strong> <span>info@example.com</span>
            </p>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="col-lg-4 col-md-8 footer-links">
          <ul>
            <li>
              <i className="bi bi-chevron-right"></i> <a href="#">Home</a>
            </li>
            <li>
              <i className="bi bi-chevron-right"></i> <a href="#">About us</a>
            </li>
            <li>
              <i className="bi bi-chevron-right"></i> <a href="#">Services</a>
            </li>
            <li>
              <i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a>
            </li>
          </ul>
        </div>

        {/* Footer Newsletter and Social Links */}
        <div className="col-lg-4 col-md-12">
          <p>
            Cras fermentum odio eu feugiat lide par naso tierra videa magna
            derita valies
          </p>
          <form
            action="forms/newsletter.php"
            method="post"
            className="php-email-form"
          >
            <div className="newsletter-form">
              <input type="email" name="email" placeholder="Enter your email" />
              <input type="submit" value="Subscribe" />
            </div>
            <div className="loading">Loading</div>
            <div className="error-message"></div>
            <div className="sent-message">
              Your subscription request has been sent. Thank you!
            </div>
          </form>
          <div className="social-links d-flex">
            <a href="#" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Copyright */}
    <div className="container copyright text-center mt-4">
      <p>
        © <strong className="sitename">FlexStart</strong> All Rights Reserved
      </p>
    </div>
  </footer>
);

export default Footer;
