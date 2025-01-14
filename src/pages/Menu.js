import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Restrarant from '../components/Restaurant'; 
import RestrarantItem from '../components/RestaurantItem'; 

// Menu component to handle routing between different restaurant views
const Menu = () => {
  return (
    <div>
      <Routes>
        {/* Route to display the list of restaurants */}
        <Route path="/" element={<Restrarant />} />
        
        {/* Dynamic route to display a specific restaurant item based on the id */}
        <Route path="/restaurant/:id" element={<RestrarantItem />} />
      </Routes>
    </div>
  );
};

export default Menu;
