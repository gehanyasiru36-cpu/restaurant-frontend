import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { DollarSign, ShoppingBag, Utensils, Users, ShoppingCart } from 'lucide-react';

const revenueData = [
  { name: 'Mon', revenue: 120 },
  { name: 'Tue', revenue: 150 },
  { name: 'Wed', revenue: 180 },
  { name: 'Thu', revenue: 220 },
  { name: 'Fri', revenue: 260 },
  { name: 'Sat', revenue: 340 },
  { name: 'Sun', revenue: 425 },
];

const recentOrders = [
  { table: 'Table 1', status: 'Completed', time: '2 mins ago', amount: '$25.50' },
  { table: 'Table 1', status: 'Completed', time: '15 mins ago', amount: '$18.00' },
  { table: 'Table 1', status: 'Preparing', time: '20 mins ago', amount: '$12.00' },
  { table: 'Table 1', status: 'Completed', time: '35 mins ago', amount: '$22.50' },
  { table: 'Table 1', status: 'Preparing', time: '45 mins ago', amount: '$15.00' },
];

const topItems = [
  { name: 'Crispy Chicken Burger', orders: 32 },
  { name: 'Cheese Burger', orders: 28 },
  { name: 'French Fries', orders: 22 },
  { name: 'Lemonade', orders: 18 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
        ${payload[0].value}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const statCards = [
    { label: 'Total Revenue', value: '$425.90', change: '12.5% from yesterday', icon: <DollarSign size={22} />, iconBg: '#fff0e6', iconColor: '#f59e0b', positive: true },
    { label: 'Total Orders', value: '32', change: '8.1% from yesterday', icon: <ShoppingBag size={22} />, iconBg: '#e6f4ea', iconColor: '#22c55e', positive: true },
    { label: 'Total Menus', value: '18', change: 'No change', icon: <Utensils size={22} />, iconBg: '#ede9fe', iconColor: '#8b5cf6', positive: null },
    { label: 'Customers', value: '95', change: '11.3% from yesterday', icon: <Users size={22} />, iconBg: '#fce8e6', iconColor: '#ef4444', positive: true },
    { label: "Today's Orders", value: '12', change: 'In progress', icon: <ShoppingCart size={22} />, iconBg: '#e0f2fe', iconColor: '#0ea5e9', positive: null },
  ];

  return (
    <div style={{ padding: '28px 32px', background: '#f4f4f4', minHeight: '100vh' }}>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {statCards.map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: card.iconBg, color: card.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: 11, marginTop: 4, color: card.positive === true ? '#22c55e' : card.positive === false ? '#ef4444' : '#0ea5e9', fontWeight: 600 }}>
                {card.positive === true ? '↑ ' : ''}{card.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Recent Orders row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a' }}>Weekly Revenue Overview</div>
            <div style={{ fontSize: 12, color: '#888', background: '#f4f4f4', padding: '6px 12px', borderRadius: 8, fontWeight: 600 }}>This Week ▾</div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis dataKey="name" stroke="#bbb" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#bbb" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fill="url(#amberGrad)" dot={{ fill: '#f59e0b', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#f59e0b' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a' }}>Recent Orders</div>
            <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, cursor: 'pointer' }}>View All</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentOrders.map((order, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: i < recentOrders.length - 1 ? '1px solid #f4f4f4' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{order.table}</div>
                  <div style={{ fontSize: 12, color: '#bbb', marginTop: 2 }}>{order.time}</div>
                </div>
                <span style={{
                  padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  background: order.status === 'Completed' ? '#e6f4ea' : '#fff7e0',
                  color: order.status === 'Completed' ? '#22c55e' : '#f59e0b',
                }}>
                  {order.status}
                </span>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{order.amount}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 700, cursor: 'pointer' }}>View All Orders →</span>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a' }}>Top Selling Items</div>
          <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, cursor: 'pointer' }}>View All</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {topItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? '#f59e0b' : '#f4f4f4', color: i === 0 ? '#1a1a1a' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{item.name}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#f59e0b' }}>{item.orders} Orders</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
