import { useState } from 'react';

function App() {
  const products = [
    { id: 1, name: 'Coffee', price: 1500, emoji: '☕' },
    { id: 2, name: 'Sandwich', price: 3500, emoji: '🥪' },
    { id: 3, name: 'Orange Juice', price: 2000, emoji: '🧃' },
    { id: 4, name: 'Donut', price: 1200, emoji: '🍩' },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₦${price.toLocaleString('en-NG')}`;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>QuickTill<span>.</span></h1>
        <p>Simple sales. Smarter checkout.</p>
      </header>

      <main style={styles.main}>
        <section style={styles.productsSection}>
          <h2>Products</h2>
          <p style={styles.subtitle}>Select products to add to your order.</p>

          <div style={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.emoji}>{product.emoji}</div>
                <h3>{product.name}</h3>
                <p style={styles.price}>{formatPrice(product.price)}</p>
                <button
                  style={styles.addButton}
                  onClick={() => addToCart(product)}
                >
                  Add to order
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.cartSection}>
          <h2>Current Order</h2>
          <p style={styles.subtitle}>Your shopping basket</p>

          {cart.length === 0 ? (
            <p style={styles.empty}>Your order is empty. Add a product to begin.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <span>{item.emoji} {item.name} × {item.quantity}</span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))
          )}

          <div style={styles.total}>
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button
            style={styles.checkoutButton}
            disabled={cart.length === 0}
            onClick={() => alert('Checkout demo coming soon!')}
          >
            Proceed to checkout
          </button>
        </section>
      </main>

      <footer style={styles.footer}>
        QuickTill © 2026 · Demo Point of Sale Application
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f6fa',
    color: '#202938',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    background: '#172554',
    color: 'white',
    padding: '24px 7%',
  },
  logo: { margin: 0, fontSize: '28px' },
  main: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
    padding: '40px 7%',
  },
  productsSection: { minWidth: 0 },
  subtitle: { color: '#718096', marginTop: '5px' },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '18px',
    marginTop: '25px',
  },
  productCard: {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
  },
  emoji: { fontSize: '38px' },
  price: { fontWeight: 'bold', color: '#2563eb' },
  addButton: {
    width: '100%',
    padding: '11px',
    border: 'none',
    borderRadius: '7px',
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
  },
  cartSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    alignSelf: 'start',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
  },
  empty: { color: '#718096', padding: '25px 0' },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '22px 0',
    fontSize: '19px',
  },
  checkoutButton: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '7px',
    background: '#16a34a',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    padding: '25px',
    color: '#718096',
  },
};

export default App;
