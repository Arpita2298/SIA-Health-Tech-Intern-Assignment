import { nutritionDatabase } from '../data/mockData';

export const parsePortionSize = (portion) => {
  if (!portion) return null;
  
  const match = portion.match(/(\d+(?:\.\d+)?)\s*(g|grams?|kg|bowl|cup|tbsp|tsp|pieces?|medium|small|large)/i);
  if (!match) return null;
  
  let amount = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  
  if (unit.includes('kg')) amount *= 1000;
  else if (unit.includes('bowl')) amount = 150;
  else if (unit.includes('cup')) amount = 200;
  else if (unit.includes('tbsp')) amount = 15;
  else if (unit.includes('tsp')) amount = 5;
  else if (unit.includes('piece')) amount = amount * 10;
  else if (unit === 'medium') amount = 100;
  else if (unit === 'small') amount = 75;
  else if (unit === 'large') amount = 150;
  
  return amount;
};

export const calculateProteinContent = (item, portion) => {
  const itemLower = item.toLowerCase();
  const nutritionInfo = nutritionDatabase[itemLower];
  
  if (!nutritionInfo) return null;
  
  const portionGrams = parsePortionSize(portion);
  if (!portionGrams) return null;
  
  return (nutritionInfo.proteinPer100g * portionGrams) / 100;
};

export const checkProteinContent = (mealPlan) => {
  const results = {
    breakfast: { total: 0, items: [] },
    lunch: { total: 0, items: [] },
    dinner: { total: 0, items: [] }
  };
  
  Object.keys(mealPlan).forEach(mealType => {
    mealPlan[mealType].forEach(food => {
      const protein = calculateProteinContent(food.item, food.portion);
      if (protein !== null) {
        results[mealType].total += protein;
        results[mealType].items.push({
          item: food.item,
          protein: protein.toFixed(1)
        });
      }
    });
  });
  
  const assessments = {};
  Object.keys(results).forEach(mealType => {
    const total = results[mealType].total;
    if (total >= 10 && total <= 20) {
      assessments[mealType] = {
        status: 'OK',
        message: `Good protein content: ${total.toFixed(1)}g (target: 10-14g)`
      };
    } else if (total >= 8 && total < 10) {
      assessments[mealType] = {
        status: 'Warning',
        message: `Slightly low protein: ${total.toFixed(1)}g (target: 10-14g). Consider adding protein-rich foods.`
      };
    } else if (total < 8) {
      assessments[mealType] = {
        status: 'Needs Improvement',
        message: `Low protein content: ${total.toFixed(1)}g (target: 10-14g). Add legumes, dairy, or nuts.`
      };
    } else {
      assessments[mealType] = {
        status: 'Warning',
        message: `High protein content: ${total.toFixed(1)}g (target: 10-14g). This may be acceptable depending on goals.`
      };
    }
  });
  
  return {
    details: results,
    assessments,
    assumptions: [
      "Protein target: 10-14g per meal (standard recommendation for balanced meals)",
      "Protein values estimated from standard nutrition databases",
      "Portion conversions: 1 bowl ≈ 150g, 1 cup ≈ 200g, 1 medium item ≈ 100g"
    ]
  };
};

export const checkPortionSizes = (mealPlan) => {
  const issues = [];
  const warnings = [];
  
  Object.keys(mealPlan).forEach(mealType => {
    mealPlan[mealType].forEach(food => {
      if (!food.portion || food.portion.trim() === '') {
        issues.push({
          meal: mealType,
          item: food.item,
          issue: 'Missing portion size'
        });
      } else {
        const parsed = parsePortionSize(food.portion);
        if (parsed === null) {
          warnings.push({
            meal: mealType,
            item: food.item,
            portion: food.portion,
            issue: 'Portion format unclear or non-standard'
          });
        }
      }
    });
  });
  
  let status = 'OK';
  let message = 'All food items have clearly defined portions.';
  
  if (issues.length > 0) {
    status = 'Needs Improvement';
    message = `${issues.length} item(s) missing portion sizes. Portions are essential for accurate nutrition tracking.`;
  } else if (warnings.length > 0) {
    status = 'Warning';
    message = `${warnings.length} item(s) have unclear portion formats. Consider standardizing (e.g., "100g", "1 bowl").`;
  }
  
  return {
    status,
    message,
    issues,
    warnings,
    assumptions: [
      "All food items should have measurable portions (grams, bowls, cups, pieces)",
      "Standard conversions used for common measurements"
    ]
  };
};

export const checkFormattingAndTypos = (mealPlan) => {
  const issues = [];
  
  Object.keys(mealPlan).forEach(mealType => {
    mealPlan[mealType].forEach(food => {
      const firstChar = food.item.charAt(0);
      if (firstChar !== firstChar.toUpperCase()) {
        issues.push({
          meal: mealType,
          item: food.item,
          issue: 'Item name should start with capital letter',
          suggestion: food.item.charAt(0).toUpperCase() + food.item.slice(1)
        });
      }
      
      if (food.item.includes('  ')) {
        issues.push({
          meal: mealType,
          item: food.item,
          issue: 'Contains multiple consecutive spaces'
        });
      }
      
      if (food.portion && food.portion.includes('  ')) {
        issues.push({
          meal: mealType,
          item: food.item,
          issue: 'Portion contains multiple consecutive spaces'
        });
      }
    });
  });
  
  let status = 'OK';
  let message = 'All items are properly formatted with consistent capitalization.';
  
  if (issues.length > 0) {
    status = 'Needs Improvement';
    message = `Found ${issues.length} formatting issue(s). Consistent formatting improves readability for clients.`;
  }
  
  return {
    status,
    message,
    issues,
    assumptions: [
      "Food item names should start with capital letters for professional appearance",
      "No multiple consecutive spaces should be present"
    ]
  };
};

export const performAIAssistedCheck = (clientData, mealPlan) => {
  const prompt = `
You are a health coach assistant reviewing a meal plan for a client with the following profile:

CLIENT PROFILE:
- Age: ${clientData.age}
- Condition: ${clientData.condition}
- Symptoms: ${clientData.symptoms.join(', ')}
- Goals: ${clientData.goals.join(', ')}

MEAL PLAN:
Breakfast: ${mealPlan.breakfast.map(f => `${f.item} (${f.portion || 'no portion'})`).join(', ')}
Lunch: ${mealPlan.lunch.map(f => `${f.item} (${f.portion || 'no portion'})`).join(', ')}
Dinner: ${mealPlan.dinner.map(f => `${f.item} (${f.portion || 'no portion'})`).join(', ')}

ANALYSIS QUESTIONS:
1. Does this meal plan align with PCOS management principles (low GI, anti-inflammatory, balanced macros)?
2. Are there any contradictions between the meal plan and the client's logged symptoms (fatigue, bloating, sugar cravings)?
3. Does the plan support the client's goals (cycle regulation, energy improvement, reduced bloating)?
4. What are 1-2 high-level concerns or confirmations?

Provide a structured assessment focusing on logical fit, not medical advice.
  `.trim();
  
  const mockAIResponse = analyzeMealPlanLogic(clientData, mealPlan);
  
  return {
    prompt,
    rawAIOutput: mockAIResponse.raw,
    interpretation: mockAIResponse.interpretation,
    concerns: mockAIResponse.concerns,
    confirmations: mockAIResponse.confirmations
  };
};

const analyzeMealPlanLogic = (clientData, mealPlan) => {
  const concerns = [];
  const confirmations = [];
  
  const breakfastItems = mealPlan.breakfast.map(f => f.item.toLowerCase());
  const hasRefinedCarbs = breakfastItems.some(item => 
    item.includes('white bread') || item.includes('sugar') || item.includes('refined')
  );
  
  if (breakfastItems.includes('banana')) {
    concerns.push({
      area: "Breakfast - Glycemic Load",
      detail: "Banana is high GI and may spike blood sugar. For PCOS, consider berries or apple instead to manage insulin resistance."
    });
  }
  
  if (!hasRefinedCarbs && breakfastItems.some(item => item.includes('oats'))) {
    confirmations.push({
      area: "Breakfast - Complex Carbs",
      detail: "Oats provide slow-release energy, good for managing fatigue and stable blood sugar throughout the morning."
    });
  }
  
  const lunchItems = mealPlan.lunch.map(f => f.item.toLowerCase());
  const hasDal = lunchItems.some(item => item.includes('dal') || item.includes('lentil'));
  
  if (hasDal) {
    confirmations.push({
      area: "Lunch - Protein & Fiber",
      detail: "Dal provides plant protein and fiber, supporting satiety and reducing sugar cravings mentioned in symptoms."
    });
  }
  
  const dinnerItems = mealPlan.dinner.map(f => f.item.toLowerCase());
  const hasPaneer = dinnerItems.some(item => item.includes('paneer') || item.includes('cheese'));
  
  if (hasPaneer) {
    const paneerItem = mealPlan.dinner.find(f => f.item.toLowerCase().includes('paneer'));
    if (paneerItem && paneerItem.portion && parsePortionSize(paneerItem.portion) > 100) {
      concerns.push({
        area: "Dinner - Dairy Portion",
        detail: "Large dairy portions at dinner may contribute to bloating (logged symptom). Consider reducing to 100g or monitoring tolerance."
      });
    } else {
      confirmations.push({
        area: "Dinner - Protein Source",
        detail: "Paneer provides good protein for evening satiety, helping prevent late-night cravings."
      });
    }
  }
  
  const allItems = [
    ...mealPlan.breakfast.map(f => f.item.toLowerCase()),
    ...mealPlan.lunch.map(f => f.item.toLowerCase()),
    ...mealPlan.dinner.map(f => f.item.toLowerCase())
  ];
  
  const hasAntiInflammatory = allItems.some(item => 
    item.includes('spinach') || item.includes('turmeric') || item.includes('ginger') || 
    item.includes('chia') || item.includes('almond')
  );
  
  if (hasAntiInflammatory) {
    confirmations.push({
      area: "Overall - Anti-inflammatory Foods",
      detail: "Plan includes anti-inflammatory ingredients (spinach, chia, almonds) which support PCOS management."
    });
  }
  
  const rawOutput = `
ALIGNMENT ANALYSIS:
✓ Meal plan shows good alignment with PCOS management principles
✓ Focus on complex carbohydrates and whole grains
✓ Adequate protein distribution across meals
⚠ Some considerations needed for specific symptoms

SYMPTOM-PLAN CORRELATION:
- Fatigue: Complex carbs (oats, brown rice) provide sustained energy ✓
- Bloating: High dairy/legume content may need monitoring ⚠
- Sugar cravings: Good protein and fiber balance should help ✓

GOAL SUPPORT:
- Cycle regulation: Anti-inflammatory foods present ✓
- Energy improvement: Balanced macros with slow-release carbs ✓
- Bloating reduction: May need portion adjustment for dairy ⚠

KEY CONCERNS:
1. Monitor dairy portions at dinner due to bloating concerns
2. Consider lower GI fruit options for breakfast
3. Overall structure is sound and supportive of goals
  `.trim();
  
  return {
    raw: rawOutput,
    interpretation: concerns.length === 0 
      ? "The meal plan shows strong alignment with the client's PCOS management needs and goals."
      : "The meal plan is generally well-structured but has a few areas that could be optimized based on the client's specific symptoms.",
    concerns,
    confirmations
  };
};
