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

  return (
    <div style={{ backgroundColor: "#1e252b", minHeight: "100vh", color: "#ffffff", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#2c353f", padding: "15px 25px", borderRadius: "12px", marginBottom: "25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h2 style={{ margin: 0, color: "#2ecc71" }}>🍳 Kitchen Live Monitor - Active Tickets</h2>
          <span style={{ backgroundColor: "#2ecc71", padding: "4px 12px", borderRadius: "20px", fontWeight: "bold" }}>{orders.length} Tickets</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 80, color: "#555", fontSize: 18 }}>
          No active orders yet...
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {orders.map((order, index) => (
            <div key={order._id || index} style={{ backgroundColor: "#ffffff", color: "#2d3436", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
              <div style={{ backgroundColor: "#2ecc71", color: "#ffffff", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: "0", fontSize: "18px" }}>Table {order.table_number || "05"}</h4>
                <span style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: "rgba(0,0,0,0.15)", padding: "4px 8px", borderRadius: "4px" }}>
                  {order.customer_name || "Guest User"}
                </span>
              </div>

              <div style={{ padding: "16px", flexGrow: 1 }}>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {order.items && order.items.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", padding: "8px 0", borderBottom: "1px solid #f1f2f6", fontWeight: "bold", fontSize: "16px" }}>
                      <span style={{ color: "#2ecc71", marginRight: "12px", backgroundColor: "#e8f8f0", padding: "2px 8px", borderRadius: "4px" }}>
                        {item.qty || item.quantity || 1}
                      </span>
                      <span>{item.name || item.food_name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: "12px 16px", backgroundColor: "#f8f9fa" }}>
                <button onClick={() => handleCompleteOrder(order._id)} style={{ width: "100%", backgroundColor: "#e74c3c", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  Done / Cooked ✅
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KitchenView;
