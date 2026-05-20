import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Image, DollarSign, Tag, Utensils, Upload } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';
const FALLBACK_IMAGE = 'https://placehold.co/150x150/e2e8f0/64748b?text=Food';

const AdminMenu = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);

    const fetchFoods = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/foods`);
            if (Array.isArray(response.data)) setFoods(response.data);
            else if (response.data && Array.isArray(response.data.foods)) setFoods(response.data.foods);
            else if (response.data && Array.isArray(response.data.data)) setFoods(response.data.data);
            else setFoods([]);
        } catch (error) {
            console.error("❌ Fetch error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFoods(); }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImagePreview(reader.result);
    };

    const getFoodId = (food) => food._id || food.id || null;

    const handleAddFood = async () => {
        if (!name.trim()) { alert('Food Name danna!'); return; }
        if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) { alert('Valid price danna!'); return; }
        if (!category) { alert('Category select karanna!'); return; }
        setAddLoading(true);
        try {
            const payload = { name: name.trim(), price: parseFloat(price), category, image: imagePreview || FALLBACK_IMAGE };
            const res = await axios.post(`${API_BASE_URL}/api/foods`, payload, { headers: { 'Content-Type': 'application/json' } });
            setFoods((prev) => [...prev, res.data]);
            alert('Kema item add kara! ✅');
            setName(''); setPrice(''); setCategory(''); setImagePreview('');
            const input = document.getElementById('foodImageInput');
            if (input) input.value = '';
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setAddLoading(false);
        }
    };

    const handleDeleteFood = async (id) => {
        if (!id) return;
        if (!window.confirm("Me kema eka delete karannada?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/foods/${id}`);
            setFoods((prev) => prev.filter(food => getFoodId(food) !== id));
            alert('Delete kara! ✅');
        } catch (error) {
            alert(`Delete Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const inputStyle = {
        width: '100%', padding: '11px 14px',
        border: '1.5px solid #efefef', borderRadius: '10px',
        fontSize: '14px', fontWeight: '600', color: '#1a1a1a',
        boxSizing: 'border-box', outline: 'none', background: '#fafafa',
    };

    const labelStyle = {
        display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '11px', fontWeight: '700', color: '#555',
        textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px',
    };

    return (
        <div style={{ padding: '28px 32px', background: '#f4f4f4', minHeight: '100vh' }}>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                {/* Add Item Form */}
                <div style={{ width: '380px', background: '#fff', borderRadius: '18px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                    <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 22px 0', display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '14px', borderBottom: '1px solid #f4f4f4' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fff0e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PlusCircle size={16} style={{ color: '#f59e0b' }} />
                        </div>
                        Add New Item
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={labelStyle}><Tag size={12} style={{ color: '#f59e0b' }} /> Food Name <span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="e.g. Crispy Chicken Burger" />
                        </div>

                        <div>
                            <label style={labelStyle}><DollarSign size={12} style={{ color: '#f59e0b' }} /> Price (LKR) <span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="number" step="0.01" min="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} placeholder="e.g. 850" />
                        </div>

                        <div>
                            <label style={labelStyle}><Utensils size={12} style={{ color: '#f59e0b' }} /> Category <span style={{ color: '#ef4444' }}>*</span></label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select Category</option>
                                <option value="Burger">Burger</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}><Image size={12} style={{ color: '#f59e0b' }} /> Food Image (Preview Only)</label>
                            <label htmlFor="foodImageInput" style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                border: '2px dashed #efefef', borderRadius: '12px', padding: '20px',
                                background: '#fafafa', minHeight: '120px', boxSizing: 'border-box', cursor: 'pointer',
                                transition: 'border-color 0.2s',
                            }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#efefef'}
                            >
                                <input id="foodImageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px' }} />
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff0e6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                                            <Upload size={20} style={{ color: '#f59e0b' }} />
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b', display: 'block' }}>Choose File</span>
                                        <span style={{ fontSize: '11px', color: '#bbb', display: 'block', marginTop: '2px' }}>Preview only</span>
                                    </div>
                                )}
                            </label>
                        </div>

                        <button onClick={handleAddFood} disabled={addLoading}
                            style={{
                                width: '100%', background: addLoading ? '#fcd34d' : '#f59e0b',
                                color: '#1a1a1a', fontWeight: '800', padding: '14px',
                                borderRadius: '12px', border: 'none', fontSize: '14px',
                                cursor: addLoading ? 'not-allowed' : 'pointer', marginTop: '4px',
                                letterSpacing: '0.5px',
                            }}>
                            {addLoading ? 'Adding...' : '+ Add to Menu'}
                        </button>
                    </div>
                </div>

                {/* Menu Items Table */}
                <div style={{ flex: 1, minWidth: '420px', background: '#fff', borderRadius: '18px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f4f4f4' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Current Menu Items</h2>
                        <span style={{ background: '#fff0e6', color: '#f59e0b', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '800', border: '1px solid #fcd34d' }}>
                            Total Items: {foods.length}
                        </span>
                    </div>

                    {loading ? (
                        <div style={{ padding: '40px 0', textAlign: 'center', color: '#bbb', fontSize: '14px' }}>Loading...</div>
                    ) : foods.length === 0 ? (
                        <div style={{ padding: '40px 0', textAlign: 'center', color: '#bbb', fontSize: '14px' }}>Tama kisima kemak add karala nehe!</div>
                    ) : (
                        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #f4f4f4' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#fafafa', borderBottom: '1px solid #f4f4f4' }}>
                                        {['Dish', 'Name', 'Category', 'Price', 'Action'].map((h) => (
                                            <th key={h} style={{ padding: '13px 16px', color: '#bbb', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: h === 'Action' ? 'center' : 'left' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((food, index) => (
                                        <tr key={getFoodId(food) || index} style={{ borderBottom: '1px solid #f9f9f9' }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#fafafa'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '12px 16px' }}>
                                                <img src={food.image || FALLBACK_IMAGE} alt={food.name}
                                                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #f4f4f4' }}
                                                    onError={(e) => { e.target.src = FALLBACK_IMAGE; }} />
                                            </td>
                                            <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1a1a1a', fontSize: '14px' }}>{food.name}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{ background: '#fff0e6', color: '#f59e0b', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                                                    {food.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 16px', fontWeight: '800', color: '#f59e0b', fontSize: '14px' }}>
                                                LKR {typeof food.price === 'number' ? food.price.toFixed(2) : parseFloat(food.price || 0).toFixed(2)}
                                            </td>
                                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                <button onClick={() => handleDeleteFood(getFoodId(food))}
                                                    style={{ background: '#fce8e6', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}
                                                    onMouseOver={(e) => e.currentTarget.style.background = '#fca5a5'}
                                                    onMouseOut={(e) => e.currentTarget.style.background = '#fce8e6'}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
