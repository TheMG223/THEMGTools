import openai
import json
from typing import List, Dict, Any
from app.config import settings

# Configure OpenAI
openai.api_key = settings.OPENAI_API_KEY

class OpenAIService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
    
    async def generate_course_ideas(self, niche: str, keywords: List[str] = None, 
                                  target_audience: str = None, difficulty_level: str = None) -> List[Dict[str, Any]]:
        """Generate course ideas using OpenAI"""
        
        prompt = f"""
        Generate 3 trending course ideas for the niche: {niche}
        
        Additional context:
        - Keywords: {', '.join(keywords) if keywords else 'None provided'}
        - Target Audience: {target_audience or 'General audience'}
        - Difficulty Level: {difficulty_level or 'Beginner to Advanced'}
        
        For each course idea, provide:
        1. A compelling title
        2. Detailed description (2-3 sentences)
        3. Target audience
        4. Difficulty level (Beginner/Intermediate/Advanced)
        5. Estimated duration
        6. Price range
        7. Market demand (High/Medium/Low)
        8. Relevant tags (5-8 tags)
        9. Key features (3-5 bullet points)
        10. Learning objectives (3-5 bullet points)
        
        Return the response as a JSON array with objects containing these fields.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert course creator and market analyst. Generate innovative, marketable course ideas."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            # Try to parse JSON from the response
            try:
                ideas = json.loads(content)
                return ideas if isinstance(ideas, list) else [ideas]
            except json.JSONDecodeError:
                # Fallback: parse the response manually
                return self._parse_ideas_from_text(content)
                
        except Exception as e:
            print(f"Error generating course ideas: {e}")
            return []
    
    async def generate_curriculum(self, course_title: str, course_description: str, 
                                target_audience: str, difficulty_level: str) -> Dict[str, Any]:
        """Generate curriculum structure using OpenAI"""
        
        prompt = f"""
        Create a comprehensive curriculum structure for the course: "{course_title}"
        
        Course Description: {course_description}
        Target Audience: {target_audience}
        Difficulty Level: {difficulty_level}
        
        Generate a curriculum with:
        1. 4-6 modules
        2. 3-5 lessons per module
        3. Each lesson should have a title and brief description
        4. Estimated duration for each lesson
        5. Learning objectives for each module
        
        Return as JSON with structure:
        {{
            "modules": [
                {{
                    "title": "Module Title",
                    "description": "Module description",
                    "learning_objectives": ["obj1", "obj2", "obj3"],
                    "lessons": [
                        {{
                            "title": "Lesson Title",
                            "description": "Lesson description",
                            "duration_minutes": 30,
                            "content_outline": "Brief outline of content"
                        }}
                    ]
                }}
            ]
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert curriculum designer. Create well-structured, engaging course curricula."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            try:
                curriculum = json.loads(content)
                return curriculum
            except json.JSONDecodeError:
                return {"modules": []}
                
        except Exception as e:
            print(f"Error generating curriculum: {e}")
            return {"modules": []}
    
    async def generate_quiz(self, topic: str, lesson_content: str = None, 
                          difficulty_level: str = "intermediate", num_questions: int = 5) -> Dict[str, Any]:
        """Generate quiz questions using OpenAI"""
        
        prompt = f"""
        Create a quiz for the topic: "{topic}"
        
        Lesson Content: {lesson_content or 'General knowledge about the topic'}
        Difficulty Level: {difficulty_level}
        Number of Questions: {num_questions}
        
        Generate multiple choice questions with:
        1. Clear, engaging questions
        2. 4 options (A, B, C, D)
        3. One correct answer
        4. Brief explanation for the correct answer
        5. Appropriate difficulty level
        
        Return as JSON:
        {{
            "topic": "{topic}",
            "questions": [
                {{
                    "question": "Question text?",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct_answer": "Option A",
                    "explanation": "Brief explanation",
                    "difficulty": "{difficulty_level}"
                }}
            ],
            "total_questions": {num_questions},
            "estimated_time_minutes": {num_questions * 2}
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert educator. Create engaging, educational quiz questions."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.6,
                max_tokens=1500
            )
            
            content = response.choices[0].message.content
            try:
                quiz = json.loads(content)
                return quiz
            except json.JSONDecodeError:
                return {"topic": topic, "questions": [], "total_questions": 0, "estimated_time_minutes": 0}
                
        except Exception as e:
            print(f"Error generating quiz: {e}")
            return {"topic": topic, "questions": [], "total_questions": 0, "estimated_time_minutes": 0}
    
    def _parse_ideas_from_text(self, text: str) -> List[Dict[str, Any]]:
        """Fallback method to parse ideas from text response"""
        # This is a simplified parser - in production, you'd want more robust parsing
        ideas = []
        lines = text.split('\n')
        current_idea = {}
        
        for line in lines:
            line = line.strip()
            if line.startswith('Title:') or line.startswith('1.') or line.startswith('2.') or line.startswith('3.'):
                if current_idea:
                    ideas.append(current_idea)
                current_idea = {'title': line.split(':', 1)[1].strip() if ':' in line else line[3:].strip()}
            elif line.startswith('Description:'):
                current_idea['description'] = line.split(':', 1)[1].strip()
            elif line.startswith('Tags:'):
                tags_text = line.split(':', 1)[1].strip()
                current_idea['tags'] = [tag.strip() for tag in tags_text.split(',')]
        
        if current_idea:
            ideas.append(current_idea)
        
        return ideas 