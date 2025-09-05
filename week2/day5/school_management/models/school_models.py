import re
from datetime import datetime
from database import get_db_connection

class ValidationError(Exception):
    """Custom exception for validation errors"""
    def __init__(self, message, errors=None):
        super().__init__(message)
        self.errors = errors or {}

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        raise ValidationError("Invalid email format")
    return email

def validate_grade(grade):
    """Validate grade is between 0 and 20 (French/Moroccan system)"""
    grade = float(grade)
    if grade < 0 or grade > 20:
        raise ValidationError("Grade must be between 0 and 20")
    return round(grade, 2)

def validate_name(name, field_name):
    """Validate name fields"""
    if not name or not name.strip():
        raise ValidationError(f"{field_name} is required")
    if len(name) > 50:
        raise ValidationError(f"{field_name} must be less than 50 characters")
    return name.strip()

def validate_course_code(code):
    """Validate course code format"""
    if not code or not code.strip():
        raise ValidationError("Course code is required")
    if len(code) > 20:
        raise ValidationError("Course code must be less than 20 characters")
    return code.strip().upper()

def validate_phone(phone):
    """Validate phone number format"""
    if phone and phone.strip():
        # Basic phone validation - just check if it contains digits
        if not any(char.isdigit() for char in phone):
            raise ValidationError("Phone number must contain digits")
    return phone.strip() if phone else None

class Student:
    """Student model"""
    def __init__(self, id=None, first_name=None, last_name=None, email=None, 
                 phone=None, enrollment_date=None, major=None):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.enrollment_date = enrollment_date
        self.major = major
    
    def validate(self):
        """Validate student data"""
        errors = {}
        
        try:
            self.first_name = validate_name(self.first_name, "First name")
        except ValidationError as e:
            errors['first_name'] = str(e)
        
        try:
            self.last_name = validate_name(self.last_name, "Last name")
        except ValidationError as e:
            errors['last_name'] = str(e)
        
        try:
            self.email = validate_email(self.email)
        except ValidationError as e:
            errors['email'] = str(e)
        
        try:
            self.phone = validate_phone(self.phone)
        except ValidationError as e:
            errors['phone'] = str(e)
        
        if errors:
            raise ValidationError("Student validation failed", errors)
        
        return self
    
    def save(self):
        """Save student to database"""
        conn = get_db_connection()
        cur = conn.cursor()
        
        if self.id:
            # Update existing student
            cur.execute("""
                UPDATE students 
                SET first_name = %s, last_name = %s, email = %s, 
                    phone = %s, enrollment_date = %s, major = %s
                WHERE id = %s
            """, (self.first_name, self.last_name, self.email, self.phone, 
                  self.enrollment_date, self.major, self.id))
        else:
            # Insert new student
            cur.execute("""
                INSERT INTO students (first_name, last_name, email, phone, enrollment_date, major)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (self.first_name, self.last_name, self.email, self.phone, 
                  self.enrollment_date, self.major))
            self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self

class Teacher:
    """Teacher model"""
    def __init__(self, id=None, first_name=None, last_name=None, email=None, 
                 phone=None, hire_date=None, specialty=None):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.hire_date = hire_date
        self.specialty = specialty
    
    def validate(self):
        """Validate teacher data"""
        errors = {}
        
        try:
            self.first_name = validate_name(self.first_name, "First name")
        except ValidationError as e:
            errors['first_name'] = str(e)
        
        try:
            self.last_name = validate_name(self.last_name, "Last name")
        except ValidationError as e:
            errors['last_name'] = str(e)
        
        try:
            self.email = validate_email(self.email)
        except ValidationError as e:
            errors['email'] = str(e)
        
        try:
            self.phone = validate_phone(self.phone)
        except ValidationError as e:
            errors['phone'] = str(e)
        
        if errors:
            raise ValidationError("Teacher validation failed", errors)
        
        return self
    
    def save(self):
        """Save teacher to database"""
        conn = get_db_connection()
        cur = conn.cursor()
        
        if self.id:
            # Update existing teacher
            cur.execute("""
                UPDATE teachers 
                SET first_name = %s, last_name = %s, email = %s, 
                    phone = %s, hire_date = %s, specialty = %s
                WHERE id = %s
            """, (self.first_name, self.last_name, self.email, self.phone, 
                  self.hire_date, self.specialty, self.id))
        else:
            # Insert new teacher
            cur.execute("""
                INSERT INTO teachers (first_name, last_name, email, phone, hire_date, specialty)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (self.first_name, self.last_name, self.email, self.phone, 
                  self.hire_date, self.specialty))
            self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self

class Course:
    """Course model"""
    def __init__(self, id=None, title=None, code=None, description=None, 
                 credits=None, teacher_id=None):
        self.id = id
        self.title = title
        self.code = code
        self.description = description
        self.credits = credits
        self.teacher_id = teacher_id
    
    def validate(self):
        """Validate course data"""
        errors = {}
        
        if not self.title or not self.title.strip():
            errors['title'] = "Course title is required"
        elif len(self.title) > 100:
            errors['title'] = "Course title must be less than 100 characters"
        else:
            self.title = self.title.strip()
        
        try:
            self.code = validate_course_code(self.code)
        except ValidationError as e:
            errors['code'] = str(e)
        
        if self.description and len(self.description) > 500:
            errors['description'] = "Description must be less than 500 characters"
        
        if not self.credits:
            self.credits = 3
        else:
            try:
                self.credits = int(self.credits)
                if self.credits < 1 or self.credits > 6:
                    errors['credits'] = "Credits must be between 1 and 6"
            except ValueError:
                errors['credits'] = "Credits must be a number"
        
        if errors:
            raise ValidationError("Course validation failed", errors)
        
        return self
    
    def save(self):
        """Save course to database"""
        conn = get_db_connection()
        cur = conn.cursor()
        
        if self.id:
            # Update existing course
            cur.execute("""
                UPDATE courses 
                SET title = %s, code = %s, description = %s, credits = %s, teacher_id = %s
                WHERE id = %s
            """, (self.title, self.code, self.description, self.credits, self.teacher_id, self.id))
        else:
            # Insert new course
            cur.execute("""
                INSERT INTO courses (title, code, description, credits, teacher_id)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            """, (self.title, self.code, self.description, self.credits, self.teacher_id))
            self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self

class Grade:
    """Grade model"""
    def __init__(self, id=None, student_id=None, course_id=None, grade=None, 
                 semester=None, year=None):
        self.id = id
        self.student_id = student_id
        self.course_id = course_id
        self.grade = grade
        self.semester = semester
        self.year = year
    
    def validate(self):
        """Validate grade data"""
        errors = {}
        
        if not self.student_id:
            errors['student_id'] = "Student is required"
        else:
            try:
                self.student_id = int(self.student_id)
            except ValueError:
                errors['student_id'] = "Invalid student"
        
        if not self.course_id:
            errors['course_id'] = "Course is required"
        else:
            try:
                self.course_id = int(self.course_id)
            except ValueError:
                errors['course_id'] = "Invalid course"
        
        try:
            self.grade = validate_grade(self.grade)
        except ValidationError as e:
            errors['grade'] = str(e)
        except (ValueError, TypeError):
            errors['grade'] = "Grade must be a number"
        
        if not self.semester or not self.semester.strip():
            errors['semester'] = "Semester is required"
        else:
            self.semester = self.semester.strip()
        
        if not self.year:
            errors['year'] = "Year is required"
        else:
            try:
                self.year = int(self.year)
                current_year = datetime.now().year
                if self.year < 2000 or self.year > current_year + 5:
                    errors['year'] = f"Year must be between 2000 and {current_year + 5}"
            except ValueError:
                errors['year'] = "Year must be a number"
        
        if errors:
            raise ValidationError("Grade validation failed", errors)
        
        return self
    
    def save(self):
        """Save grade to database"""
        conn = get_db_connection()
        cur = conn.cursor()
        
        if self.id:
            # Update existing grade
            cur.execute("""
                UPDATE grades 
                SET student_id = %s, course_id = %s, grade = %s, semester = %s, year = %s
                WHERE id = %s
            """, (self.student_id, self.course_id, self.grade, self.semester, self.year, self.id))
        else:
            # Insert new grade
            cur.execute("""
                INSERT INTO grades (student_id, course_id, grade, semester, year)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            """, (self.student_id, self.course_id, self.grade, self.semester, self.year))
            self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self