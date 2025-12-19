# SIA Health - Meal Plan Quality Checker

A frontend-only dashboard for internal health coaches to perform quality checks on client meal plans. Built for SIA Health's tech assignment.

## Project Overview

This tool helps health coaches review meal plans created by nutritionists by performing automated quality checks and providing clear, actionable insights. The focus is on logical validation, clarity, and structured thinking rather than medical accuracy.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Features

### 1. Client Summary Section
- Displays client age, condition (e.g., PCOS), key symptoms, and goals
- Shows medical notes for context
- Clean, scannable layout for quick review

### 2. Meal Plan Display
- Organized view of breakfast, lunch, and dinner
- Shows food items with portion sizes
- Highlights missing portions for easy identification

### 3. Quality Check 1: Rule-Based Validation

#### A. Protein Content Check
- **Purpose**: Validates each meal contains approximately 10-14g protein
- **Status Levels**: OK / Warning / Needs Improvement
- **Logic**: 
  - Calculates protein from a nutrition database
  - Parses portion sizes (grams, bowls, cups, etc.)
  - Assesses against target range per meal

#### B. Portion Size Check
- **Purpose**: Ensures all food items have defined, measurable portions
- **Status Levels**: OK / Warning / Needs Improvement
- **Logic**:
  - Identifies missing portions
  - Flags unclear or non-standard portion formats
  - Essential for accurate nutrition tracking

#### C. Formatting & Consistency Check
- **Purpose**: Validates professional presentation standards
- **Status Levels**: OK / Needs Improvement
- **Logic**:
  - Checks capitalization of food item names
  - Detects multiple consecutive spaces
  - Ensures consistent formatting

### 4. Quality Check 2: AI-Assisted Plan Fit Analysis

#### Purpose
Assesses whether the meal plan is a reasonable fit for:
- Client's specific condition (e.g., PCOS)
- Stated goals (energy, cycle health, etc.)
- Logged symptoms (fatigue, bloating, cravings)

#### AI Prompt Structure
The AI analysis is guided by a clear prompt that includes:
- Complete client profile (age, condition, symptoms, goals)
- Full meal plan with portions
- Specific analysis questions:
  1. Alignment with condition management principles
  2. Contradictions with logged symptoms
  3. Support for stated goals
  4. High-level concerns or confirmations

#### Output Interpretation
The raw AI output is **not** blindly displayed. Instead:
- **Summary Assessment**: 1-2 sentence overview of plan fit
- **Positive Alignments**: Specific confirmations of good choices
- **Areas for Consideration**: Concerns with clear reasoning
- **Collapsible Sections**: Raw AI output and prompt available for transparency

#### Mock AI Implementation
For this assignment, AI logic is simulated with rule-based analysis that:
- Checks for high-GI foods vs. PCOS management
- Validates anti-inflammatory ingredient presence
- Assesses protein distribution for satiety
- Correlates meal components with logged symptoms

## Approach & Methodology

### Overall Architecture
- **Frontend-only**: No backend, authentication, or database
- **React-based**: Component-driven architecture for maintainability
- **Modular design**: Separate utilities for quality checks
- **Mock data**: Hardcoded client and meal plan data based on assignment context

### Component Structure
```
src/
├── components/
│   ├── ClientSummary.js/css      # Client profile display
│   ├── MealPlan.js/css           # Meal plan visualization
│   ├── RuleBasedChecks.js/css    # Rule-based validation UI
│   └── AIAssistedCheck.js/css    # AI analysis display
├── data/
│   └── mockData.js               # Client & meal plan data
├── utils/
│   └── qualityChecks.js          # All quality check logic
├── App.js/css                    # Main application
└── index.js/css                  # Entry point
```

### Design Decisions

1. **Separation of Concerns**: Quality check logic separated from UI components
2. **Reusable Functions**: Portion parsing and protein calculation are modular
3. **Clear Status System**: Consistent OK/Warning/Needs Improvement across checks
4. **Assumption Transparency**: Each check explicitly states its assumptions
5. **Progressive Disclosure**: Collapsible sections for detailed information

## Assumptions Made

### Nutrition & Portions
- **Protein Target**: 10-14g per meal (standard balanced meal recommendation)
- **Portion Conversions**:
  - 1 bowl ≈ 150g
  - 1 cup ≈ 200g
  - 1 tbsp ≈ 15g
  - 1 medium item ≈ 100g
- **Nutrition Database**: Approximate protein values from standard food databases
- **Missing Items**: Foods not in database are excluded from protein calculation

### Quality Standards
- **Portion Requirement**: All items should have measurable portions
- **Formatting**: Professional presentation requires capitalized item names
- **PCOS Management**: Low GI, anti-inflammatory, balanced macros preferred

### AI Analysis
- **Mock Implementation**: Simulates AI with logical rule-based analysis
- **Focus Areas**: Condition alignment, symptom correlation, goal support
- **No Medical Claims**: Analysis is for quality control, not medical advice

## How AI Was Used

### Prompt Design
The AI prompt is structured to:
1. Provide complete context (client profile + meal plan)
2. Ask specific, targeted questions
3. Request structured output (alignments, concerns, confirmations)
4. Focus on logical fit rather than medical accuracy

### Output Processing
Raw AI output undergoes interpretation:
1. **Parsing**: Extract key concerns and confirmations
2. **Categorization**: Group by meal or topic area
3. **Simplification**: Convert to 1-2 line explanations
4. **Contextualization**: Relate findings to client symptoms/goals

### Mock AI Logic
For this assignment, "AI" analysis is implemented via:
- Pattern matching for ingredient types
- Logical rules for PCOS management
- Symptom-food correlation checks
- Portion size reasonableness assessment

This approach demonstrates:
- How to frame problems for AI
- How to validate AI output
- How to present insights clearly
- Responsible AI usage (interpretation, not blind trust)

## UI/UX Considerations

### Design Principles
- **Clarity First**: Information hierarchy optimized for quick scanning
- **Status Visibility**: Color-coded badges for immediate status recognition
- **Progressive Disclosure**: Details available but not overwhelming
- **Professional Appearance**: Clean, modern design suitable for internal tools

### Color Coding
- **Green**: OK status - no action needed
- **Orange**: Warning - review recommended
- **Red**: Needs Improvement - action required
- **Blue**: Informational elements

### Responsive Design
- Mobile-friendly layout
- Grid-based meal plan display adapts to screen size
- Readable on tablets and desktops

## Improvements with More Time

### Functionality Enhancements
1. **Real AI Integration**: Connect to OpenAI API or similar for actual AI analysis
2. **Editable Meal Plans**: Allow coaches to modify plans and re-run checks
3. **Historical Tracking**: Store and compare multiple versions of meal plans
4. **Export Reports**: Generate PDF summaries for client records
5. **Batch Processing**: Check multiple meal plans simultaneously

### Quality Check Additions
1. **Micronutrient Analysis**: Check for key vitamins/minerals (iron, B12, etc.)
2. **Allergen Detection**: Flag common allergens based on client profile
3. **Variety Check**: Ensure diverse food groups across days/weeks
4. **Timing Analysis**: Validate meal timing for condition management
5. **Cost Estimation**: Approximate meal plan affordability

### Technical Improvements
1. **Backend Integration**: Store data, user authentication, role management
2. **Expanded Nutrition Database**: More comprehensive food data
3. **Custom Rules Engine**: Allow coaches to define organization-specific rules
4. **A/B Testing**: Compare different meal plan approaches
5. **Analytics Dashboard**: Track common issues across all meal plans

### UX Enhancements
1. **Guided Fixes**: Suggest specific replacements for flagged items
2. **Comparison View**: Side-by-side before/after meal plan comparison
3. **Client Communication**: Generate client-friendly explanations
4. **Collaboration Features**: Comments and notes between nutritionists and coaches
5. **Mobile App**: Native mobile experience for on-the-go reviews

### AI Improvements
1. **Fine-tuned Model**: Train on SIA Health's historical meal plans
2. **Confidence Scores**: Show AI certainty levels for each insight
3. **Explainable AI**: More detailed reasoning for AI recommendations
4. **Multi-model Ensemble**: Combine multiple AI approaches for robustness
5. **Feedback Loop**: Learn from coach corrections over time

## Code Quality

### Best Practices Followed
- **Clean Code**: Descriptive variable/function names
- **Comments**: Key logic explained inline
- **Modularity**: Reusable utility functions
- **Consistency**: Uniform code style throughout
- **Error Handling**: Graceful handling of missing/invalid data

### Testing Considerations
With more time, would add:
- Unit tests for quality check functions
- Component tests for UI rendering
- Integration tests for full workflow
- Edge case validation

## Assignment Context

This project was built for **SIA Health's tech assignment** to evaluate:
- ✅ Data structuring approach
- ✅ Logical quality check implementation
- ✅ Responsible AI usage (if applicable)
- ✅ Clear communication and documentation
- ✅ Clean, maintainable code

**Focus**: Quality control and decision-making support, not medical accuracy.

## License

This is an assignment project for SIA Health. Not for production use.

## Author

Built as a technical assignment demonstrating frontend development, logical thinking, and structured problem-solving skills.

---

