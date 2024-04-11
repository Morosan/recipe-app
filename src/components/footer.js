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

            <p className="paragraph footer-description">Welcome to Cook Book! Create an account today and gain access to a world of culinary delights. <br />Save your favorite recipes, create your own masterpieces, and never run out of inspiration again. Sign up now and let your cooking journey begin! <br/>
            Images Designed by <a className="credits" target="_blank" rel="noopener noreferrer" href="https://www.freepik.com/free-psd/restaurant-ad-banner-template_9737285.htm#fromView=search&page=1&position=4&uuid=d4ee2b11-2213-4c46-8063-2844257c6e77">Freepik</a>
            </p>
            
            <ul className="footer-secondary-nav">
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i className="bi bi-facebook"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i className="bi bi-twitter"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i className="bi bi-instagram"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i className="bi bi-linkedin"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i className="bi bi-reddit"></i>
                    </a>
                </li>
                <li className="footer-icon-wrapper">
                    <a className="footer-link" href="/">
                        <i className="bi bi-github"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div className="copyright-wrapper">
            {`© COOK BOOK ${new Date().getFullYear()}. All Rights Reserved.`}
        </div>
      </footer>
    )
  }
  
  