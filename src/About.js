import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

function About() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const handleNavigation = (path) => {
    window.history.pushState({}, '', path);
    window.location.href = path;
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
      window.location.href = '/';
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
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
          <a href="/hakkimizda" className="active">Hakkımızda</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/iletisim'); }}>İletişim</a>
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Giriş Yap</button>
        </nav>
      </header>

      <div className="about-container">
        <div className="about-header">
          <h1>Hakkımızda</h1>
          <p>TalebEt ile öğrenci yaşamını kolaylaştırıyoruz</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Misyonumuz</h2>
            <p>
              TalebEt olarak, öğrencilerin temel ihtiyaçlarını karşılamada yaşadıkları zorlukları 
              ortadan kaldırmayı hedefliyoruz. Dijital platformumuz sayesinde öğrenciler, 
              market alışverişlerini kolayca talep edebilir ve destekçilerden yardım alabilir.
            </p>
          </div>

          <div className="about-section">
            <h2>Vizyonumuz</h2>
            <p>
              Türkiye'nin her yerindeki öğrencilerin eğitim hayatlarını desteklemek ve 
              sosyal dayanışmayı güçlendirmek. Teknoloji ile toplumsal yardımlaşmayı 
              bir araya getirerek, kimsenin temel ihtiyaçları nedeniyle eğitiminden 
              geri kalmamasını sağlamak.
            </p>
          </div>

          <div className="about-section">
            <h2>Nasıl Çalışıyoruz?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <h3>Topluluk Odaklı</h3>
                <p>Öğrenciler ve destekçiler arasında güvenli bir köprü kuruyoruz</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-shield-alt"></i>
                <h3>Güvenli Platform</h3>
                <p>Tüm işlemler güvenli ve şeffaf şekilde gerçekleştirilir</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-mobile-alt"></i>
                <h3>Kolay Kullanım</h3>
                <p>Sade ve anlaşılır arayüz ile herkes kolayca kullanabilir</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-clock"></i>
                <h3>Hızlı Hizmet</h3>
                <p>Talepler hızla değerlendirilir ve karşılanır</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>İstatistiklerimiz</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">2,500+</div>
                <div className="stat-label">Aktif Öğrenci</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">850+</div>
                <div className="stat-label">Destekçi</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15,000+</div>
                <div className="stat-label">Tamamlanan Talep</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25</div>
                <div className="stat-label">Partner Market</div>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Değerlerimiz</h2>
            <div className="values-list">
              <div className="value-item">
                <i className="fas fa-heart"></i>
                <div>
                  <h4>Dayanışma</h4>
                  <p>Toplumsal dayanışma ve yardımlaşma ruhu</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-balance-scale"></i>
                <div>
                  <h4>Eşitlik</h4>
                  <p>Herkesin eşit fırsatlara sahip olması</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-lightbulb"></i>
                <div>
                  <h4>İnovasyon</h4>
                  <p>Teknoloji ile sosyal sorunlara çözüm</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-handshake"></i>
                <div>
                  <h4>Güven</h4>
                  <p>Şeffaf ve güvenilir hizmet anlayışı</p>
                </div>
              </div>
            </div>
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
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/iletisim'); }}>İletişim</a></li>
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

export default About; 