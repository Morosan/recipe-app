export const Footer = () => {

    return (
      <footer className="footer">
        <div className="footer-inner-container">
            <ul className="footer-main-nav">
                <li className="footer-item">
                    <a className="footer-link" href="/">Home</a>
                </li>
                <li className="footer-item">
                    <a className="footer-link" href="/">About</a>
                </li>
                <li className="footer-item">
                    <a className="footer-link" href="/">FAQ</a>
                </li>
                <li className="footer-item">
                    <a className="footer-link" href="/">Contact</a>
                </li>
            </ul>
            <hr className="divider"/>
            <p className="footer-description">Welcome to Just Cook! Create an account today and gain access to a world of culinary delights. <br />Save your favorite recipes, create your own masterpieces, and never run out of inspiration again. Sign up now and let your cooking journey begin!</p>
            <ul className="footer-secondary-nav">
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i class="bi bi-facebook"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i class="bi bi-twitter"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i class="bi bi-instagram"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i class="bi bi-linkedin"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i class="bi bi-reddit"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i class="bi bi-github"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div className="copyright-wrapper">
            {`© JUST COOK ${new Date().getFullYear()}. All Rights Reserved.`}
        </div>
      </footer>
    )
  }
  
  