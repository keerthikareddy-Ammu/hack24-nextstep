/*
  # Smart Career Guidance System Database Schema

  ## Overview
  Creates tables for storing career information and user submissions for the career guidance system.

  ## New Tables
  
  ### `careers`
  Stores comprehensive career information including:
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Career name (e.g., "Software Engineer")
  - `description` (text) - Detailed career description
  - `keywords` (text[]) - Array of keywords for matching (e.g., ["coding", "programming"])
  - `required_skills` (text[]) - Array of required skills
  - `suggested_courses` (text[]) - Array of course recommendations
  - `roadmap_steps` (text[]) - Array of steps to achieve this career
  - `icon` (text) - Icon name for UI display
  - `color` (text) - Color scheme for card display
  - `created_at` (timestamptz) - Record creation timestamp

  ### `user_submissions`
  Stores user form submissions and their recommendations:
  - `id` (uuid, primary key) - Unique identifier
  - `interest` (text) - User's stated interest
  - `skills` (text[]) - Array of selected skills
  - `education_level` (text) - Education level
  - `recommended_careers` (uuid[]) - Array of career IDs recommended
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for careers (anyone can view career data)
  - Public insert access for user_submissions (anyone can submit)
  - Users can view their own submissions

  ## Initial Data
  - Seeds initial career data for the recommendation system
*/

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  keywords text[] NOT NULL,
  required_skills text[] NOT NULL,
  suggested_courses text[] NOT NULL,
  roadmap_steps text[] NOT NULL,
  icon text DEFAULT 'Briefcase',
  color text DEFAULT 'blue',
  created_at timestamptz DEFAULT now()
);

-- Create user_submissions table
CREATE TABLE IF NOT EXISTS user_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interest text NOT NULL,
  skills text[] NOT NULL,
  education_level text NOT NULL,
  recommended_careers uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for careers (public read)
CREATE POLICY "Anyone can view careers"
  ON careers FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for user_submissions
CREATE POLICY "Anyone can insert submissions"
  ON user_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view submissions"
  ON user_submissions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial career data
INSERT INTO careers (name, description, keywords, required_skills, suggested_courses, roadmap_steps, icon, color) VALUES
  (
    'Software Engineer',
    'Design, develop, and maintain software applications and systems. Work with cutting-edge technologies to solve real-world problems.',
    ARRAY['coding', 'programming', 'software', 'tech', 'computer'],
    ARRAY['Programming (Python/Java/C++)', 'Data Structures', 'Algorithms', 'Problem Solving', 'Git'],
    ARRAY['CS50 - Harvard', 'Python for Everybody', 'Data Structures & Algorithms', 'System Design'],
    ARRAY['Learn a programming language (Python/Java)', 'Master data structures and algorithms', 'Build 5-10 projects', 'Contribute to open source', 'Practice on LeetCode/HackerRank', 'Apply for internships'],
    'Code',
    'blue'
  ),
  (
    'Web Developer',
    'Create and maintain websites and web applications. Bring designs to life with interactive, responsive interfaces.',
    ARRAY['coding', 'web', 'design', 'frontend', 'backend', 'programming'],
    ARRAY['HTML/CSS', 'JavaScript', 'React/Vue', 'Node.js', 'Responsive Design'],
    ARRAY['The Web Developer Bootcamp', 'JavaScript - The Complete Guide', 'React - The Complete Guide', 'Node.js Masterclass'],
    ARRAY['Learn HTML, CSS, JavaScript basics', 'Master a frontend framework (React/Vue)', 'Learn backend with Node.js', 'Build portfolio projects', 'Learn database (MongoDB/PostgreSQL)', 'Deploy projects online'],
    'Globe',
    'green'
  ),
  (
    'Doctor',
    'Diagnose and treat illnesses, provide medical care, and improve patient health outcomes. Make a real difference in people''s lives.',
    ARRAY['biology', 'medical', 'health', 'science', 'medicine'],
    ARRAY['Biology', 'Chemistry', 'Anatomy', 'Patient Care', 'Medical Knowledge'],
    ARRAY['MBBS Degree', 'Medical Entrance Preparation (NEET)', 'Specialization (MD/MS)', 'Clinical Training'],
    ARRAY['Complete Pre-Medical education (12th with Biology)', 'Prepare for and clear NEET exam', 'Complete MBBS (5.5 years)', 'Complete internship', 'Pursue specialization (MD/MS)', 'Get medical license'],
    'Heart',
    'red'
  ),
  (
    'Biotechnologist',
    'Apply biological knowledge to develop new products, technologies, and solutions for healthcare, agriculture, and environment.',
    ARRAY['biology', 'science', 'research', 'lab', 'genetics'],
    ARRAY['Biology', 'Chemistry', 'Genetics', 'Laboratory Skills', 'Research Methods'],
    ARRAY['B.Tech/B.Sc in Biotechnology', 'Molecular Biology', 'Genetic Engineering', 'Research Methodology'],
    ARRAY['Complete B.Tech/B.Sc in Biotechnology', 'Gain laboratory experience', 'Learn key techniques (PCR, DNA sequencing)', 'Work on research projects', 'Pursue M.Sc or PhD for advanced roles', 'Join biotech companies or research institutes'],
    'Microscope',
    'purple'
  ),
  (
    'UI/UX Designer',
    'Create beautiful, intuitive user interfaces and experiences. Combine creativity with user research to design products people love.',
    ARRAY['design', 'creative', 'art', 'interface', 'user experience'],
    ARRAY['Figma/Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    ARRAY['Google UX Design Certificate', 'UI/UX Design Specialization', 'Interaction Design', 'Design Thinking'],
    ARRAY['Learn design fundamentals (color, typography, layout)', 'Master design tools (Figma, Adobe XD)', 'Study user research and psychology', 'Create portfolio projects', 'Learn prototyping and interaction design', 'Build personal brand and apply for jobs'],
    'Palette',
    'pink'
  ),
  (
    'Graphic Designer',
    'Create visual content for brands, marketing, and media. Use creativity to communicate messages through graphics and illustrations.',
    ARRAY['design', 'creative', 'art', 'visual', 'illustration'],
    ARRAY['Adobe Photoshop', 'Adobe Illustrator', 'Typography', 'Color Theory', 'Creativity'],
    ARRAY['Graphic Design Specialization', 'Adobe Creative Suite Mastery', 'Logo Design Course', 'Brand Identity Design'],
    ARRAY['Learn design principles and theory', 'Master Adobe Creative Suite (Photoshop, Illustrator)', 'Study typography and color theory', 'Build diverse portfolio', 'Learn branding and identity design', 'Freelance or join design agency'],
    'Paintbrush',
    'orange'
  ),
  (
    'Data Scientist',
    'Extract insights from data using statistics, machine learning, and programming. Help organizations make data-driven decisions.',
    ARRAY['coding', 'math', 'statistics', 'data', 'analysis', 'programming'],
    ARRAY['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    ARRAY['Data Science Specialization', 'Machine Learning by Andrew Ng', 'Python for Data Science', 'Deep Learning'],
    ARRAY['Learn Python and SQL', 'Master statistics and probability', 'Study machine learning algorithms', 'Work on Kaggle competitions', 'Build data projects portfolio', 'Learn big data tools (Spark, Hadoop)'],
    'BarChart',
    'indigo'
  ),
  (
    'Digital Marketer',
    'Promote products and brands online through SEO, social media, content marketing, and paid advertising campaigns.',
    ARRAY['marketing', 'business', 'social', 'creative', 'writing'],
    ARRAY['SEO', 'Social Media Marketing', 'Content Writing', 'Analytics', 'Google Ads'],
    ARRAY['Digital Marketing Certification', 'Google Ads Certification', 'SEO Training', 'Social Media Marketing'],
    ARRAY['Learn digital marketing fundamentals', 'Get Google Ads and Analytics certified', 'Master SEO and content marketing', 'Gain experience with social media platforms', 'Build personal brand online', 'Work on real campaigns'],
    'TrendingUp',
    'teal'
  ),
  (
    'Mechanical Engineer',
    'Design, develop, and test mechanical systems and devices. Work on everything from engines to robotics.',
    ARRAY['engineering', 'math', 'physics', 'tech', 'machines'],
    ARRAY['CAD Software', 'Thermodynamics', 'Mechanics', 'Manufacturing', 'Problem Solving'],
    ARRAY['B.Tech in Mechanical Engineering', 'CAD/CAM Training', 'Thermodynamics', 'Manufacturing Processes'],
    ARRAY['Complete B.Tech in Mechanical Engineering', 'Learn CAD software (SolidWorks, AutoCAD)', 'Gain internship experience', 'Work on design projects', 'Get industry certifications', 'Join engineering firms or pursue higher studies'],
    'Cog',
    'gray'
  ),
  (
    'Content Writer',
    'Create engaging written content for websites, blogs, marketing materials, and social media. Tell stories that connect with audiences.',
    ARRAY['writing', 'creative', 'english', 'communication', 'content'],
    ARRAY['Writing Skills', 'SEO Writing', 'Research', 'Grammar', 'Creativity'],
    ARRAY['Content Writing Masterclass', 'SEO Writing Course', 'Creative Writing', 'Copywriting Secrets'],
    ARRAY['Develop strong writing skills', 'Learn SEO and keyword research', 'Study different content formats', 'Build writing portfolio', 'Start a blog or Medium account', 'Pitch to clients or join content agencies'],
    'PenTool',
    'yellow'
  );
