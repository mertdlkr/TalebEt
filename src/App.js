import { useState, useEffect } from 'react';
import './App.css';
import Contact from './Contact';
import About from './About';
import HowItWorks from './HowItWorks';
import logo from './logo.png';
import qrCode from './qr-code.png';

function Dashboard({ onLogout }) {
  const [budget] = useState(5000);
  const [showMarketSelection, setShowMarketSelection] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showActiveOrders, setShowActiveOrders] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [cart, setCart] = useState([]);
  const [activeOrders, setActiveOrders] = useState([
    {
      id: 1,
      market: 'Migros',
      date: '2024-03-20',
      total: 185,
      status: 'Tamamlandı',
      items: [
        { name: 'Ekmek', quantity: 2, price: 15 },
        { name: 'Süt', quantity: 1, price: 25 },
        { name: 'Yumurta', quantity: 1, price: 45 },
        { name: 'Domates', quantity: 2, price: 20 }
      ]
    }
  ]);

  const markets = [
    'Migros',
    'CarrefourSA', 
    'A101',
    'Şok',
    'BIM',
    'Hakmar',
    'Happy Center',
    'Snowy',
    'Üçler'
  ];

  const products = [
    { id: 1, name: 'Ekmek', price: 15, category: 'Temel Gıda' },
    { id: 2, name: 'Süt', price: 25, category: 'Süt Ürünleri' },
    { id: 3, name: 'Yumurta', price: 45, category: 'Temel Gıda' },
    { id: 4, name: 'Domates', price: 20, category: 'Meyve & Sebze' },
    { id: 5, name: 'Soğan', price: 12, category: 'Meyve & Sebze' },
    { id: 6, name: 'Pirinç', price: 35, category: 'Temel Gıda' },
    { id: 7, name: 'Makarna', price: 18, category: 'Temel Gıda' },
    { id: 8, name: 'Tavuk', price: 85, category: 'Et & Balık' },
  ];

  const handleNewRequest = () => {
    setShowMarketSelection(true);
  };

  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
    setShowMarketSelection(false);
    setShowProductList(true);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? {...item, quantity: newQuantity}
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBackToRequests = () => {
    setShowProductList(false);
    setSelectedMarket('');
    setCart([]);
  };

  const handleSubmitRequest = () => {
    // Yeni siparişi aktif siparişlere ekle
    const newOrder = {
      id: activeOrders.length + 1,
      market: selectedMarket,
      date: new Date().toLocaleDateString('tr-TR'),
      total: getTotalPrice(),
      status: 'Hazırlanıyor',
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };
    setActiveOrders([newOrder, ...activeOrders]);
    
    // Sepeti temizle ve başarı popup'ını göster
    setCart([]);
    setShowProductList(false);
    setSelectedMarket('');
    setShowOrderSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowOrderSuccess(false);
  };

  const handleShowActiveOrders = () => {
    setShowOrderSuccess(false);
    setShowActiveOrders(true);
  };

  const handleBackToMain = () => {
    setShowActiveOrders(false);
    setShowQRCode(false);
  };

  const handleShowQR = (order) => {
    setShowQRCode(true);
  };

  // QR Code Page
  if (showQRCode) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-left">
            <img 
              src={logo} 
              alt="TalebEt" 
              className="header-logo" 
              onClick={onLogout}
              style={{ cursor: 'pointer' }}
            />
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

        <div className="qr-code-container">
          <button className="back-button" onClick={handleBackToMain}>
            <i className="fas fa-arrow-left"></i>
            Geri Dön
          </button>
          
          <div className="qr-code-content">
            <h2>QR Kodunuz</h2>
            <p>Mağazada bu QR kodu göstererek siparişinizi teslim alabilirsiniz.</p>
            <div className="qr-code-display">
              <img src={qrCode} alt="QR Code" className="qr-code-image" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Orders Page
  if (showActiveOrders) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-left">
            <img 
              src={logo} 
              alt="TalebEt" 
              className="header-logo" 
              onClick={onLogout}
              style={{ cursor: 'pointer' }}
            />
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

        <div className="active-orders-container">
          <button className="back-button" onClick={handleBackToMain}>
            <i className="fas fa-arrow-left"></i>
            Geri Dön
          </button>
          
          <div className="active-orders-content">
            <h2>Aktif Siparişlerim</h2>
            <div className="orders-list">
              {activeOrders.map(order => (
                <div 
                  key={order.id} 
                  className={`order-card ${order.status === 'Tamamlandı' ? 'completed' : ''}`}
                  onClick={() => handleShowQR(order)}
                  style={{ cursor: order.status === 'Tamamlandı' ? 'pointer' : 'default' }}
                >
                  <div className="order-header">
                    <div className="order-info">
                      <h3>{order.market}</h3>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <div className="order-status">
                      {order.status === 'Tamamlandı' ? (
                        <div className="status-completed">
                          <i className="fas fa-check-circle"></i>
                          <span>Tamamlandı</span>
                        </div>
                      ) : (
                        <div className="status-preparing">
                          <i className="fas fa-clock"></i>
                          <span>Hazırlanıyor</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="order-details">
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <span key={index} className="order-item">
                          {item.name} x{item.quantity}
                          {index < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                    <div className="order-total">
                      <strong>{order.total} ₺</strong>
                    </div>
                  </div>
                  {order.status === 'Tamamlandı' && (
                    <div className="qr-hint">
                      <i className="fas fa-qrcode"></i>
                      <span>QR Kodu Görmek İçin Tıklayın</span>
                    </div>
                  )}
                  {order.status === 'Hazırlanıyor' && (
                    <div className="qr-hint preparing">
                      <i className="fas fa-qrcode"></i>
                      <span>QR Kodu Görmek İçin Tıklayın</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product List Page (existing code with submit button update)
  if (showProductList) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-left">
            <img 
              src={logo} 
              alt="TalebEt" 
              className="header-logo" 
              onClick={onLogout}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="header-right">
            <span className="selected-market">{selectedMarket}</span>
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

        <div className="product-list-container">
          <button className="back-button" onClick={handleBackToRequests}>
            <i className="fas fa-arrow-left"></i>
            Geri Dön
          </button>
          
          <div className="product-list-content">
            <div className="products-section">
              <h2>Ürünler</h2>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">{product.price} ₺</p>
                    <button 
                      className="add-to-cart-button" 
                      onClick={() => addToCart(product)}
                    >
                      <i className="fas fa-plus"></i>
                      Sepete Ekle
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-section">
              <h2>Sepetim</h2>
              {cart.length === 0 ? (
                <p className="empty-cart">Sepetiniz boş</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <h4>{item.name}</h4>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="item-total">{(item.price * item.quantity)} ₺</p>
                        <button 
                          className="remove-item" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <h3>Toplam: {getTotalPrice()} ₺</h3>
                    <button className="submit-request-button" onClick={handleSubmitRequest}>
                      <i className="fas fa-check"></i>
                      Talebi Gönder
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <img 
            src={logo} 
            alt="TalebEt" 
            className="header-logo" 
            onClick={onLogout}
            style={{ cursor: 'pointer' }}
          />
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
          <div className="dashboard-buttons">
            <button className="new-request-button" onClick={handleNewRequest}>
              <i className="fas fa-shopping-cart"></i>
              Yeni Talep
            </button>
            <button className="existing-requests-button" onClick={handleShowActiveOrders}>
              <i className="fas fa-list-ul"></i>
              Mevcut Taleplerim
            </button>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>İstatistikler & Öneriler</h2>
          <div className="stats-and-offers">
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-info">
                  <h3>Bu Ay Harcanan</h3>
                  <p className="stat-value">1,250 ₺</p>
                  <span className="stat-change">+15% geçen aya göre</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="stat-info">
                  <h3>Favori Market</h3>
                  <p className="stat-value">Migros</p>
                  <span className="stat-change">8 sipariş</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className="stat-info">
                  <h3>Toplam Sipariş</h3>
                  <p className="stat-value">24</p>
                  <span className="stat-change">Bu ay: 6 sipariş</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="stat-info">
                  <h3>En Çok Alınan</h3>
                  <p className="stat-value">Ekmek</p>
                  <span className="stat-change">12 kez sipariş</span>
                </div>
              </div>
            </div>
            
            <div className="offers-section">
              <h3>Güncel Kampanyalar & Öneriler</h3>
              <div className="offers-grid">
                <div className="offer-card hot">
                  <div className="offer-badge">🔥 Sıcak Fırsat</div>
                  <h4>Migros'ta %25 İndirim</h4>
                  <p>Temel gıda ürünlerinde büyük fırsat! Ekmek, süt, yumurta...</p>
                  <div className="offer-validity">Bugün geçerli</div>
                </div>
                
                <div className="offer-card">
                  <div className="offer-badge">💡 Size Özel</div>
                  <h4>BIM'de Combo Paketi</h4>
                  <p>Sık aldığınız ürünlerde özel paket fiyatı</p>
                  <div className="offer-validity">3 gün kaldı</div>
                </div>
                
                <div className="offer-card">
                  <div className="offer-badge">⭐ Popüler</div>
                  <h4>A101'de Hafta Sonu</h4>
                  <p>Meyve & sebze kategorisinde %20 indirim</p>
                  <div className="offer-validity">Hafta sonu</div>
                </div>
                
                <div className="offer-card">
                  <div className="offer-badge">🎯 Öneri</div>
                  <h4>Şok Market Yeniliği</h4>
                  <p>Yeni açılan şubede ilk siparişe özel avantajlar</p>
                  <div className="offer-validity">Bu hafta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMarketSelection && (
        <div className="modal-overlay">
          <div className="modal-content market-selection-modal">
            <button 
              className="close-button" 
              onClick={() => setShowMarketSelection(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h3>Market Seçin</h3>
            <div className="markets-grid">
              {markets.map(market => (
                <button 
                  key={market}
                  className="market-button"
                  onClick={() => handleMarketSelect(market)}
                >
                  <i className="fas fa-store"></i>
                  {market}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showOrderSuccess && (
        <div className="modal-overlay">
          <div className="modal-content order-success-modal">
            <button 
              className="close-button" 
              onClick={handleCloseSuccess}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="success-content">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Siparişiniz Alınmıştır!</h3>
              <p>Siparişiniz başarıyla oluşturuldu. Mağaza tarafından hazırlanmaya başlanacak.</p>
              <div className="success-buttons">
                <button className="success-button primary" onClick={handleShowActiveOrders}>
                  <i className="fas fa-list"></i>
                  Aktif Siparişlerim
                </button>
                <button className="success-button secondary" onClick={handleCloseSuccess}>
                  <i className="fas fa-home"></i>
                  Ana Sayfa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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

  if (currentPage === '/hakkimizda') {
    return <About />;
  }

  if (currentPage === '/nasil-calisir') {
    return <HowItWorks />;
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
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/iletisim'); }}>İletişim</a>
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Giriş Yap</button>
        </nav>
      </header>

      <div className="landing-container">
        <div className="logo-section">
          <img src={logo} alt="TalebEt" className="main-logo" />
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

export default App;
