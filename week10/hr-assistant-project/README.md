# HR Agent - Candidate Search & Outreach Assistant

A chat-based assistant for recruiters to search candidates, manage shortlists, draft outreach emails with HTML previews, and view analytics.

## Features

- **Candidate Search**: Natural language search with intelligent scoring
- **Shortlist Management**: Save and organize candidate shortlists
- **Email Drafting**: Generate personalized outreach emails with HTML previews
- **Email Editing**: Modify subject lines and closing statements
- **Analytics Dashboard**: View pipeline statistics and top skills

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- No external dependencies required (uses only Python standard library)

### Running the Application

1. Navigate to the project directory:
```bash
cd /path/to/hr-agent
```

2. Run the application:
```bash
python hr_agent.py
```

## Usage

### Available Commands

1. **Search Candidates**
   - Format: `Find [number] [skills] [role] in [location], [experience range], [availability]`
   - Example: `Find top 5 React interns in Casablanca, 0-2 years, available this month`

2. **Save Shortlist**
   - Format: `Save #[num] #[num] ... as [shortlist-name]`
   - Example: `Save #1 #3 #4 as FE-Intern-A`

3. **Draft Email**
   - Format: `Draft email for [shortlist-name] using job [job-title] in [tone] tone`
   - Example: `Draft an outreach email for FE-Intern-A using job Frontend Intern in friendly tone`

4. **Edit Email**
   - Format: `Change the subject to [new-subject]` or `Edit closing to [new-closing]`
   - Example: `Change the subject to Quick chat about a Frontend Intern role?`

5. **Show Analytics**
   - Format: `Show analytics` or `Analytics`
   - Example: `Show analytics`

6. **Exit**
   - Type: `quit`, `exit`, or `q`

## Example Workflow

Here are the 5 seed prompts to test all functionality:

### 1. Search for Candidates
```
> Find top 5 React interns in Casablanca, 0-2 years, available this month
```

Expected Output:
- List of top 5 matching candidates
- Each with score and matching reason
- Skills, experience, location, and availability details

### 2. Save Shortlist
```
> Save #1 #3 as FE-Intern-A
```

Expected Output:
- Confirmation message
- Shortlist saved to `data/shortlists.json`

### 3. Draft Email
```
> Draft an outreach email for FE-Intern-A using job Frontend Intern in friendly tone
```

Expected Output:
- Email subject
- Plain text email body
- Complete HTML preview with inline CSS
- Prompt to edit

### 4. Edit Email Subject
```
> Change the subject to Quick chat about a Frontend Intern role?
```

Expected Output:
- Updated email preview
- New subject line applied
- Regenerated HTML

### 5. View Analytics
```
> Show analytics
```

Expected Output:
- Pipeline counts by stage (SOURCED, SCREEN, INTERVIEW)
- Top 3 skills with frequency counts

## Data Structure

### Candidates (`data/candidates.json`)
```json
{
  "firstName": "Amina",
  "lastName": "El Idrissi",
  "email": "amina.elidrissi@example.com",
  "location": "Casablanca",
  "experienceYears": 1,
  "skills": ["React", "JavaScript", "HTML", "CSS"],
  "availabilityDate": "2025-11-01",
  "stage": "SOURCED",
  "notes": "Portfolio: Strong React projects"
}
```

### Jobs (`data/jobs.json`)
```json
{
  "title": "Frontend Intern",
  "location": "Casablanca",
  "skillsRequired": ["React", "JavaScript", "Git"],
  "jdSnippet": "We build modern UI with React..."
}
```

### Shortlists (`data/shortlists.json`)
Automatically managed by the application.

## Scoring Algorithm

Candidates are scored based on:
- **+2 points** per required skill match
- **+1 point** for exact location match
- **+1 point** if experience within range (±1 year tolerance)
- **+1 point** if available within specified window (45 days)

## HTML Email Template

Generated emails include:
- Professional styling with inline CSS
- Responsive design (max-width: 600px)
- Color scheme: Blue headers (#0066cc)
- Clean typography (Arial, sans-serif)
- Proper email structure with header, body, and footer

## File Structure

```
hr-agent/
├── hr_agent.py          # Main application
├── README.md            # This file
└── data/
    ├── candidates.json  # 12 candidate records
    ├── jobs.json        # 3 job postings
    └── shortlists.json  # Saved shortlists (auto-managed)
```

## Key Functions

1. **`parse_query(text)`** - Extracts structured filters from natural language
2. **`search_candidates(filters)`** - Scores and ranks candidates
3. **`save_shortlist(name, indices)`** - Persists shortlist to JSON
4. **`draft_email(recipients, job_title, tone)`** - Generates email content
5. **`html_template(email)`** - Converts email to HTML with CSS
6. **`analytics_summary()`** - Computes pipeline and skill statistics

## Advanced Features

- **Intent Classification**: Automatically determines user intent (search, save, email, analytics, edit)
- **Entity Extraction**: Parses natural language for skills, locations, experience ranges, etc.
- **Smart Scoring**: Ranks candidates by relevance with detailed explanations
- **Email Customization**: Multiple tones (friendly, professional, casual)
- **In-Memory State**: Maintains last search results and current email for seamless editing

## Limitations

- CLI-based interface (no GUI)
- Single-user session (no persistent authentication)
- In-memory processing (no database backend)
- Basic natural language understanding (keyword-based)

## Future Enhancements

- Web-based UI with React
- Integration with email service providers (Gmail, Outlook)
- Advanced NLP for better query understanding
- Candidate tracking and interview scheduling
- Bulk email sending with personalization
- Export to CSV/PDF reports

## Troubleshooting

**Issue**: "No module named 'json'"
- **Solution**: Ensure you're using Python 3.7+

**Issue**: "FileNotFoundError: data/candidates.json"
- **Solution**: Ensure the `data/` directory exists with all JSON files

**Issue**: Candidates not appearing in search
- **Solution**: Check that your query includes specific keywords (location, skills, etc.)

## License

This project is provided as-is for educational and recruitment purposes.

## Contact

For questions or improvements, please reach out to the development team.

---

**Note**: This is a demonstration project. In production, you would integrate with:
- Real candidate databases (ATS systems)
- Email service providers
- Authentication systems
- Cloud storage for data persistence
