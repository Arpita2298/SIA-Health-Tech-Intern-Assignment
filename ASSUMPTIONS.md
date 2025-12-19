# Detailed Assumptions Document

This document provides a comprehensive breakdown of all assumptions made during the development of the SIA Health Meal Plan Quality Checker.

## Nutrition & Dietary Assumptions

### Protein Requirements
- **Target Range**: 10-14g protein per meal
- **Rationale**: Standard recommendation for balanced meals supporting satiety and muscle maintenance
- **Source**: General nutrition guidelines for adult women
- **Flexibility**: Range allows for individual variation while flagging significant deviations

### Protein Content Database
The following approximate protein values (per 100g) are used:

| Food Item | Protein (g/100g) | Category |
|-----------|------------------|----------|
| Oats | 13.2 | Grain |
| Almonds | 21.0 | Nuts |
| Chia seeds | 16.5 | Seeds |
| Banana | 1.1 | Fruit |
| Brown rice | 2.6 | Grain |
| Moong dal | 24.0 | Legume |
| Mixed vegetables | 2.0 | Vegetable |
| Cucumber | 0.7 | Vegetable |
| Curd/Yogurt | 3.5 | Dairy |
| Whole wheat roti | 3.5 | Grain |
| Paneer | 18.0 | Dairy |
| Spinach | 2.9 | Vegetable |

**Note**: These are approximate values from standard nutrition databases. Actual values may vary based on preparation method, brand, and specific variety.

### Portion Size Conversions
Standard conversions used for portion parsing:

- **1 bowl** = 150g (standard serving bowl)
- **1 cup** = 200g (standard measuring cup)
- **1 tablespoon (tbsp)** = 15g
- **1 teaspoon (tsp)** = 5g
- **1 piece** = 10g (for nuts/seeds)
- **1 medium** (fruit/vegetable) = 100g
- **1 small** = 75g
- **1 large** = 150g

**Rationale**: These are common kitchen measurements used in Indian meal planning.

## PCOS Management Assumptions

### Dietary Principles for PCOS
Based on general PCOS management guidelines:

1. **Low Glycemic Index (GI)**: Prefer complex carbs over simple sugars
2. **Anti-inflammatory Foods**: Include foods that reduce inflammation
3. **Balanced Macros**: Adequate protein, healthy fats, complex carbs
4. **Fiber-rich**: Support digestive health and blood sugar regulation
5. **Moderate Portions**: Avoid large meals that spike insulin

### Symptom-Food Correlations
- **Fatigue** → Benefits from: Complex carbs, iron-rich foods, B vitamins
- **Bloating** → May worsen with: Large dairy portions, high-FODMAP foods
- **Sugar Cravings** → Reduced by: Adequate protein, fiber, balanced meals
- **Irregular Cycles** → Supported by: Anti-inflammatory foods, balanced nutrition

**Disclaimer**: These are general correlations, not medical advice. Individual responses vary.

## Quality Check Assumptions

### Protein Check
- **Acceptable Range**: 10-14g per meal
- **Warning Range**: 8-10g (slightly low but not critical)
- **Needs Improvement**: <8g or >20g
- **Missing Data**: Foods not in database are excluded from calculation (flagged in logs)

### Portion Size Check
- **Required**: Every food item should have a measurable portion
- **Acceptable Formats**: 
  - Weight: "100g", "1kg"
  - Volume: "1 bowl", "1 cup"
  - Count: "10 pieces", "2 medium"
- **Unacceptable**: Missing portions, vague terms like "some" or "handful"

### Formatting Check
- **Capitalization**: Food item names should start with capital letter
- **Spacing**: No multiple consecutive spaces
- **Consistency**: Similar items formatted similarly
- **Rationale**: Professional presentation for client-facing documents

## AI Analysis Assumptions

### Mock AI Logic
Since this is a frontend-only demo, AI is simulated with rule-based logic:

1. **High GI Detection**: Flags foods like banana, white bread, refined sugar
2. **Anti-inflammatory Check**: Confirms presence of spinach, turmeric, ginger, chia, almonds
3. **Protein Distribution**: Validates adequate protein sources across meals
4. **Dairy Sensitivity**: Flags large dairy portions for clients with bloating
5. **Symptom Correlation**: Links meal components to logged symptoms

### AI Prompt Design
The prompt structure assumes:
- AI has general nutrition knowledge
- AI understands PCOS management principles
- AI can reason about symptom-food relationships
- AI output needs human interpretation (not used blindly)

### Real AI Integration (Future)
With actual AI integration, would assume:
- API availability and rate limits
- Response time <5 seconds for good UX
- Structured output format (JSON preferred)
- Error handling for API failures
- Cost considerations for API calls

## Technical Assumptions

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Minimum screen width: 320px (mobile)
- CSS Grid and Flexbox support

### Data Format
- Client data is complete and valid
- Meal plan has breakfast, lunch, dinner structure
- Food items are strings
- Portions are strings (parsed by utility functions)

### Performance
- Small dataset (single client, single meal plan)
- All processing client-side
- No optimization needed for current scale
- Would need backend for production scale

## Limitations & Disclaimers

### Not Included
- **Medical Accuracy**: This is a quality control tool, not medical software
- **Individual Variations**: Doesn't account for allergies, preferences, cultural factors
- **Micronutrients**: Only checks protein, not vitamins/minerals
- **Meal Timing**: Doesn't validate when meals should be eaten
- **Hydration**: Doesn't track water intake
- **Supplements**: Doesn't consider vitamin/mineral supplements

### Known Edge Cases
- **Combination Dishes**: "Mixed vegetable curry" uses average protein value
- **Preparation Methods**: Doesn't account for cooking losses
- **Brand Variations**: Generic values used, not brand-specific
- **Seasonal Variations**: Doesn't adjust for seasonal food availability

### Scope Boundaries
This tool is designed for:
- ✅ Internal quality control by health coaches
- ✅ Logical consistency checks
- ✅ Formatting and completeness validation
- ✅ High-level nutritional assessment

This tool is NOT designed for:
- ❌ Medical diagnosis or treatment
- ❌ Precise calorie/macro counting
- ❌ Client-facing nutrition advice
- ❌ Replacement for nutritionist expertise

## Future Assumption Refinements

With more time and data, would improve:

1. **Personalized Targets**: Adjust protein targets based on client weight, activity level
2. **Expanded Database**: Include more foods, regional variations, brand-specific data
3. **Dynamic Rules**: Allow coaches to configure organization-specific standards
4. **Learning System**: Adjust assumptions based on successful meal plans
5. **Evidence-Based Updates**: Regularly update based on latest nutrition research

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Status**: Assignment Demo - Not for Production Use
