import {Helmet} from "react-helmet";

function Footer(){
    return(
        <div className="footer-4">
            <div className="footer-container">
            <div className="footer-col"><img src="images/cointego-logo.png" loading="lazy" srcSet="images/cointego-logo-p-500.png 500w, images/cointego-logo-p-800.png 800w, images/cointego-logo-p-1080.png 1080w, images/cointego-logo-p-1600.png 1600w, images/cointego-logo.png 1645w" width="200" sizes="(max-width: 479px) 42vw, 200px" alt="" className="image-8" />
                <div className="text-block-7">Copyright © 2022 Cointego.com. All Rights Reserved.</div>
            </div>
            </div>
            <Helmet>
                <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6018add6d52fe351d4ac86c4" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
                <script src="js/cointego.js" type="text/javascript"></script>
            </Helmet>
        </div>
    )
}

export default Footer;