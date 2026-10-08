import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './FloatingCartButton.css';

export default function FloatingCartButton() {
  const { totalItems, subtotal, isCartOpen, openCart, lastAddedItem } = useCart();

  if (totalItems === 0 || isCartOpen) return null;

  return (
    <div className="floating-cart-wrapper">
      {lastAddedItem && (
        <div className="floating-cart-toast">
          <span>Added to order:</span>
          <strong>{lastAddedItem}</strong>
        </div>
      )}

      <button
        onClick={openCart}
        className="floating-cart-btn"
        aria-label={`Open spray order cart with ${totalItems} items`}
      >
        <div className="floating-cart-icon-box">
          <ShoppingBag size={18} />
          <span className="floating-cart-badge">{totalItems}</span>
        </div>

        <div className="floating-cart-info">
          <span className="floating-cart-title">Spray Tank Order</span>
          <span className="floating-cart-price">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="floating-cart-arrow">
          <ArrowRight size={16} />
        </div>
      </button>
    </div>
  );
}
