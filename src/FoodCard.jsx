import React from 'react';

function FoodCard({ food = {}, onAddToCart }) {
  const defaultImage = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60";

  // ආරක්ෂණ පියවරක්: ඩේටා නැත්නම් ක්‍රෑෂ් නොවී හිස්ව තබයි
  if (!food || Object.keys(food).length === 0) {
    return null; 
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '30px', 
      overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #f1f2f6',
      position: 'relative'
    }}>
      {/* Popular Tag */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        backgroundColor: '#ff4757',
        color: 'white',
        padding: '5px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        zIndex: 1
      }}>
        Popular 🔥
      </div>

      {/* Image Area */}
      <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
        <img 
          src={food.image || defaultImage} 
          alt={food.name || "Food Item"} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      {/* Details Area */}
      <div style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#2d3436', fontWeight: '800' }}>
          {food.name || "Delicious Food"}
        </h4>
        
        <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#b2bec3', lineHeight: '1.4' }}>
          {food.description || "Fresh and hot served right to your table."}
        </p>
        
        {/* Price and Add Button Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '5px' }}>
          <span style={{ fontSize: '16px', fontWeight: '800', color: '#2d3436' }}>
            LKR {(food.price || 0).toLocaleString()}.00
          </span>
          
          <button 
            onClick={() => onAddToCart && onAddToCart(food)}
            style={{
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 71, 87, 0.3)',
              outline: 'none'
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;