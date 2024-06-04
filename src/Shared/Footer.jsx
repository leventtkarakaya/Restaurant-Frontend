import { Link } from "react-router-dom";
import Logo from "../../public/Logo.png";
import {
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";
export default function Footer() {
  return (
    <>
      <footer className="p-10 footer bg-[#03396c]  text-white">
        <aside>
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              width={250}
              height={250}
              className="rounded-full"
            />
          </Link>
          <p>
            <span className="footer-title">Macro Center Ltd.</span>
            <br />
            {`1992'den bu yana güvenilir hizmetlerimiz`}
          </p>
        </aside>
        <nav>
          <h6 className="text-xl footer-title text-[#b3cde0]">Hizemtlerimiz</h6>
          <Link to="/" className="link link-hover">
            Markalaşma
          </Link>
          <Link to="/" className="link link-hover">
            Güven
          </Link>
          <Link to="/" className="link link-hover">
            Market
          </Link>
        </nav>
        <nav>
          <h6 className="text-xl footer-title  text-[#b3cde0]">Şirketmiz</h6>
          <Link to="/" className="link link-hover">
            Hakkımızda
          </Link>
          <Link to="/" className="link link-hover">
            İletisim
          </Link>
          <Link to="/" className="link link-hover">
            Kariyer
          </Link>
        </nav>
        <nav>
          <h6 className="text-xl footer-title  text-[#b3cde0]">Social Media</h6>
          <Link
            to="/"
            className="flex items-center justify-center gap-5 link link-hover"
          >
            <FiInstagram /> <span>Instagram</span>
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-5 link link-hover"
          >
            <FiTwitter /> <span>Twitter</span>
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-5 link link-hover"
          >
            <FiLinkedin /> <span>Linkedin</span>
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-5 link link-hover"
          >
            <FiFacebook /> <span>Facebook</span>
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-5 link link-hover"
          >
            <FiYoutube /> <span>Youtube</span>
          </Link>
        </nav>
      </footer>
    </>
  );
}
