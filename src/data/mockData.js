export const clientData = {
  name: "Client Profile",
  age: 31,
  condition: "PCOS",
  weight: "91.5 kg",
  height: "165 cm",
  symptoms: [
    "Hormonal acne",
    "Weight gain issues",
    "Over 3 years duration"
  ],
  primarySymptoms: "PCOS, Hormonal acne, weight gain issues",
  concerns: "Fatigue or low energy levels, Weight management difficulties, Digestive issues, Hairfall, PMS (Pre-menstrual syndrome), Menstrual Pain, Body image concerns",
  goals: [
    "Regulate menstrual cycle",
    "Improve energy levels",
    "Weight management",
    "Reduce hormonal acne"
  ],
  medicalNotes: "Hormonal Profile: FSH:FH - 1, Inflammation: tgd's - 205, uric acid- 8.3, testosterone- 103, tsh- 7.167. Medication: yes- contraceptives (prior), omega 3 nd multi vitamin"
}; 
  
export const mealPlanData = {
  breakfast: [
    { item: "Oats porridge", portion: "1 bowl (50g dry oats)" },
    { item: "Almonds", portion: "10 pieces" },
    { item: "chia seeds", portion: "1 tbsp" },
    { item: "Banana", portion: "1 medium" }
  ],
  lunch: [
    { item: "Brown rice", portion: "1 cup cooked" },
    { item: "Dal (moong)", portion: "1 bowl" },
    { item: "Mixed vegetable curry", portion: "1 bowl" },
    { item: "Cucumber salad", portion: "1 small bowl" },
    { item: "Curd", portion: "100g" }
  ],
  dinner: [
    { item: "Roti (whole wheat)", portion: "2 medium" },
    { item: "Paneer curry", portion: "150g" },
    { item: "Spinach sabzi", portion: "1 bowl" },
    { item: "Salad" }
  ]
};

export const nutritionDatabase = {
  "oats porridge": { proteinPer100g: 13.2, category: "grain" },
  "almonds": { proteinPer100g: 21.0, category: "nuts" },
  "chia seeds": { proteinPer100g: 16.5, category: "seeds" },
  "banana": { proteinPer100g: 1.1, category: "fruit" },
  "brown rice": { proteinPer100g: 2.6, category: "grain" },
  "dal (moong)": { proteinPer100g: 24.0, category: "legume" },
  "mixed vegetable curry": { proteinPer100g: 2.0, category: "vegetable" },
  "cucumber salad": { proteinPer100g: 0.7, category: "vegetable" },
  "curd": { proteinPer100g: 3.5, category: "dairy" },
  "roti (whole wheat)": { proteinPer100g: 3.5, category: "grain" },
  "paneer curry": { proteinPer100g: 18.0, category: "dairy" },
  "spinach sabzi": { proteinPer100g: 2.9, category: "vegetable" },
  "salad": { proteinPer100g: 1.0, category: "vegetable" }
};
