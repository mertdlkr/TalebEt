import { useState, useEffect } from 'react';
import './App.css';
import Contact from './Contact';

function Dashboard({ onLogout }) {
  const [budget] = useState(5000); // Örnek bütçe
  const [requests] = useState([
    { 
      id: 1, 
      title: 'Ekmek', 
      price: 15, 
      status: 'Beklemede', 
      date: '2024-03-15',
      quantity: 2,
      unit: 'adet'
    },
    { 
      id: 2, 
      title: 'Tuz', 
      price: 25, 
      status: 'Onaylandı', 
      date: '2024-03-10',
      quantity: 1,
      unit: 'kg'
    },
    { 
      id: 3, 
      title: 'Yağ', 
      price: 150, 
      status: 'Reddedildi', 
      date: '2024-03-05',
      quantity: 1,
      unit: 'litre'
    },
  ]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <i className="fas fa-graduation-cap"></i>
          <span>TalebEt</span>
        </div>
        <div className="header-right">
          <span className="budget-display">
            <i className="fas fa-wallet"></i>
            Mevcut Bütçe: {budget.toLocaleString('tr-TR')} ₺
          </span>
          <button className="logout-button" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Çıkış Yap
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Yeni Market Talebi Oluştur</h2>
          <button className="new-request-button">
            <i className="fas fa-shopping-cart"></i>
            Yeni Talep
          </button>
        </div>

        <div className="dashboard-section">
          <h2>Market Taleplerim</h2>
          <div className="requests-list">
            {requests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <h3>{request.title}</h3>
                  <span className={`status-badge ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-details">
                  <p>
                    <i className="fas fa-lira-sign"></i> 
                    {request.price.toLocaleString('tr-TR')} ₺
                  </p>
                  <p>
                    <i className="fas fa-box"></i> 
                    {request.quantity} {request.unit}
                  </p>
                  <p>
                    <i className="fas fa-calendar"></i> 
                    {request.date}
                  </p>
                </div>
                <div className="request-actions">
                  <button className="action-button">
                    <i className="fas fa-edit"></i>
                    Düzenle
                  </button>
                  <button className="action-button delete">
                    <i className="fas fa-trash"></i>
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Handle URL changes to update current page
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPage(path);
  }, []);

  const handleNavigation = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPage(path);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'dilsu' && loginData.password === '123') {
      setShowLoginModal(false);
      setLoginError('');
      setIsLoggedIn(true);
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (currentPage === '/iletisim') {
    return <Contact />;
  }

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setShowModal(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <i className="fas fa-graduation-cap"></i>
          <span>TalebEt</span>
        </div>
        <nav className="header-right">
          <a href="#nasil-calisir">Nasıl Çalışır?</a>
          <a href="#hakkimizda">Hakkımızda</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/iletisim'); }}>İletişim</a>
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Giriş Yap</button>
        </nav>
      </header>

      <div className="landing-container">
        <div className="logo-section">
          <i className="fas fa-graduation-cap logo-icon"></i>
          <h1>TalebEt</h1>
        </div>
        
        <div className="hero-section">
          <h2>Öğrenci Taleplerini Kolayca İlet</h2>
          <p>Eğitim hayatını kolaylaştıran dijital platform</p>
          <button className="cta-button" onClick={() => setShowModal(true)}>Hemen Başla</button>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <i className="fas fa-tasks"></i>
            <h3>Kolay Talep Oluştur</h3>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <h3>Hızlı Yanıt Al</h3>
          </div>
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Toplulukla Etkileşim</h3>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="registration-container">
              <div className="registration-section student">
                <h3>Öğrenci Kaydı</h3>
                <form onSubmit={handleRegistration}>
                  <input type="text" placeholder="Ad Soyad" />
                  <input type="email" placeholder="E-posta" />
                  <input type="password" placeholder="Şifre" />
                  <input type="text" placeholder="Okul" />
                  <input type="text" placeholder="Bölüm" />
                  <div className="file-upload-container">
                    <label htmlFor="student-document" className="file-upload-label">
                      <i className="fas fa-cloud-upload-alt"></i>
                      Öğrenci Belgesi Yükle
                    </label>
                    <input 
                      type="file" 
                      id="student-document" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="file-upload-input"
                    />
                    <p className="file-info">PDF, JPG veya PNG formatında</p>
                  </div>
                  <button type="submit">Kayıt Ol</button>
                </form>
              </div>
              <div className="registration-section supporter">
                <h3>Destekçi Kaydı</h3>
                <form onSubmit={handleRegistration}>
                  <input type="text" placeholder="Ad Soyad" />
                  <input type="email" placeholder="E-posta" />
                  <input type="password" placeholder="Şifre" />
                  <input type="text" placeholder="Kurum/Şirket" />
                  <input type="text" placeholder="Pozisyon" />
                  <button type="submit">Kayıt Ol</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-modal">
            <div className="confirmation-content">
              <i className="fas fa-envelope-open-text"></i>
              <h3>Kayıt İşleminiz Tamamlandı!</h3>
              <p>Kayıt işleminizin tamamlanması için belirttiğiniz adrese mail gelecektir.</p>
              <button onClick={handleConfirmationClose} className="confirmation-button">
                Tamam
              </button>
            </div>
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
              <li><a href="#nasil-calisir">Nasıl Çalışır?</a></li>
              <li><a href="#hakkimizda">Hakkımızda</a></li>
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

export default App;
