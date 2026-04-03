# Smart Career Guidance System

A modern, full-stack web application that helps students discover the best career path based on their interests, skills, and education level.

## Features

### 1. Intelligent Career Recommendations
- Rule-based AI system that matches user profiles with career options
- Analyzes interests, skills, and education level
- Returns personalized career recommendations

### 2. Beautiful User Interface
- Modern, responsive design with gradient backgrounds
- Smooth animations and transitions
- Card-based layout for easy browsing
- Mobile-friendly responsive design

### 3. Interactive Career Roadmaps
- Step-by-step guidance for each career path
- Visual timeline showing progression
- Required skills and suggested courses
- Actionable next steps

### 4. Comprehensive Career Database
- 10+ pre-loaded career options including:
  - Software Engineer
  - Web Developer
  - Doctor
  - Biotechnologist
  - UI/UX Designer
  - Graphic Designer
  - Data Scientist
  - Digital Marketer
  - Mechanical Engineer
  - Content Writer

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and animations
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Supabase** - Database and serverless functions
- **PostgreSQL** - Relational database
- **Edge Functions** - Serverless API endpoints

## How It Works

1. **User Input**: Students fill out a form with their interests, skills, and education level
2. **Intelligent Matching**: The system analyzes the input and matches it against career keywords and requirements
3. **Recommendations**: Top 3 career matches are displayed with detailed information
4. **Career Roadmap**: Users can view step-by-step guidance for any recommended career

## Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. The application is already configured with Supabase. Environment variables are pre-configured in `.env`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── HomePage.tsx         # Landing page with form
│   ├── ResultsPage.tsx      # Career recommendations display
│   └── CareerRoadmap.tsx    # Detailed career roadmap
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles and animations

supabase/
└── functions/
    └── get-career-recommendations/
        └── index.ts         # Serverless function for recommendations
```

## Database Schema

### careers
Stores all career information:
- Career details (name, description)
- Keywords for matching
- Required skills
- Suggested courses
- Roadmap steps
- UI metadata (icon, color)

### user_submissions
Stores user form submissions and recommendations for analytics

## Key Features Explained

### Smart Recommendation Algorithm
The system uses a scoring algorithm that:
1. Matches user interests with career keywords (10 points per match)
2. Matches user skills with required skills (5 points per match)
3. Ranks careers by score and returns top matches
4. Falls back to top general careers if no matches found

### Responsive Design
- Gradient backgrounds for visual appeal
- Card-based layouts for easy scanning
- Smooth animations for better UX
- Mobile-first responsive breakpoints

### User Experience
- Form validation with visual feedback
- Loading states during API calls
- Error handling with friendly messages
- Easy navigation between pages

## Hackathon Presentation Tips

1. **Demo Flow**:
   - Start with homepage, explain the value proposition
   - Fill out form with sample data (e.g., "coding, web development")
   - Show the instant career recommendations
   - Click into a career roadmap to show detailed guidance

2. **Highlight Technical Features**:
   - Full-stack TypeScript implementation
   - Serverless architecture with Supabase
   - Intelligent matching algorithm
   - Modern UI with Tailwind CSS

3. **Emphasize Impact**:
   - Helps students make informed career decisions
   - Provides actionable roadmaps, not just suggestions
   - Scalable to add more careers and features

4. **Future Enhancements**:
   - Machine learning for better recommendations
   - User accounts to track progress
   - Integration with course platforms
   - Career mentorship matching

## License

MIT License - feel free to use this project for learning and presentations!
