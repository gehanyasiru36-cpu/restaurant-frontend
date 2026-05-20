import { useState, useEffect } from "react";
import axios from 'axios';
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const IconPlus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconArrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const IconBack = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>;
const IconTruck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>;
const IconHomeNav = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconHeartNav = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconCartNav = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
const IconOrdersNav = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconMenu = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
const IconBell = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const IconPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4500" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;

const categories = [
  { id: "All", name: "All", emoji: "🍽️" },
  { id: "Burger", name: "Burger", emoji: "🍔" },
  { id: "Pizza", name: "Pizza", emoji: "🍕" },
  { id: "Drinks", name: "Drinks", emoji: "🥤" },
  { id: "Dessert", name: "Dessert", emoji: "🍰" },
];

function WelcomeScreen({ onNext }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      fontFamily: "'Segoe UI', sans-serif", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 24px 6px", color: "#fff", fontSize: 13, fontWeight: 500, zIndex: 10,
      }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><rect x="0" y="4" width="3" height="8" rx="1"/><rect x="4" y="2" width="3" height="10" rx="1"/><rect x="8" y="0" width="3" height="12" rx="1"/><rect x="12" y="0" width="3" height="12" rx="1" opacity="0.3"/></svg>
          <svg width="16" height="12" viewBox="0 0 20 14" fill="white"><path d="M10 3C13.5 3 16.6 4.5 18.8 6.9L20 5.5C17.4 2.7 13.9 1 10 1C6.1 1 2.6 2.7 0 5.5L1.2 6.9C3.4 4.5 6.5 3 10 3Z"/><path d="M10 7C12.2 7 14.2 7.9 15.7 9.4L17 8C15.1 6.1 12.7 5 10 5C7.3 5 4.9 6.1 3 8L4.3 9.4C5.8 7.9 7.8 7 10 7Z"/><circle cx="10" cy="13" r="1.5"/></svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="white"><rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1.5" fill="none"/><rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="white"/><rect x="22" y="4" width="2" height="4" rx="1"/></svg>
        </div>
      </div>
      <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(245,158,11,0.12)", top: 60, right: 30, filter: "blur(30px)" }} />
      <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(245,158,11,0.08)", top: 120, right: 10, filter: "blur(20px)" }} />
      <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", background: "rgba(245,158,11,0.07)", bottom: 200, left: 10, filter: "blur(25px)" }} />
      <div style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: "rgba(80,30,0,0.4)", top: 80, left: "50%", transform: "translateX(-50%)", filter: "blur(40px)" }} />
      <div style={{ textAlign: "center", marginTop: 16, zIndex: 5, position: "relative" }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ display: "block", margin: "0 auto 4px" }}>
          <circle cx="22" cy="20" r="10" stroke="#f59e0b" strokeWidth="1.8" fill="none"/>
          <rect x="13" y="17" width="18" height="3" rx="1.5" fill="#f59e0b"/>
          <rect x="15" y="21" width="14" height="3" rx="1.5" fill="#f59e0b"/>
          <ellipse cx="22" cy="30" rx="12" ry="3.5" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
          <line x1="22" y1="34" x2="22" y2="40" stroke="#f59e0b" strokeWidth="1.5"/>
        </svg>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: 4, color: "#fff", fontSize: 16, lineHeight: 1 }}>BURGER</div>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "#f59e0b", marginTop: 2 }}>— HOUSE —</div>
      </div>
      <div style={{ textAlign: "center", marginTop: 24, zIndex: 5, position: "relative", padding: "0 20px" }}>
        <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#f59e0b", fontSize: 15, letterSpacing: 1, marginBottom: 6 }}>✦ Welcome to</div>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, lineHeight: 0.88, marginBottom: 10 }}>
          <div style={{ fontSize: 72, color: "#fff", letterSpacing: 3, textShadow: "2px 2px 0px #333" }}>BURGER</div>
          <div style={{ fontSize: 72, color: "#f59e0b", letterSpacing: 3 }}>HOUSE</div>
        </div>
        <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
          Big Flavors. Real Ingredients.<br />Made to <span style={{ color: "#f59e0b", fontWeight: 700 }}>Satisfy.</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 5, marginTop: -10 }}>
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"
          alt="Burger"
          style={{
            width: 260, height: 220, objectFit: "cover", borderRadius: "50% 50% 0 0",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        />
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
        background: "#141414", margin: "0 16px", borderRadius: 16,
        padding: "14px 10px", zIndex: 5, position: "relative",
      }}>
        {[{ icon: "🍔", label: "Delicious\nBurgers" }, null, { icon: "🍟", label: "Crispy\nFries" }, null, { icon: "🥤", label: "Refreshing\nDrinks" }].map((item, i) =>
          item === null ? (
            <div key={i} style={{ background: "#2a2a2a", width: 1, margin: "4px 0" }} />
          ) : (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 9, letterSpacing: 1, color: "#888", textTransform: "uppercase", fontWeight: 600, lineHeight: 1.4, whiteSpace: "pre-line" }}>{item.label}</div>
            </div>
          )
        )}
      </div>
      <div style={{ padding: "16px 16px 0", zIndex: 5, position: "relative" }}>
        <button onClick={onNext} style={{
          width: "100%", background: "#f59e0b", border: "none", borderRadius: 16, padding: "17px",
          color: "#0a0a0a", fontFamily: "'Arial Black', sans-serif", fontWeight: 900,
          fontSize: 16, letterSpacing: 3, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          EXPLORE MENU
          <span style={{ width: 24, height: 24, border: "2px solid #0a0a0a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>→</span>
        </button>
      </div>
      <div style={{ textAlign: "center", fontSize: 10, letterSpacing: 3, color: "#333", textTransform: "uppercase", padding: "14px 0 20px", zIndex: 5, position: "relative" }}>
        — Fast. Fresh. Made for you. —
      </div>
    </div>
  );
}

function HomeScreen({ menuItems, addToCart, cartItems, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const cartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const filteredItems = activeCategory === "All" ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <div style={{
      width: "100%", height: "100%", background: "#0f0f0f", color: "white",
      display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif", overflow: "hidden",
    }}>

      {/* ===== TOP HERO SECTION — Image 2 style ===== */}
      <div style={{ position: "relative", flexShrink: 0 }}>

        {/* Background burger image with dark overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", borderRadius: "0 0 24px 24px" }}>
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"
            alt="bg"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.92) 100%)" }} />
        </div>

        {/* Amber glow blobs */}
        <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", background: "rgba(245,158,11,0.15)", top: 20, right: 20, filter: "blur(30px)", zIndex: 1 }} />
        <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(245,158,11,0.10)", bottom: 60, left: 10, filter: "blur(25px)", zIndex: 1 }} />

        {/* Nav bar */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 16px 8px" }}>
          <button onClick={() => alert("Sidebar open")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 8, color: "white", cursor: "pointer" }}>
            <IconMenu />
          </button>

          {/* Center Logo */}
          <div style={{ textAlign: "center" }}>
            <svg width="32" height="32" viewBox="0 0 44 44" fill="none" style={{ display: "block", margin: "0 auto 2px" }}>
              <circle cx="22" cy="20" r="10" stroke="#f59e0b" strokeWidth="1.8" fill="none"/>
              <rect x="13" y="17" width="18" height="3" rx="1.5" fill="#f59e0b"/>
              <rect x="15" y="21" width="14" height="3" rx="1.5" fill="#f59e0b"/>
              <ellipse cx="22" cy="30" rx="12" ry="3.5" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
              <line x1="22" y1="34" x2="22" y2="40" stroke="#f59e0b" strokeWidth="1.5"/>
            </svg>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: 3, color: "#fff", fontSize: 13, lineHeight: 1 }}>BURGER</div>
            <div style={{ fontSize: 8, letterSpacing: 4, color: "#f59e0b" }}>— HOUSE —</div>
          </div>

          <button onClick={() => alert("No notifications")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 8, color: "white", cursor: "pointer", position: "relative" }}>
            <IconBell />
            {/* notification dot */}
            <div style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, background: "#f59e0b", borderRadius: "50%", border: "1.5px solid #0f0f0f" }} />
          </button>
        </div>

        {/* Welcome + Burger image row */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "10px 20px 0" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#f59e0b", fontSize: 14, marginBottom: 2 }}>Welcome to</div>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, lineHeight: 0.88 }}>
              <div style={{ fontSize: 46, color: "#fff", letterSpacing: 2 }}>BURGER</div>
              <div style={{ fontSize: 46, color: "#f59e0b", letterSpacing: 2 }}>HOUSE</div>
            </div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 8, lineHeight: 1.5 }}>
              Big Flavors. Real Ingredients.<br />Made to <span style={{ color: "#f59e0b", fontWeight: 700 }}>Satisfy.</span>
            </div>
          </div>

          {/* Burger photo right side */}
          <div style={{ width: 160, height: 150, flexShrink: 0, marginRight: -10, position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
              alt="Burger"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                borderRadius: "50% 50% 0 0",
                maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Categories bar — amber highlight on active */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", gap: 8, padding: "16px 16px 20px", overflowX: "auto" }}>
          {categories.map((cat) => (
            <div key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", minWidth: 60 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: cat.id === activeCategory ? "#f59e0b" : "rgba(255,255,255,0.07)",
                border: cat.id === activeCategory ? "none" : "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
                transition: "all 0.2s",
              }}>{cat.emoji}</div>
              <span style={{ fontSize: 11, color: cat.id === activeCategory ? "#f59e0b" : "#888", whiteSpace: "nowrap", fontWeight: cat.id === activeCategory ? 700 : 400 }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FOOD GRID ===== */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 100px", background: "#0f0f0f" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingTop: 4 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>
            {activeCategory === "All" ? "Our Delicious Menu" : activeCategory}
          </span>
          <IconArrow />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} style={{ background: "#1a1a1a", borderRadius: 16, overflow: "hidden", position: "relative", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
                <img src={item.image} alt={item.name} style={{ width: "100%", height: 110, objectFit: "cover" }} />
                <button onClick={() => addToCart(item.id)} style={{ position: "absolute", top: 8, right: 8, background: "#f59e0b", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}>
                  <IconPlus />
                </button>
                {cartItems[item.id] && (
                  <div style={{ position: "absolute", top: 8, left: 8, background: "#f59e0b", color: "#0a0a0a", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                    {cartItems[item.id]}
                  </div>
                )}
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  <div style={{ color: "#f59e0b", fontWeight: 700, marginTop: 4, fontSize: 13 }}>LKR {item.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "#666", fontSize: 14, padding: "40px 0", gridColumn: "1 / -1", textAlign: "center" }}>
              {menuItems.length === 0 ? "Loading delicious foods... 🍽️" : `No ${activeCategory} items yet`}
            </div>
          )}
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} cartCount={cartCount} />
    </div>
  );
}

function CartScreen({ cartItems, menuItems, onNavigate, onPlaceOrder }) {
  const cartDetails = Object.keys(cartItems).map(id => {
    const item = menuItems.find(m => m.id.toString() === id.toString());
    return item ? { ...item, qty: cartItems[id] } : null;
  }).filter(Boolean);
  const total = cartDetails.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);
  return (
    <div style={{ width: "100%", height: "100%", background: "#111", color: "white", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ padding: "48px 16px 16px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid #222" }}>
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><IconBack /></button>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>My Cart</h2>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {cartDetails.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666", marginTop: 40 }}>Your cart is empty</div>
        ) : (
          cartDetails.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 12, background: "#1a1a1a", padding: 12, borderRadius: 14, marginBottom: 12, alignItems: "center" }}>
              <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</div>
                <div style={{ color: "#f59e0b", fontWeight: 700, marginTop: 4, fontSize: 14 }}>LKR {item.price}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", background: "#222", borderRadius: 8, padding: "6px 10px" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>x{item.qty}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {cartDetails.length > 0 && (
        <div style={{ padding: "20px 16px 100px", background: "#1a1a1a", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: "#aaa", fontSize: 14 }}>
            <span>Total Amount</span>
            <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>LKR {total.toFixed(2)}</span>
          </div>
          <button onClick={onPlaceOrder} style={{ width: "100%", background: "#f59e0b", color: "#0a0a0a", border: "none", padding: "16px", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Place Order</button>
        </div>
      )}
      <BottomNav active="cart" onNavigate={onNavigate} cartCount={0} />
    </div>
  );
}

function OrdersScreen({ orders, onNavigate }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#111", color: "white", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ padding: "48px 16px 16px", borderBottom: "1px solid #222" }}><h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Track Orders</h2></div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666", marginTop: 40 }}>No orders placed yet</div>
        ) : (
          orders.map((order, idx) => (
            <div key={order._id || idx} style={{ background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "#999" }}>Order #{String(order._id || idx).substring(0, 8)}</span>
                <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600, textTransform: "uppercase" }}>{order.status}</span>
              </div>
              {order.items && order.items.map((item, i) => (
                <div key={i} style={{ fontSize: 13, color: "#ccc", marginBottom: 4 }}>{item.name} x{item.qty}</div>
              ))}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                <IconTruck />
                <span style={{ fontSize: 14, color: "#f59e0b", fontWeight: 700 }}>Total: LKR {order.total}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav active="orders" onNavigate={onNavigate} cartCount={0} />
    </div>
  );
}

function BottomNav({ active, onNavigate, cartCount }) {
  const navs = [
    { id: "home", label: "Home", icon: <IconHomeNav /> },
    { id: "favorites", label: "Favorites", icon: <IconHeartNav /> },
    { id: "cart", label: "Cart", icon: <IconCartNav /> },
    { id: "orders", label: "Orders", icon: <IconOrdersNav /> },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 72, background: "rgba(15,15,15,0.97)", backdropFilter: "blur(10px)", display: "flex", borderTop: "1px solid rgba(255,255,255,0.05)", paddingBottom: 12 }}>
      {navs.map(n => (
        <div key={n.id} onClick={() => onNavigate(n.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", color: active === n.id ? "#f59e0b" : "#555", position: "relative" }}>
          {n.id === "cart" && cartCount > 0 && (
            <div style={{ position: "absolute", top: 0, right: "18px", background: "#f59e0b", color: "#0a0a0a", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>
              {cartCount}
            </div>
          )}
          {n.icon}
          <span style={{ fontSize: 10, fontWeight: 500 }}>{n.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("welcome");
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then((res) => {
        let dataArray = [];
        if (Array.isArray(res.data)) dataArray = res.data;
        else if (res.data && Array.isArray(res.data.foods)) dataArray = res.data.foods;
        else if (res.data && Array.isArray(res.data.data)) dataArray = res.data.data;
        const mappedFoods = dataArray.map((item, index) => ({
          id: item._id || item.id || `fallback-id-${index}`,
          name: item.name ? String(item.name) : "Unnamed Food",
          price: item.price ? Number(item.price) : 0,
          category: item.category || "Other",
          image: item.image || "https://placehold.co/150x150/e2e8f0/64748b?text=Food"
        }));
        setMenuItems(mappedFoods);
      })
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  useEffect(() => {
    socket.on("statusUpdated", (data) => {
      setOrders(prev => prev.map(o => o._id === data.orderId ? { ...o, status: data.status } : o));
    });
    return () => socket.off("statusUpdated");
  }, []);

  const addToCart = (id) => {
    setCartItems(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handlePlaceOrder = async () => {
    const cartDetails = Object.keys(cartItems).map(id => {
      const item = menuItems.find(m => m.id.toString() === id.toString());
      return item ? { name: item.name, price: item.price, qty: cartItems[id] } : null;
    }).filter(Boolean);
    if (cartDetails.length === 0) return;
    const total = cartDetails.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderPayload = { table_number: "1", customer_name: "Customer", items: cartDetails, total: total.toFixed(2) };
    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderPayload);
      if (response.data) {
        setOrders(prev => [response.data, ...prev]);
        setCartItems({});
        setScreen("orders");
      }
    } catch (error) {
      console.error("Order place error:", error);
      alert("Order place කරන්න බැරි වුණා!");
    }
  };

  return (
    <div style={{
      width: 390, height: 844, background: "#111", color: "white", position: "relative",
      display: "flex", flexDirection: "column", margin: "20px auto", padding: 0,
      border: "1px solid #333", borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    }}>
      {screen === "welcome" && <WelcomeScreen onNext={() => setScreen("home")} />}
      {screen === "home" && <HomeScreen menuItems={menuItems} addToCart={addToCart} cartItems={cartItems} onNavigate={(target) => setScreen(target)} />}
      {screen === "cart" && <CartScreen cartItems={cartItems} menuItems={menuItems} onNavigate={(target) => setScreen(target)} onPlaceOrder={handlePlaceOrder} />}
      {screen === "orders" && <OrdersScreen orders={orders} onNavigate={(target) => setScreen(target)} />}
    </div>
  );
}
