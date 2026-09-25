const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="footer-logo">HuntDeal</a>
          <p>Deal discovery made simple.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/about">About</a>
          <a href="/guides">Buying Guides</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Disclaimer</a>
        </nav>

        <div className="footer-disclosures">
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
          <p>Prices and availability may change. Always verify details on Amazon before purchasing.</p>
          <p className="footer-copy">© 2026 HuntDeal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
