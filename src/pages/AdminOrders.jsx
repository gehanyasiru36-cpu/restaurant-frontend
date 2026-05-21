import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { CheckCircle, XCircle, Trash2, PlusCircle, Save } from 'lucide-react';

const socket = io("https://restaurant-backend-production-585d.up.railway.app");

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ table_number: '', items: [{ name: '', qty: 1 }], total: 0 });

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('https://restaurant-backend-production-585d.up.railway.app/api/orders/all');
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) { console.error("Error:", error); }
  };

  useEffect(() => {
    fetchAllOrders();
    socket.on('newOrder', (newOrder) => setOrders((prev) => [newOrder, ...prev]));
    socket.on('statusUpdated', ({ orderId, status }) => {
      setOrders((prev) => prev.map(o => (o._id === orderId ? { ...o, status } : o)));
    });
    return () => { socket.off('newOrder'); socket.off('statusUpdated'); };
  }, []);

  // 1. DELETE ORDER
  const deleteOrder = async (id) => {
    if (window.confirm("මේ ඕඩර් එක සදහටම මැකීමට අවශ්‍යද?")) {
      try {
        await axios.delete(`https://restaurant-backend-production-585d.up.railway.app/api/orders/${id}`);
        setOrders(orders.filter(order => order._id !== id));
      } catch (error) { alert("Delete කිරීමට නොහැකි විය."); }
    }
  };

  // 2. ADD NEW ORDER
  const handleSaveOrder = async () => {
    try {
      const res = await axios.post('https://restaurant-backend-production-585d.up.railway.app/api/orders', newOrder);
      setOrders([res.data, ...orders]);
      setIsModalOpen(false);
      setNewOrder({ table_number: '', items: [{ name: '', qty: 1 }], total: 0 });
    } catch (error) { alert("ඕඩර් එක ඇඩ් කිරීමට නොහැකි විය."); }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`https://restaurant-backend-production-585d.up.railway.app/api/orders/${id}`, { status: newStatus });
      setOrders(orders.map(o => (o._id === id ? { ...o, status: newStatus } : o)));
    } catch (error) { console.error("Update error:", error); }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px' }}>Orders Management</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 20px', background: '#FF4500', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} /> අලුත් ඕඩර් එකක්
        </button>
      </div>

      {/* ADD MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '400px' }}>
            <h3>අලුත් ඕඩර් එකක් ඇතුළත් කරන්න</h3>
            <input placeholder="Table Number" onChange={(e) => setNewOrder({...newOrder, table_number: e.target.value})} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
            <input placeholder="Item Name" onChange={(e) => setNewOrder({...newOrder, items: [{name: e.target.value, qty: 1}]})} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleSaveOrder} style={{ background: 'green', color: 'white', border: 'none', padding: '10px', flex: 1 }}>ඇඩ් කරන්න</button>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'gray', color: 'white', border: 'none', padding: '10px', flex: 1 }}>කැන්සල්</button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#7d8597' }}>
              <th style={{ padding: '14px' }}>Table</th>
              <th style={{ padding: '14px' }}>Status</th>
              <th style={{ padding: '14px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px' }}>Table {order.table_number}</td>
                <td style={{ padding: '14px' }}>{order.status}</td>
                <td style={{ padding: '14px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => updateOrderStatus(order._id, 'Completed')} style={{ background: '#e6f4ea', border: 'none', padding: '6px', cursor: 'pointer' }}><CheckCircle size={16} color="green" /></button>
                  <button onClick={() => deleteOrder(order._id)} style={{ background: '#fce8e6', border: 'none', padding: '6px', cursor: 'pointer' }}><Trash2 size={16} color="red" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
