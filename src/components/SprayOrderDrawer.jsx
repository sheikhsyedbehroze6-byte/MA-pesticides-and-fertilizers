import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  MapPin, 
  Store, 
  Truck, 
  Tag, 
  Check, 
  ArrowRight,
  ExternalLink,
  Info,
  Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './SprayOrderDrawer.css';

const DISTRICTS = [
  'Srinagar',
  'Shopian',
  'Baramulla',
  'Sopore',
  'Pulwama',
  'Anantnag',
  'Budgam',
  'Kulgam',
  'Ganderbal',
  'Bandipora',
  'Kupwara'
];

export default function SprayOrderDrawer() {
  const {
    cartItems,
    totalItems,
    subtotal,
    mrpTotal,
    savings,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    farmerInfo,
    updateFarmerInfo,
    getWhatsAppUrl
  } = useCart();

  const [copied, setCopied] = useState(false);

  if (!isCartOpen) return null;

  const handleCopyMessage = () => {
    const url = getWhatsAppUrl();
    const text = decodeURIComponent(url.replace('https://wa.me/919906541321?text=', ''));
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="spray-order-backdrop" onClick={closeCart}>
      <div 
        className="spray-order-drawer" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your Spray Order Cart"
      >
        {/* Mobile Pull Handle Indicator */}
        <div className="spray-drawer-pull-bar" />

        {/* Official Printable Proforma Estimate Slip (Revealed only during window.print()) */}
        <div className="print-proforma-slip">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #1a432e', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1a432e', fontFamily: 'serif', letterSpacing: '0.5px' }}>
                M.A. PESTICIDES &amp; FERTILIZERS SRINAGAR
              </h2>
              <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '3px' }}>
                Authorized Agricultural Dealership • Bayer | Syngenta | IPL Biologicals
              </div>
              <div style={{ fontSize: '11px', color: '#4b5563' }}>
                Hari Singh High Street &amp; Tengpora Bypass, Srinagar, Kashmir &bull; Ph: +91 99065 41321
              </div>
              <div style={{ fontSize: '11.5px', color: '#111827', fontWeight: 600, marginTop: '4px' }}>
                Chief Technical Advisors: Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry) &amp; Sheikh Behroze Ayub
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#1a432e', color: '#ffffff', fontSize: '10.5px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Orchard Spray Order Estimate
              </span>
              <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '6px' }}>
                Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div style={{ fontSize: '11px', color: '#4b5563' }}>
                Estimate ID: MAP-EST-{new Date().getFullYear()}-{totalItems}
              </div>
            </div>
          </div>

          {/* Farmer & Orchard Details */}
          <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '16px', fontSize: '12px' }}>
            <div>
              <strong>Grower Name:</strong> {farmerInfo.name || 'Valued Kashmir Orchardist'}<br />
              <strong>District / Zone:</strong> {farmerInfo.district || 'Srinagar / Central Valley'}
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong>Fulfilment:</strong> {farmerInfo.deliveryMode === 'delivery' ? 'Express Orchard Delivery' : 'Direct Shop Pickup'}<br />
              <strong>Total Formulations:</strong> {totalItems} items
            </div>
          </div>

          {/* Itemized Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a432e', color: '#ffffff', textAlign: 'left' }}>
                <th style={{ padding: '8px 10px' }}>S.No</th>
                <th style={{ padding: '8px 10px' }}>Formulation / Active Chemistry</th>
                <th style={{ padding: '8px 10px', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '8px 10px', textAlign: 'right' }}>Print MRP</th>
                <th style={{ padding: '8px 10px', textAlign: 'right' }}>Farmer Privilege (-20%)</th>
                <th style={{ padding: '8px 10px', textAlign: 'right' }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => {
                const itemMrp = item.product.mrp || 850;
                const discounted = Math.round(itemMrp * 0.8);
                const lineTotal = discounted * item.quantity;
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 10px' }}>{idx + 1}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <strong>{item.product.name}</strong>
                      {item.product.composition && <span style={{ display: 'block', fontSize: '10.5px', color: '#6b7280' }}>{item.product.composition}</span>}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', textDecoration: 'line-through', color: '#9ca3af' }}>₹{itemMrp}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600, color: '#1a432e' }}>₹{discounted}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700 }}>₹{lineTotal.toLocaleString('en-IN')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pricing Summary */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
            <div style={{ width: '280px', fontSize: '12.5px', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
                <span>Print MRP Total:</span>
                <span style={{ textDecoration: 'line-through' }}>₹{mrpTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#047857', fontWeight: 600 }}>
                <span>Store Privilege Discount (20%):</span>
                <span>-₹{savings.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1a432e', paddingTop: '6px', marginTop: '6px', fontSize: '15px', fontWeight: 700, color: '#1a432e' }}>
                <span>Estimated Counter Total:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Guarantee & Signatures */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px dashed #9ca3af', paddingTop: '16px', fontSize: '11px', color: '#4b5563' }}>
            <div>
              <strong>Authenticity Guarantee:</strong> 100% Factory Sealed Batches.<br />
              All rates include exclusive 20% farmer privilege at M.A. Pesticides Srinagar.
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '32px' }} />
              <div style={{ borderTop: '1px solid #111827', width: '160px', paddingTop: '4px', fontWeight: 600, color: '#111827' }}>
                Authorized Chemist Stamp
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Header */}
        <div className="spray-drawer-header">
          <div className="spray-drawer-title-row">
            <div className="spray-drawer-badge-wrap">
              <ShoppingBag size={20} className="spray-drawer-title-icon" />
              <h2>Spray Tank Order</h2>
              <span className="spray-drawer-count-pill">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            </div>
            <button 
              className="spray-drawer-close-btn" 
              onClick={closeCart}
              aria-label="Close Order Drawer"
            >
              <X size={20} />
            </button>
          </div>
          <p className="spray-drawer-subtitle">
            Curate required formulations, verify dosage, and dispatch your order directly to senior chemists.
          </p>
        </div>

        {/* Drawer Body */}
        <div className="spray-drawer-body">
          {cartItems.length === 0 ? (
            <div className="spray-drawer-empty">
              <div className="spray-empty-icon-wrap">
                <ShoppingBag size={42} strokeWidth={1.5} />
              </div>
              <h3>Your Spray Cart is Empty</h3>
              <p>
                Browse our authorized pesticide inventory or calculate dosage from the Spray Calculator to build your seasonal order.
              </p>
              <button 
                onClick={closeCart}
                className="pill-button-filled"
                style={{ marginTop: '12px', gap: '8px' }}
              >
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="spray-items-section">
                <div className="spray-section-header">
                  <span>Selected Chemicals & Tonics</span>
                  <button 
                    onClick={clearCart} 
                    className="spray-clear-all-btn"
                    title="Clear entire cart"
                  >
                    Clear All
                  </button>
                </div>

                <div className="spray-items-list">
                  {cartItems.map((item) => (
                    <div key={item.itemKey} className="spray-item-card">
                      <div className="spray-item-thumb">
                        <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                      </div>

                      <div className="spray-item-details">
                        <div className="spray-item-top-row">
                          <h4 className="spray-item-name">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.itemKey)}
                            className="spray-item-remove-btn"
                            title="Remove chemical"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {item.composition && (
                          <div className="spray-item-composition">{item.composition}</div>
                        )}

                        {item.calculatedNote && (
                          <div className="spray-item-tank-badge">
                            🎯 {item.calculatedNote}
                          </div>
                        )}

                        <div className="spray-item-bottom-row">
                          <div className="spray-item-price-wrap">
                            <span className="spray-item-price">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <span className="spray-item-mrp">
                              ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <span className="spray-item-discount-tag">20% OFF</span>
                          </div>

                          {/* Stepper Controls */}
                          <div className="spray-item-stepper">
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="spray-stepper-btn"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="spray-stepper-qty">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="spray-stepper-btn"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farmer & Orchard Details Form */}
              <div className="spray-farmer-section">
                <div className="spray-section-header">
                  <span>Farmer & Delivery Info</span>
                  <span className="spray-badge-optional">Optional</span>
                </div>

                <div className="spray-field-group">
                  <label htmlFor="farmer-name-input">Orchardist / Buyer Name:</label>
                  <input
                    id="farmer-name-input"
                    type="text"
                    value={farmerInfo.name}
                    onChange={(e) => updateFarmerInfo('name', e.target.value)}
                    placeholder="e.g. Haji Ghulam Mohammad"
                    className="spray-input-text"
                  />
                </div>

                <div className="spray-field-group">
                  <label>Orchard Location / District:</label>
                  <div className="spray-district-pills">
                    {DISTRICTS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => updateFarmerInfo('district', d)}
                        className={`spray-district-pill ${farmerInfo.district === d ? 'active' : ''}`}
                      >
                        <MapPin size={12} />
                        <span>{d}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="spray-field-group">
                  <label>Order Fulfillment Preference:</label>
                  <div className="spray-delivery-toggle">
                    <button
                      type="button"
                      onClick={() => updateFarmerInfo('deliveryType', 'pickup')}
                      className={`spray-delivery-btn ${farmerInfo.deliveryType === 'pickup' ? 'active' : ''}`}
                    >
                      <Store size={15} />
                      <div style={{ textAlign: 'left' }}>
                        <strong>Shop Pickup</strong>
                        <small>Tengpora Bypass</small>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateFarmerInfo('deliveryType', 'delivery')}
                      className={`spray-delivery-btn ${farmerInfo.deliveryType === 'delivery' ? 'active' : ''}`}
                    >
                      <Truck size={15} />
                      <div style={{ textAlign: 'left' }}>
                        <strong>Valley Delivery</strong>
                        <small>Dispatch to Orchard/Bus</small>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="spray-field-group">
                  <label htmlFor="farmer-note-input">Special Instructions (Optional):</label>
                  <input
                    id="farmer-note-input"
                    type="text"
                    value={farmerInfo.note}
                    onChange={(e) => updateFarmerInfo('note', e.target.value)}
                    placeholder="e.g., Need delivery before Tuesday spray..."
                    className="spray-input-text"
                  />
                </div>
              </div>

              {/* Quality & Batch Authenticity Guarantee */}
              <div className="spray-guarantee-box">
                <ShieldCheck size={20} className="spray-guarantee-icon" />
                <div>
                  <strong>Official SKUAST-K Batch Guarantee</strong>
                  <p>
                    100% authentic barcode-verified formulations. 20% discount on print MRP applied automatically at store counter.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Pricing & WhatsApp Action */}
        {cartItems.length > 0 && (
          <div className="spray-drawer-footer">
            <div className="spray-summary-card">
              <div className="spray-summary-row">
                <span className="spray-summary-label">Print MRP Value:</span>
                <span className="spray-summary-val spray-mrp-strike">
                  ₹{mrpTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="spray-summary-row discount">
                <span className="spray-summary-label">
                  <Tag size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                  20% Store Farmer Discount:
                </span>
                <span className="spray-summary-val text-green">
                  -₹{savings.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="spray-summary-divider" />
              <div className="spray-summary-row total">
                <span className="spray-summary-label">Estimated Counter Total:</span>
                <span className="spray-summary-total-price">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Ordering Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="spray-whatsapp-submit-btn"
              title="Send Order on WhatsApp"
            >
              <div className="spray-wa-icon-pulse">
                <MessageSquare size={18} />
              </div>
              <span>Send Spray Order via WhatsApp</span>
              <ExternalLink size={16} />
            </a>

            <div className="spray-footer-sub-actions">
              <button 
                type="button" 
                onClick={handleCopyMessage}
                className="spray-sub-action-btn no-print"
              >
                {copied ? <Check size={14} color="#16a34a" /> : <Info size={14} />}
                <span>{copied ? 'Order Text Copied!' : 'Copy Order Text'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="spray-sub-action-btn no-print"
                title="Print or Save PDF Official Store Estimate Slip"
              >
                <Printer size={14} />
                <span>Print / PDF Slip</span>
              </button>

              <a 
                href="tel:+919906541321" 
                className="spray-sub-action-btn no-print"
              >
                <Phone size={14} />
                <span>Call Chemist (9906541321)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
