"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Facebook, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
    alert("תודה על ההרשמה!")
  }

  return (
    <footer className="footer-container">
      {/* About Us Section */}
      <div className="about-section">
        <div className="about-content">
          <h2>אודות</h2>
          <p>
            אתר דפי צביעה מוביל אתכם להיות חברים רשומים ולקבל מאיתנו ציורים, עדכונים על דפי צביעה חדשים והמון מוצרי
            הדפסה שלנו מכל האתרים. אנו מחויבים לספק לכם את חווית הצביעה הטובה ביותר עם מגוון רחב של דפי צביעה איכותיים
            לילדים ולמבוגרים.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h3>הצטרפו לאתר המוביל בארץ</h3>
          <p>קבלו עדכונים על דפי צביעה חדשים, מבצעים מיוחדים ותכנים בלעדיים</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="מהי כתובת האימייל שלך?"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              צרפו גם אותי!
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="main-footer">
        <div className="footer-columns">
          {/* Column 1 - About Us */}
          <div className="footer-column">
            <h4>עלינו</h4>
            <ul>
              <li>
                <Link to="/about">אודות</Link>
              </li>
              <li>
                <Link to="/terms">כתבות והמלצות</Link>
              </li>
              <li>
                <Link to="/team">תמיכה טכנית</Link>
              </li>
              <li>
                <Link to="/contact">צור קשר</Link>
              </li>
              <li>
                <Link to="/privacy">פרטיות אצלנו</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Products */}
          <div className="footer-column">
            <h4>מוצרים</h4>
            <ul>
              <li>
                <Link to="/products/coloring">פוסטרים לצביעה</Link>
              </li>
              <li>
                <Link to="/products/sets">סטים לצביעה</Link>
              </li>
              <li>
                <Link to="/products/kids">חוברות צביעה לילדים</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Recommendations */}
          <div className="footer-column">
            <h4>המומלצים</h4>
            <ul>
              <li>
                <Link to="/recommended/pages">כל דפי הצביעה</Link>
              </li>
              <li>
                <Link to="/recommended/tutorials">איך לצייר - סרטוני הדרכה</Link>
              </li>
              <li>
                <Link to="/recommended/kids">דפי עבודה לילדים</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Site Usage */}
          <div className="footer-column">
            <h4>שימוש באתר</h4>
            <ul>
              <li>
                <Link to="/usage/faq">שאלות נפוצות</Link>
              </li>
              <li>
                <Link to="/usage/download">אתר להורדה</Link>
              </li>
              <li>
                <Link to="/usage/terms">תנאי שימוש באתר</Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Privacy */}
          <div className="footer-column">
            <h4>משחקי צביעה</h4>
            <ul>
              <li>
                <Link to="/games/computer">משחקי צביעה במחשב וניידים</Link>
              </li>
              <li>
                <Link to="/games/online">איך לצייר</Link>
              </li>
              <li>
                <Link to="/games/apps">משחקי ציור אונליין</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-media">
          <a href="https://facebook.com" className="social-icon facebook" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="https://youtube.com" className="social-icon youtube" aria-label="YouTube">
            <Youtube />
          </a>
          <a href="mailto:info@example.com" className="social-icon mail" aria-label="Email">
            <Mail />
          </a>
        </div>

        {/* Logo */}
        <div className="footer-logo">
          <img src="/placeholder.svg?height=80&width=80&text=LOGO" alt="Logo" />
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>© {new Date().getFullYear()} כל הזכויות שמורות לאתר "דפי צביעה להדפסה"</p>
          <p>התכנים באתר מיועדים לשימוש אישי של הגולש בלבד. אין להעתיק, לשכפל או להפיץ את התכנים בשום צורה.</p>
        </div>
      </div>

      <style>{`
        .footer-container {
          width: 100%;
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          direction: rtl;
          font-family: 'Arial', sans-serif;
        }

        .about-section {
          padding: 3rem 2rem;
          text-align: center;
          background-color: rgba(245, 245, 245, 0.3);
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-content h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #333;
          position: relative;
          display: inline-block;
        }

        .about-content h2:after {
          content: '';
          position: absolute;
          width: 50%;
          height: 3px;
          background: linear-gradient(to right, #ff6b9d, #4ecdc4);
          bottom: -10px;
          left: 25%;
        }

        .about-content p {
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          color: #444;
        }

        .newsletter-section {
          background-color: rgba(240, 240, 240, 0.3);
          padding: 2.5rem 2rem;
          text-align: center;
        }

        .newsletter-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .newsletter-content h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .newsletter-content p {
          margin-bottom: 1.5rem;
          color: #555;
        }

        .newsletter-form {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }

        .newsletter-input:focus {
          border-color: #ff6b9d;
        }

        .newsletter-button {
          background-color: #ff6b9d;
          color: white;
          border: none;
          padding: 0 1.5rem;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        .newsletter-button:hover {
          background-color: #e84c8a;
        }

        .main-footer {
          padding: 3rem 2rem 1.5rem;
          background-color: rgba(50, 50, 50, 0.7);
          color: #fff;
        }

        .footer-columns {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto 2rem;
        }

        .footer-column {
          flex: 1;
          min-width: 200px;
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }

        .footer-column h4 {
          font-size: 1.2rem;
          margin-bottom: 1.2rem;
          position: relative;
          display: inline-block;
        }

        .footer-column h4:after {
          content: '';
          position: absolute;
          width: 40px;
          height: 2px;
          background-color: #ff6b9d;
          bottom: -5px;
          right: 0;
          transition: width 0.3s ease;
        }

        .footer-column:hover h4:after {
          width: 100%;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column ul li {
          margin-bottom: 0.7rem;
        }

        .footer-column ul li a {
          color: #ddd;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }

        .footer-column ul li a:before {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          right: 0;
          background-color: #ff6b9d;
          transition: width 0.3s ease;
        }

        .footer-column ul li a:hover {
          color: #fff;
        }

        .footer-column ul li a:hover:before {
          width: 100%;
        }

        .social-media {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 0.5rem;
          color: #fff;
          transition: transform 0.3s, background-color 0.3s;
        }

        .social-icon.facebook {
          background-color: #3b5998;
        }

        .social-icon.instagram {
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
        }

        .social-icon.youtube {
          background-color: #ff0000;
        }

        .social-icon.mail {
          background-color: #4ecdc4;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }

        .footer-logo {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .footer-logo img {
          max-width: 100%;
          height: auto;
        }

        .copyright {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.9rem;
          color: #aaa;
        }

        .copyright p {
          margin: 0.5rem 0;
        }

        @media (max-width: 768px) {
          .footer-columns {
            flex-direction: column;
          }

          .footer-column {
            width: 100%;
            padding: 0;
            margin-bottom: 2rem;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-input {
            border-radius: 4px;
            margin-bottom: 1rem;
          }

          .newsletter-button {
            border-radius: 4px;
            padding: 0.8rem;
          }
        }
      `}</style>
    </footer>
  )
}
