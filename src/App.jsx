import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components සහ Pages Import කිරීම
import Home from "./pages/Home";
import KitchenView from "./KitchenView";
import AdminPanel from "./pages/AdminPanel"; // 👈 1. මෙන්න ඇඩ්මින් පැනල් එක ඉම්පෝට් කරා මචන්!

// ==========================================
// 🌐 ROOT ROUTING ENGINE (App Component)
// ==========================================
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 📱 Customer App Interface */}
        <Route path="/" element={<Home />} />
        
        {/* 🍳 Live Kitchen Monitor Panel */}
        <Route path="/kitchen" element={<KitchenView />} />

        {/* 🔐 2. Admin Panel Interface (වෙනම ටැබ් එකක ඇරෙන කොටස) */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
