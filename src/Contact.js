import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'dilsu' && loginData.password === '123') {
      setShowLoginModal(false);
      setLoginError('');
      // Redirect to dashboard
      window.location.href = '/';
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here in a real application
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleNavigation = (path) => {
    window.history.pushState({}, '', path);
    window.location.href = path;
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <img 
            src={logo} 
            alt="TalebEt" 
            className="header-logo" 
            onClick={() => handleNavigation('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <nav className="header-right">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/nasil-calisir'); }}>Nasıl Çalışır?</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/hakkimizda'); }}>Hakkımızda</a>
          <a href="/iletisim" className="active">İletişim</a>
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Giriş Yap</button>
        </nav>
      </header>

      <div className="contact-container">
        <div className="contact-header">
          <h1>İletişim</h1>
          <p>Bize ulaşmak için aşağıdaki bilgileri kullanabilir veya formu doldurabilirsiniz.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Adres</h3>
              <p>Teknoloji Vadisi, İstanbul Üniversitesi Kampüsü, 34452 İstanbul</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-phone"></i>
              <h3>Telefon</h3>
              <p>+90 555 555 5555</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-envelope"></i>
              <h3>E-posta</h3>
              <p>info@talebet.com</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-clock"></i>
              <h3>Çalışma Saatleri</h3>
              <p>Pazartesi - Cuma: 09:00 - 18:00</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Bize Ulaşın</h2>
            {formSubmitted ? (
              <div className="form-success-message">
                <i className="fas fa-check-circle"></i>
                <h3>Mesajınız alındı!</h3>
                <p>En kısa sürede size geri dönüş yapacağız.</p>
                <button onClick={() => setFormSubmitted(false)} className="cta-button">Yeni Mesaj</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta Adresiniz</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Konu</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesajınız</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Gönder</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content login-modal">
            <button className="close-button" onClick={() => setShowLoginModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <h3>Giriş Yap</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                value={loginData.username}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              {loginError && <p className="error-message">{loginError}</p>}
              <button type="submit">Giriş Yap</button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>TalebEt</h4>
            <p>Öğrenci taleplerini kolayca iletmenin en kolay yolu.</p>
          </div>
          <div className="footer-section">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>Ana Sayfa</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/nasil-calisir'); }}>Nasıl Çalışır?</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/hakkimizda'); }}>Hakkımızda</a></li>
              <li><a href="/iletisim">İletişim</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>İletişim</h4>
            <ul>
              <li><i className="fas fa-envelope"></i> info@talebet.com</li>
              <li><i className="fas fa-phone"></i> +90 555 555 5555</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 TalebEt. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact; 