import React from 'react';
import './MealPlan.css';

const MealPlan = ({ mealPlan }) => {
  const renderMeal = (mealName, items) => (
    <div className="meal-section" key={mealName}>
      <h3 className="meal-title">{mealName.charAt(0).toUpperCase() + mealName.slice(1)}</h3>
      <div className="meal-items">
        {items.map((food, index) => (
          <div className="meal-item" key={index}>
            <span className="item-name">{food.item}</span>
            <span className="item-portion">
              {food.portion || <span className="missing-portion">No portion specified</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="card meal-plan">
      <h2 className="section-title">Meal Plan</h2>
      <div className="meals-container">
        {renderMeal('breakfast', mealPlan.breakfast)}
        {renderMeal('lunch', mealPlan.lunch)}
        {renderMeal('dinner', mealPlan.dinner)}
      </div>
    </div>
  );
};

export default MealPlan;
