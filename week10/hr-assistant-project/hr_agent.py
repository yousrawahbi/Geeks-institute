#!/usr/bin/env python3
"""
HR Agent - Candidate Search and Outreach Assistant
A chat-based assistant for recruiters to search candidates, manage shortlists, 
draft emails, and view analytics.
"""

import json
import re
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from collections import Counter


class HRAgent:
    def __init__(self):
        self.candidates = self.load_json('data/candidates.json')
        self.jobs = self.load_json('data/jobs.json')
        self.shortlists = self.load_json('data/shortlists.json')
        self.last_search_results = []
        self.current_email = None
        
    def load_json(self, filepath):
        """Load JSON data from file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            return {} if 'shortlists' in filepath else []
    
    def save_shortlists(self):
        """Save shortlists to file"""
        with open('data/shortlists.json', 'w', encoding='utf-8') as f:
            json.dump(self.shortlists, f, indent=2)
    
    def parse_query(self, text: str) -> Dict:
        """
        Parse natural language query into structured filters.
        
        Args:
            text: Natural language query string
            
        Returns:
            Dictionary with extracted filters: role, skills, location, 
            minExp, maxExp, availabilityWindowDays
        """
        text_lower = text.lower()
        filters = {}
        
        # Extract role/job title
        role_keywords = ['intern', 'developer', 'engineer', 'frontend', 'backend', 'full stack', 'fullstack']
        for keyword in role_keywords:
            if keyword in text_lower:
                filters['role'] = keyword
                break
        
        # Extract skills - common tech skills
        all_skills = set()
        for candidate in self.candidates:
            all_skills.update([s.lower() for s in candidate['skills']])
        
        filters['skills'] = []
        for skill in all_skills:
            if skill in text_lower:
                filters['skills'].append(skill.capitalize())
        
        # Extract location
        locations = ['casablanca', 'rabat', 'marrakech', 'tangier', 'fes']
        for loc in locations:
            if loc in text_lower:
                filters['location'] = loc.capitalize()
                break
        
        # Extract experience range
        exp_pattern = r'(\d+)[–-](\d+)\s*y(?:ear)?s?'
        exp_match = re.search(exp_pattern, text_lower)
        if exp_match:
            filters['minExp'] = int(exp_match.group(1))
            filters['maxExp'] = int(exp_match.group(2))
        else:
            # Try single value like "0 years", "2 years"
            single_exp = re.search(r'(\d+)\s*y(?:ear)?s?', text_lower)
            if single_exp:
                exp = int(single_exp.group(1))
                filters['minExp'] = max(0, exp - 1)
                filters['maxExp'] = exp + 1
        
        # Extract availability window
        if 'this month' in text_lower or 'available this month' in text_lower:
            filters['availabilityWindowDays'] = 45  # Within next 45 days
        elif 'available now' in text_lower or 'immediately' in text_lower:
            filters['availabilityWindowDays'] = 30
        
        return filters
    
    def search_candidates(self, filters: Dict, top_n: int = 5) -> List[Dict]:
        """
        Search candidates based on filters and return top matches with scores.
        
        Scoring:
        - +2 per required skill match
        - +1 if location exact match
        - +1 if experience within range (±1 year tolerance)
        - +1 if available within window
        
        Args:
            filters: Dictionary with search criteria
            top_n: Number of top candidates to return
            
        Returns:
            List of dictionaries with candidate, score, and reason
        """
        results = []
        today = datetime.now()
        
        for idx, candidate in enumerate(self.candidates):
            score = 0
            reasons = []
            
            # Skill matching (+2 per skill)
            if 'skills' in filters and filters['skills']:
                candidate_skills_lower = [s.lower() for s in candidate['skills']]
                matched_skills = []
                for skill in filters['skills']:
                    if skill.lower() in candidate_skills_lower:
                        matched_skills.append(skill)
                        score += 2
                
                if matched_skills:
                    reasons.append(f"{'+'.join(matched_skills)} match (+{len(matched_skills)*2})")
            
            # Location matching (+1)
            if 'location' in filters:
                if candidate['location'].lower() == filters['location'].lower():
                    score += 1
                    reasons.append(f"{candidate['location']} (+1)")
            
            # Experience matching (+1 with ±1 tolerance)
            if 'minExp' in filters and 'maxExp' in filters:
                exp = candidate['experienceYears']
                if filters['minExp'] - 1 <= exp <= filters['maxExp'] + 1:
                    score += 1
                    reasons.append(f"{exp}y fits (±1) (+1)")
            
            # Availability matching (+1 within 45 days)
            if 'availabilityWindowDays' in filters:
                avail_date = datetime.strptime(candidate['availabilityDate'], '%Y-%m-%d')
                days_diff = (avail_date - today).days
                if 0 <= days_diff <= filters['availabilityWindowDays']:
                    score += 1
                    reasons.append(f"Available in {days_diff}d (+1)")
            
            if score > 0:
                reason = ', '.join(reasons) + f" → score {score}"
                results.append({
                    'index': idx,
                    'candidate': candidate,
                    'score': score,
                    'reason': reason
                })
        
        # Sort by score descending and return top N
        results.sort(key=lambda x: x['score'], reverse=True)
        self.last_search_results = results[:top_n]
        return self.last_search_results
    
    def save_shortlist(self, name: str, candidate_indices: List[int]) -> str:
        """
        Save a shortlist of candidates.
        
        Args:
            name: Name for the shortlist
            candidate_indices: List of candidate indices (0-based)
            
        Returns:
            Success message
        """
        shortlist_data = []
        for idx in candidate_indices:
            if 0 <= idx < len(self.candidates):
                shortlist_data.append({
                    'index': idx,
                    'candidate': self.candidates[idx]
                })
        
        self.shortlists[name] = shortlist_data
        self.save_shortlists()
        
        return f"Shortlist '{name}' saved with {len(shortlist_data)} candidate(s)."
    
    def draft_email(self, recipients: str, job_title: str, tone: str = 'friendly') -> Dict[str, str]:
        """
        Draft an outreach email for candidates.
        
        Args:
            recipients: Shortlist name or 'last_search'
            job_title: Title of the job position
            tone: Email tone (friendly, professional, casual)
            
        Returns:
            Dictionary with subject, text (plain text body)
        """
        # Get job details
        job = next((j for j in self.jobs if j['title'].lower() == job_title.lower()), None)
        if not job:
            job = {'title': job_title, 'jdSnippet': 'Exciting opportunity to join our team.'}
        
        # Get recipients
        if recipients in self.shortlists:
            candidates = [item['candidate'] for item in self.shortlists[recipients]]
            is_bulk = len(candidates) > 1
        else:
            candidates = [result['candidate'] for result in self.last_search_results[:1]]
            is_bulk = False
        
        # Generate subject
        if tone == 'friendly':
            subject = f"Exciting {job['title']} opportunity at our company!"
        elif tone == 'professional':
            subject = f"Opportunity: {job['title']} Position"
        else:
            subject = f"Let's chat about a {job['title']} role"
        
        # Generate body
        if is_bulk:
            greeting = "Hi there,"
        else:
            greeting = f"Hi {candidates[0]['firstName']},"
        
        if tone == 'friendly':
            body = f"""{greeting}

I hope this message finds you well! I came across your profile and was impressed by your skills in {', '.join(candidates[0]['skills'][:3])}.

We have an exciting {job['title']} position opening at our company in {job.get('location', 'our office')}. {job.get('jdSnippet', '')}

I think your background could be a great fit for this role, and I'd love to chat more about it. Would you be available for a quick call this week?

Looking forward to connecting!

Best regards,
The Recruitment Team"""
        else:
            body = f"""{greeting}

I am reaching out regarding a {job['title']} opportunity at our organization in {job.get('location', 'our office')}.

{job.get('jdSnippet', '')}

Based on your experience with {', '.join(candidates[0]['skills'][:3])}, I believe you could be an excellent fit for this position.

Would you be available to discuss this opportunity further?

Best regards,
The Recruitment Team"""
        
        self.current_email = {'subject': subject, 'text': body, 'recipients': recipients, 'job_title': job_title, 'tone': tone}
        return self.current_email
    
    def html_template(self, email: Dict[str, str]) -> str:
        """
        Convert email to HTML with inline CSS.
        
        Args:
            email: Dictionary with subject and text
            
        Returns:
            HTML email string
        """
        # Convert plain text to HTML paragraphs
        paragraphs = email['text'].split('\n\n')
        html_body = ''.join([f'<p>{p.replace(chr(10), "<br>")}</p>' for p in paragraphs if p.strip()])
        
        html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{email['subject']}</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }}
        .email-container {{
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .header {{
            border-bottom: 3px solid #0066cc;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }}
        .subject {{
            font-size: 24px;
            font-weight: bold;
            color: #0066cc;
            margin: 0;
        }}
        .body p {{
            margin: 15px 0;
        }}
        .footer {{
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            font-size: 12px;
            color: #666;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 class="subject">{email['subject']}</h1>
        </div>
        <div class="body">
            {html_body}
        </div>
        <div class="footer">
            <p>This is an automated recruitment email. Please reply if you're interested!</p>
        </div>
    </div>
</body>
</html>
"""
        return html
    
    def analytics_summary(self) -> Dict:
        """
        Generate analytics summary of candidate pipeline.
        
        Returns:
            Dictionary with countByStage and topSkills
        """
        # Count by stage
        stages = [c['stage'] for c in self.candidates]
        count_by_stage = dict(Counter(stages))
        
        # Top skills
        all_skills = []
        for candidate in self.candidates:
            all_skills.extend(candidate['skills'])
        
        skill_counts = Counter(all_skills)
        top_skills = skill_counts.most_common(3)
        
        return {
            'countByStage': count_by_stage,
            'topSkills': top_skills
        }
    
    def classify_intent(self, user_input: str) -> str:
        """
        Classify user intent from input.
        
        Returns:
            One of: 'search', 'save', 'email', 'analytics', 'edit', 'unknown'
        """
        input_lower = user_input.lower()
        
        if any(word in input_lower for word in ['find', 'search', 'show me', 'top']):
            return 'search'
        elif any(word in input_lower for word in ['save', 'shortlist']):
            return 'save'
        elif any(word in input_lower for word in ['draft', 'email', 'outreach', 'message']):
            return 'email'
        elif any(word in input_lower for word in ['analytics', 'stats', 'statistics', 'pipeline']):
            return 'analytics'
        elif any(word in input_lower for word in ['edit', 'change', 'modify', 'update']):
            return 'edit'
        else:
            return 'unknown'
    
    def process_command(self, user_input: str) -> str:
        """
        Process user command and return response.
        
        Args:
            user_input: User's natural language command
            
        Returns:
            Response string
        """
        intent = self.classify_intent(user_input)
        
        if intent == 'search':
            # Parse query and search
            filters = self.parse_query(user_input)
            
            # Extract top_n if specified
            top_n = 5
            top_match = re.search(r'(?:top|find)\s+(\d+)', user_input.lower())
            if top_match:
                top_n = int(top_match.group(1))
            
            results = self.search_candidates(filters, top_n)
            
            if not results:
                return "No candidates found matching your criteria."
            
            response = f"\n{'='*70}\nFound {len(results)} candidate(s):\n{'='*70}\n\n"
            for i, result in enumerate(results, 1):
                c = result['candidate']
                response += f"#{i} | {c['firstName']} {c['lastName']}\n"
                response += f"    Email: {c['email']}\n"
                response += f"    Location: {c['location']} | Experience: {c['experienceYears']} years\n"
                response += f"    Skills: {', '.join(c['skills'])}\n"
                response += f"    Available: {c['availabilityDate']} | Stage: {c['stage']}\n"
                response += f"    Match: {result['reason']}\n"
                response += f"    Notes: {c['notes']}\n\n"
            
            return response
        
        elif intent == 'save':
            # Parse shortlist command: "Save #1 #3 #4 as 'name'"
            indices_match = re.findall(r'#(\d+)', user_input)
            name_match = re.search(r'as ["\']?([\w-]+)["\']?', user_input, re.IGNORECASE)
            
            if not indices_match or not name_match:
                return "Please specify candidate numbers (e.g., #1 #3) and a name (e.g., 'as FE-Intern-A')."
            
            # Convert to 0-based indices from last search results
            selected_indices = []
            for num in indices_match:
                result_idx = int(num) - 1
                if 0 <= result_idx < len(self.last_search_results):
                    selected_indices.append(self.last_search_results[result_idx]['index'])
            
            shortlist_name = name_match.group(1)
            message = self.save_shortlist(shortlist_name, selected_indices)
            
            return f"\n✓ {message}"
        
        elif intent == 'email':
            # Parse email command
            shortlist_match = re.search(r'for ["\']?([\w-]+)["\']?', user_input, re.IGNORECASE)
            job_match = re.search(r'using job ["\']?([^"\'\']+)["\']?', user_input, re.IGNORECASE)
            tone_match = re.search(r'(friendly|professional|casual) tone', user_input.lower())
            
            if not shortlist_match:
                return "Please specify a shortlist name (e.g., 'for FE-Intern-A')."
            
            shortlist_name = shortlist_match.group(1)
            job_title = job_match.group(1).strip() if job_match else "Frontend Intern"
            tone = tone_match.group(1) if tone_match else 'friendly'
            
            email = self.draft_email(shortlist_name, job_title, tone)
            html = self.html_template(email)
            
            response = f"\n{'='*70}\nEMAIL DRAFT\n{'='*70}\n\n"
            response += f"Subject: {email['subject']}\n\n"
            response += f"Plain Text:\n{'-'*70}\n{email['text']}\n{'-'*70}\n\n"
            response += f"HTML Preview:\n{'-'*70}\n{html}\n{'-'*70}\n\n"
            response += "Edit subject or closing? (Type 'Change the subject to ...' or 'Edit closing to ...')\n"
            
            return response
        
        elif intent == 'edit':
            if not self.current_email:
                return "No current email to edit. Please draft an email first."
            
            # Parse edit command
            if 'subject' in user_input.lower():
                subject_match = re.search(r'subject to ["\']?([^"\'\']+)["\']?', user_input, re.IGNORECASE)
                if subject_match:
                    self.current_email['subject'] = subject_match.group(1).strip()
            
            if 'closing' in user_input.lower():
                closing_match = re.search(r'closing to ["\']?([^"\'\']+)["\']?', user_input, re.IGNORECASE)
                if closing_match:
                    # Replace the closing in the email body
                    lines = self.current_email['text'].split('\n')
                    lines[-2] = closing_match.group(1).strip()
                    self.current_email['text'] = '\n'.join(lines)
            
            # Re-generate HTML
            html = self.html_template(self.current_email)
            
            response = f"\n{'='*70}\nUPDATED EMAIL PREVIEW\n{'='*70}\n\n"
            response += f"Subject: {self.current_email['subject']}\n\n"
            response += f"Plain Text:\n{'-'*70}\n{self.current_email['text']}\n{'-'*70}\n\n"
            response += f"HTML Preview:\n{'-'*70}\n{html}\n{'-'*70}\n"
            
            return response
        
        elif intent == 'analytics':
            analytics = self.analytics_summary()
            
            response = f"\n{'='*70}\nANALYTICS SUMMARY\n{'='*70}\n\n"
            response += "Pipeline by stage:\n"
            for stage, count in sorted(analytics['countByStage'].items()):
                response += f"  {stage}: {count}\n"
            
            response += "\nTop skills:\n"
            for skill, count in analytics['topSkills']:
                response += f"  {skill}: {count}\n"
            
            return response
        
        else:
            return "I didn't understand that. Try: 'Find...', 'Save...', 'Draft email...', or 'Show analytics'."


def main():
    """
    Main CLI loop for HR Agent.
    """
    print("\n" + "="*70)
    print("HR AGENT - Candidate Search & Outreach Assistant")
    print("="*70)
    print("\nCommands:")
    print("  - Find/Search candidates (e.g., 'Find top 5 React interns in Casablanca')")
    print("  - Save shortlist (e.g., 'Save #1 #3 as FE-Intern-A')")
    print("  - Draft email (e.g., 'Draft email for FE-Intern-A using job Frontend Intern')")
    print("  - Edit email (e.g., 'Change the subject to ...')")
    print("  - Show analytics (e.g., 'Show analytics')")
    print("  - Type 'quit' or 'exit' to end\n")
    
    agent = HRAgent()
    
    while True:
        try:
            user_input = input("\n> ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("\nGoodbye!\n")
                break
            
            if not user_input:
                continue
            
            response = agent.process_command(user_input)
            print(response)
            
        except KeyboardInterrupt:
            print("\n\nGoodbye!\n")
            break
        except Exception as e:
            print(f"\nError: {str(e)}\n")


if __name__ == "__main__":
    main()
