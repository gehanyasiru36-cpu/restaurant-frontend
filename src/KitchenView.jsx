import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function KitchenView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    socket.on("newOrder", (newOrder) => {
      console.log("🎯 Live Order received via Socket!", newOrder);
      setOrders((prevOrders) => {
        const exists = prevOrders.some(order => order._id === newOrder._id);
        if (exists) return prevOrders;
        return [newOrder, ...prevOrders];
      });
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      const activeOrders = response.data.filter(order => order.status === "Preparing" || order.status === "Pending");
      setOrders(activeOrders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: "Completed" });
      socket.emit("updateStatus", { orderId, status: "Completed" });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error completing order:", error);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    }
  };

  const getTimeAgo = (id) => {
    return "Just now";
  };

  return (
    <div style={{
      backgroundColor: "#0f1117",
      minHeight: "100vh",
      color: "#ffffff",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "24px",
    }}>
      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #1a1f2e, #1e2538)",
        border: "1px solid #2a2f45",
        borderRadius: "16px",
        padding: "20px 28px",
        marginBottom: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(255,140,0,0.15)",
            border: "1px solid rgba(255,140,0,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
          }}>🍳</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Kitchen Live Monitor</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Track and manage kitchen orders in real-time</div>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: 50, padding: "8px 18px",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 14 }}>
            {orders.length} Active {orders.length === 1 ? "Ticket" : "Tickets"}
          </span>
        </div>
      </div>

      {/* ── Content Grid ── */}
      {orders.length === 0 ? (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          marginTop: 80, color: "#374151", gap: 16,
        }}>
          <div style={{ fontSize: 60 }}>🍽️</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#4b5563" }}>No active orders yet...</div>
          <div style={{ fontSize: 14, color: "#6b7280" }}>New orders will appear here</div>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}>
          {orders.map((order, index) => (
            <div key={order._id || index} style={{
              background: "#1a1f2e",
              border: "1px solid #2a2f45",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}>
              {/* Card Header */}
              <div style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🪑</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "white" }}>
                    Table {order.table_number || "1"}
                  </span>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 50, padding: "5px 12px",
                }}>
                  <span style={{ fontSize: 13 }}>👤</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>
                    {order.customer_name || "Customer"}
                  </span>
                </div>
              </div>

              {/* Time & Order ID */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 20px",
                borderBottom: "1px solid #2a2f45",
                color: "#6b7280", fontSize: 13,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span>🕐</span>
                  <span>{getTimeAgo(order._id)}</span>
                </div>
                <div style={{ color: "#22c55e", fontWeight: 600 }}>
                  Order ID: <span style={{ color: "#4ade80" }}>#{String(order._id || "").slice(-4).toUpperCase()}</span>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ padding: "16px 20px", flexGrow: 1 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "#6b7280",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: 12,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  ORDER ITEMS
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #22c55e, transparent)" }} />
                </div>
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 0",
                    borderBottom: idx < order.items.length - 1 ? "1px solid #2a2f45" : "none",
                  }}>
                    <div style={{
                      minWidth: 32, height: 32, borderRadius: 8,
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 14, color: "#22c55e",
                    }}>
                      {item.qty || item.quantity || 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>
                        {item.name || item.food_name}
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4,
                      background: "rgba(34,197,94,0.1)",
                      borderRadius: 50, padding: "3px 10px",
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>In Progress</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Notes */}
              <div style={{
                padding: "12px 20px",
                borderTop: "1px solid #2a2f45",
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "#6b7280",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: 8,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  SPECIAL NOTES
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #f59e0b, transparent)" }} />
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", fontStyle: "italic" }}>
                  — No special notes
                </div>
              </div>

              {/* Done Button */}
              <div style={{ padding: "16px 20px" }}>
                <button
                  onClick={() => handleCompleteOrder(order._id)}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
                    transition: "opacity 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
                  onMouseOut={e => e.currentTarget.style.opacity = "1"}
                >
                  <span>✅</span> Done / Cooked
                </button>
              </div>
            </div>
          ))}

          {/* Empty Slot Placeholder */}
          {orders.length % 2 !== 0 && orders.length > 0 && (
            <div style={{
              background: "#1a1f2e",
              border: "2px dashed #2a2f45",
              borderRadius: "16px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              minHeight: 300, gap: 12, color: "#374151",
            }}>
              <div style={{ fontSize: 40 }}>🍽️</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#4b5563" }}>No other active tickets</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>New orders will appear here</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default KitchenView;
