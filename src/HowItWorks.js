import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

function HowItWorks() {
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
          <a href="/nasil-calisir" className="active">Nasıl Çalışır?</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/hakkimizda'); }}>Hakkımızda</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/iletisim'); }}>İletişim</a>
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Giriş Yap</button>
        </nav>
      </header>

      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h1>Nasıl Çalışır?</h1>
          <p>TalebEt'i kullanarak adım adım market talebinizi oluşturun</p>
        </div>

        <div className="how-it-works-content">
          <div className="steps-section">
            <h2>Öğrenciler İçin</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Kayıt Olun</h3>
                  <p>Öğrenci belgenizle sisteme kayıt olun. Güvenli ve kolay kayıt işlemi.</p>
                  <div className="step-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Giriş Yapın</h3>
                  <p>Kullanıcı adı ve şifrenizle sisteme giriş yapın. Dashboard'ınız hazır!</p>
                  <div className="step-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Market Seçin</h3>
                  <p>"Yeni Talep" butonuna basın ve 9 farklı market arasından birini seçin.</p>
                  <div className="step-icon">
                    <i className="fas fa-store"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Ürün Seçin</h3>
                  <p>Sol taraftaki ürün listesinden istediğiniz ürünleri sepete ekleyin.</p>
                  <div className="step-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Sepeti Kontrol Edin</h3>
                  <p>Sağ taraftaki sepetinizde ürünleri kontrol edin, miktarları ayarlayın.</p>
                  <div className="step-icon">
                    <i className="fas fa-list-ul"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">6</div>
                <div className="step-content">
                  <h3>Talebi Gönderin</h3>
                  <p>"Talebi Gönder" butonuna basın. Siparişiniz başarıyla oluşturuldu!</p>
                  <div className="step-icon">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">7</div>
                <div className="step-content">
                  <h3>Sipariş Takibi</h3>
                  <p>"Mevcut Taleplerim" ile siparişlerinizi takip edin. Durum güncellemeleri alın.</p>
                  <div className="step-icon">
                    <i className="fas fa-truck"></i>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">8</div>
                <div className="step-content">
                  <h3>QR Kod ile Teslim</h3>
                  <p>Sipariş hazır olunca QR kodunuzu göstererek mağazadan teslim alın.</p>
                  <div className="step-icon">
                    <i className="fas fa-qrcode"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2>Platform Özellikleri</h2>
            <div className="features-showcase">
              <div className="feature-showcase">
                <div className="feature-image">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="feature-details">
                  <h3>Mobil Uyumlu Tasarım</h3>
                  <p>
                    Platform tüm cihazlarda mükemmel çalışır. Telefon, tablet veya 
                    bilgisayardan rahatlıkla kullanabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="feature-showcase">
                <div className="feature-image">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-details">
                  <h3>Güvenli İşlem</h3>
                  <p>
                    Tüm işlemleriniz SSL ile şifrelenir. Kişisel bilgileriniz 
                    güvende tutulur ve hiçbir şekilde paylaşılmaz.
                  </p>
                </div>
              </div>

              <div className="feature-showcase">
                <div className="feature-image">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="feature-details">
                  <h3>Harcama Takibi</h3>
                  <p>
                    Dashboard'ınızda harcamalarınızı takip edin. Aylık raporlar 
                    ve istatistiklerle bütçenizi yönetin.
                  </p>
                </div>
              </div>

              <div className="feature-showcase">
                <div className="feature-image">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="feature-details">
                  <h3>Anlık Bildirimler</h3>
                  <p>
                    Sipariş durumu değişikliklerinde anlık bildirim alın. 
                    Kampanyalardan ve fırsatlardan haberdar olun.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Sık Sorulan Sorular</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>📝 Kayıt olmak için hangi belgeler gerekli?</h4>
                <p>Öğrenci belgeniz (PDF, JPG veya PNG formatında) yeterlidir. Güncel öğrenci belgenizi sisteme yükleyerek doğrulama işlemini tamamlayabilirsiniz.</p>
              </div>

              <div className="faq-item">
                <h4>💰 Ödeme nasıl yapılıyor?</h4>
                <p>Platform üzerinden doğrudan ödeme yapmıyorsunuz. Destekçiler tarafından karşılanan siparişler QR kod ile mağazadan teslim alınır.</p>
              </div>

              <div className="faq-item">
                <h4>⏰ Siparişim ne kadar sürede hazır olur?</h4>
                <p>Siparişler genellikle 2-4 saat içinde hazır hale gelir. Durum güncellemeleri "Mevcut Taleplerim" bölümünden takip edilebilir.</p>
              </div>

              <div className="faq-item">
                <h4>🏪 Hangi marketlerden sipariş verebilirim?</h4>
                <p>Migros, CarrefourSA, A101, Şok, BIM, Hakmar, Happy Center, Snowy ve Üçler marketlerinden sipariş verebilirsiniz.</p>
              </div>

              <div className="faq-item">
                <h4>📱 QR kod nasıl kullanılır?</h4>
                <p>Siparişiniz hazır olduğunda QR kodunuz aktif olur. Mağazaya giderek QR kodu göstermeniz yeterlidir.</p>
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

export default HowItWorks; 