export default function CartPanel({ items = [], onClose, onCheckout, onExport }) {
  const total = items.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity ?? 1)), 0);
  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <div>Cart</div>
        <button className="icon" onClick={onClose} aria-label="Close cart">✕</button>
      </div>
      <div className="cart-content">
        {items.length === 0 && <div>Your cart is empty.</div>}
        {items.map((it) => (
          <div key={it.cartId || it.id} className="cart-item">
            <div className="cart-item-name">{it.title || it.name}</div>
            <div className="cart-item-meta">x{it.quantity ?? 1}</div>
            <div className="cart-item-price">${Number(it.price ?? 0).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div>Total</div>
        <div>${total.toFixed(2)}</div>
      </div>
      <div className="container" style={{ display: 'flex', gap: 8, padding: 12 }}>
        <button className="primary" onClick={onCheckout} disabled={items.length === 0}>Checkout</button>
        <button onClick={onExport} disabled={items.length === 0}>Export JSON</button>
      </div>
    </aside>
  );
}


