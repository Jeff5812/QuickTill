import { useState } from 'react';

function App() {
  const products = [
    { id: 1, name: 'Coffee', price: 1500, emoji: '☕' },
    { id: 2, name: 'Sandwich', price: 3500, emoji: '🥪' },
    { id: 3, name: 'Orange Juice', price: 2000, emoji: '🧃' },
    { id: 4, name: 'Donut', price: 1200, emoji: '🍩' },
    { id: 5, name: 'Meat Pie', price: 1800, emoji: '🥧' },
    { id: 6, name: 'Bottled Water', price: 700, emoji: '💧' },
  ];

  const [cart, setCart] = useState([]);
  const [checkoutResult, setCheckoutResult] = useState(null);

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

const checkout = async () => {
  if (cart.length === 0) return;

  try {
    const response = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Checkout failed.");
    }

    setCheckoutResult(data);
setCart([]);
  } catch (error) {
    alert(error.message || "Could not connect to the server.");
  }
};


  const formatPrice = (price) =>
    `₦${price.toLocaleString('en-NG')}`;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
  <div style={styles.brandMark}>QT</div>

  <div style={styles.brandCenter}>
    <h1 style={styles.logo}>QuickTill<span>.</span></h1>
    <p style={styles.tagline}>Simple sales. Smarter checkout.</p>
  </div>

  <div style={styles.headerSpacer}></div>
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
            onClick={checkout}
          >
            Proceed to checkout
          </button>
        </section>
      </main>

{checkoutResult && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <div style={styles.successIcon}>✓</div>

      <h2>Order successful!</h2>
      <p style={styles.modalSubtitle}>
        Your checkout is complete. Thanks for shopping with QuickTill!
      </p>

      <div style={styles.orderDetails}>
        <p>Order ID</p>
        <strong>{checkoutResult.orderId}</strong>

        <p>Total paid</p>
        <strong style={styles.modalTotal}>
          ₦{checkoutResult.total.toLocaleString("en-NG")}
        </strong>
      </div>

      <button
        style={styles.modalButton}
        onClick={() => setCheckoutResult(null)}
      >
        Done
      </button>
    </div>
  </div>
)}


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
  padding: '22px 7%',
  display: 'flex',
  alignItems: 'center',
  minHeight: '110px',
},
brandMark: {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: '#2563eb',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  flexShrink: 0,
},
brandCenter: {
  flex: 1,
  textAlign: 'center',
},
logo: {
  margin: 0,
  fontSize: '30px',
  color: '#ffffff',
  letterSpacing: '-1px',
},
tagline: {
  margin: '8px 0 0',
  color: '#dbeafe',
  fontSize: '16px',
},
headerSpacer: {
  width: '48px',
  flexShrink: 0,
},

  main: {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '36px',
  padding: '60px 7%',
  alignItems: 'start',
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

modalOverlay: {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.65)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  zIndex: 1000,
},
modal: {
  background: 'white',
  borderRadius: '20px',
  padding: '35px',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
},
successIcon: {
  width: '65px',
  height: '65px',
  borderRadius: '50%',
  background: '#dcfce7',
  color: '#16a34a',
  fontSize: '38px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 18px',
  fontWeight: 'bold',
},
modalSubtitle: {
  color: '#718096',
  lineHeight: 1.6,
},
orderDetails: {
  background: '#f4f6fa',
  borderRadius: '12px',
  padding: '18px',
  margin: '25px 0',
  textAlign: 'left',
},
modalTotal: {
  fontSize: '23px',
  color: '#16a34a',
},
modalButton: {
  width: '100%',
  padding: '14px',
  border: 'none',
  borderRadius: '9px',
  background: '#172554',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
},
};

export default App;
