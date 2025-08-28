from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
import os
from models.school_models import Student, Teacher, Course, Grade, ValidationError

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['ITEMS_PER_PAGE'] = 6

# Home page with dashboard
@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get counts for dashboard
    cur.execute("SELECT COUNT(*) FROM students")
    student_count = cur.fetchone()['count']
    
    cur.execute("SELECT COUNT(*) FROM teachers")
    teacher_count = cur.fetchone()['count']
    
    cur.execute("SELECT COUNT(*) FROM courses")
    course_count = cur.fetchone()['count']
    
    # Get recent enrollments
    cur.execute("""
        SELECT s.first_name, s.last_name, c.title, e.enrollment_date 
        FROM enrollments e
        JOIN students s ON e.student_id = s.id
        JOIN courses c ON e.course_id = c.id
        ORDER BY e.enrollment_date DESC
        LIMIT 5
    """)
    recent_enrollments = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return render_template('index.html', 
                         student_count=student_count,
                         teacher_count=teacher_count,
                         course_count=course_count,
                         recent_enrollments=recent_enrollments)

# Students routes
@app.route('/students')
def students():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    items_per_page = app.config['ITEMS_PER_PAGE']
    offset = (page - 1) * items_per_page
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get total count
    if search:
        cur.execute("""
            SELECT COUNT(*) FROM students 
            WHERE first_name ILIKE %s OR last_name ILIKE %s OR email ILIKE %s
        """, (f'%{search}%', f'%{search}%', f'%{search}%'))
    else:
        cur.execute("SELECT COUNT(*) FROM students")
    
    total_count = cur.fetchone()['count']
    
    # Get paginated students
    if search:
        cur.execute("""
            SELECT * FROM students 
            WHERE first_name ILIKE %s OR last_name ILIKE %s OR email ILIKE %s
            ORDER BY id LIMIT %s OFFSET %s
        """, (f'%{search}%', f'%{search}%', f'%{search}%', items_per_page, offset))
    else:
        cur.execute("SELECT * FROM students ORDER BY id LIMIT %s OFFSET %s", 
                   (items_per_page, offset))
    
    students = cur.fetchall()
    total_pages = (total_count + items_per_page - 1) // items_per_page
    
    cur.close()
    conn.close()
    
    return render_template('students.html',
                         students=students,
                         page=page,
                         total_pages=total_pages,
                         total_count=total_count,
                         search=search,
                         items_per_page=items_per_page)  # Pass items_per_page to template

@app.route('/students/create', methods=['GET', 'POST'])
def create_student():
    if request.method == 'POST':
        try:
            student = Student(
                first_name=request.form['first_name'],
                last_name=request.form['last_name'],
                email=request.form['email'],
                phone=request.form.get('phone'),
                enrollment_date=request.form.get('enrollment_date'),
                major=request.form.get('major')
            )
            student.validate()
            student.save()
            flash('Student created successfully!', 'success')
            return redirect(url_for('students'))
        except ValidationError as e:
            return render_template('create_student.html', errors=e.errors)
    
    return render_template('create_student.html')

@app.route('/students/<int:id>')
def student_details(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get student details
    cur.execute("SELECT * FROM students WHERE id = %s", (id,))
    student = cur.fetchone()
    
    # Get student enrollments
    cur.execute("""
        SELECT c.id as course_id, c.title as course_title, c.code as course_code, 
               t.id as teacher_id, CONCAT(t.first_name, ' ', t.last_name) as teacher_name,
               e.enrollment_date
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        LEFT JOIN teachers t ON c.teacher_id = t.id
        WHERE e.student_id = %s
    """, (id,))
    enrollments = cur.fetchall()
    
    # Get student grades
    cur.execute("""
        SELECT c.title as course_title, g.grade, g.semester, g.year
        FROM grades g
        JOIN courses c ON g.course_id = c.id
        WHERE g.student_id = %s
    """, (id,))
    grades = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return render_template('details_student.html', 
                          student=student, 
                          enrollments=enrollments,
                          grades=grades)

@app.route('/students/<int:id>/edit', methods=['GET', 'POST'])
def edit_student(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if request.method == 'POST':
        try:
            student = Student(
                id=id,
                first_name=request.form['first_name'],
                last_name=request.form['last_name'],
                email=request.form['email'],
                phone=request.form.get('phone'),
                enrollment_date=request.form.get('enrollment_date'),
                major=request.form.get('major')
            )
            student.validate()
            student.save()
            flash('Student updated successfully!', 'success')
            return redirect(url_for('student_details', id=id))
        except ValidationError as e:
            cur.execute("SELECT * FROM students WHERE id = %s", (id,))
            student = cur.fetchone()
            cur.close()
            conn.close()
            return render_template('edit_student.html', student=student, errors=e.errors)
    
    cur.execute("SELECT * FROM students WHERE id = %s", (id,))
    student = cur.fetchone()
    cur.close()
    conn.close()
    
    return render_template('edit_student.html', student=student)

@app.route('/students/<int:id>/delete')
def delete_student(id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM students WHERE id = %s", (id,))
        conn.commit()
        flash('Student deleted successfully!', 'success')
    except Exception as e:
        conn.rollback()
        flash('Error deleting student: ' + str(e), 'error')
    finally:
        cur.close()
        conn.close()
    
    return redirect(url_for('students'))

# Teachers routes (similar pattern to students)
@app.route('/teachers')
def teachers():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    items_per_page = app.config['ITEMS_PER_PAGE']
    offset = (page - 1) * items_per_page
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # First get the count
    if search:
        cur.execute("""
            SELECT COUNT(*) FROM teachers 
            WHERE first_name ILIKE %s OR last_name ILIKE %s OR email ILIKE %s
        """, (f'%{search}%', f'%{search}%', f'%{search}%'))
    else:
        cur.execute("SELECT COUNT(*) FROM teachers")
    
    total_count = cur.fetchone()['count']
    
    # Then get the teachers for current page
    if search:
        cur.execute("""
            SELECT * FROM teachers 
            WHERE first_name ILIKE %s OR last_name ILIKE %s OR email ILIKE %s
            ORDER BY id LIMIT %s OFFSET %s
        """, (f'%{search}%', f'%{search}%', f'%{search}%', items_per_page, offset))
    else:
        cur.execute("SELECT * FROM teachers ORDER BY id LIMIT %s OFFSET %s", 
                   (items_per_page, offset))
    
    teachers = cur.fetchall()
    total_pages = (total_count + items_per_page - 1) // items_per_page
    
    cur.close()
    conn.close()
    
    return render_template('teachers.html', 
                         teachers=teachers, 
                         page=page, 
                         total_pages=total_pages,
                         search=search,
                         items_per_page=items_per_page)  # Pass items_per_page to template

@app.route('/teachers/create', methods=['GET', 'POST'])
def create_teacher():
    if request.method == 'POST':
        try:
            teacher = Teacher(
                first_name=request.form['first_name'],
                last_name=request.form['last_name'],
                email=request.form['email'],
                phone=request.form.get('phone'),
                hire_date=request.form.get('hire_date'),
                specialty=request.form.get('specialty')
            )
            teacher.validate()
            teacher.save()
            flash('Teacher created successfully!', 'success')
            return redirect(url_for('teachers'))
        except ValidationError as e:
            return render_template('create_teacher.html', errors=e.errors)
    
    return render_template('create_teacher.html')

@app.route('/teachers/<int:id>')
def teacher_details(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get teacher details
    cur.execute("SELECT * FROM teachers WHERE id = %s", (id,))
    teacher = cur.fetchone()
    
    # Get courses taught by this teacher
    cur.execute("""
        SELECT c.*, COUNT(e.student_id) as enrollment_count
        FROM courses c
        LEFT JOIN enrollments e ON c.id = e.course_id
        WHERE c.teacher_id = %s
        GROUP BY c.id
    """, (id,))
    courses = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return render_template('details_teacher.html', 
                          teacher=teacher, 
                          courses=courses)

@app.route('/teachers/<int:id>/edit', methods=['GET', 'POST'])
def edit_teacher(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if request.method == 'POST':
        try:
            teacher = Teacher(
                id=id,
                first_name=request.form['first_name'],
                last_name=request.form['last_name'],
                email=request.form['email'],
                phone=request.form.get('phone'),
                hire_date=request.form.get('hire_date'),
                specialty=request.form.get('specialty')
            )
            teacher.validate()
            teacher.save()
            flash('Teacher updated successfully!', 'success')
            return redirect(url_for('teacher_details', id=id))
        except ValidationError as e:
            cur.execute("SELECT * FROM teachers WHERE id = %s", (id,))
            teacher = cur.fetchone()
            cur.close()
            conn.close()
            return render_template('edit_teacher.html', teacher=teacher, errors=e.errors)
    
    cur.execute("SELECT * FROM teachers WHERE id = %s", (id,))
    teacher = cur.fetchone()
    cur.close()
    conn.close()
    
    return render_template('edit_teacher.html', teacher=teacher)

@app.route('/teachers/<int:id>/delete')
def delete_teacher(id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM teachers WHERE id = %s", (id,))
        conn.commit()
        flash('Teacher deleted successfully!', 'success')
    except Exception as e:
        conn.rollback()
        flash('Error deleting teacher: ' + str(e), 'error')
    finally:
        cur.close()
        conn.close()
    
    return redirect(url_for('teachers'))

# Courses routes
@app.route('/courses')
def courses():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    items_per_page = app.config['ITEMS_PER_PAGE']
    offset = (page - 1) * items_per_page
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get total count
    if search:
        count_query = """
        SELECT COUNT(*) 
        FROM courses c 
        WHERE c.title ILIKE %s OR c.code ILIKE %s"""
        cur.execute(count_query, (f'%{search}%', f'%{search}%'))
    else:
        cur.execute("SELECT COUNT(*) FROM courses")
    
    total_count = cur.fetchone()['count']
    
    # Get paginated courses with teacher info
    if search:
        courses_query = """
        SELECT c.*, CONCAT(t.first_name, ' ', t.last_name) as teacher_name
        FROM courses c
        LEFT JOIN teachers t ON c.teacher_id = t.id
        WHERE c.title ILIKE %s OR c.code ILIKE %s
        ORDER BY c.id
        LIMIT %s OFFSET %s
        """
        cur.execute(courses_query, (f'%{search}%', f'%{search}%', items_per_page, offset))
    else:
        cur.execute("""
            SELECT c.*, CONCAT(t.first_name, ' ', t.last_name) as teacher_name
            FROM courses c
            LEFT JOIN teachers t ON c.teacher_id = t.id
            ORDER BY c.id
            LIMIT %s OFFSET %s
        """, (items_per_page, offset))
    
    courses = cur.fetchall()
    total_pages = (total_count + items_per_page - 1) // items_per_page
    
    cur.close()
    conn.close()
    
    return render_template('courses.html', 
                         courses=courses, 
                         page=page, 
                         total_pages=total_pages,
                         total_count=total_count,
                         search=search,
                         items_per_page=items_per_page)  # Pass items_per_page to template

@app.route('/courses/create', methods=['GET', 'POST'])
def create_course():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if request.method == 'POST':
        try:
            course = Course(
                title=request.form['title'],
                code=request.form['code'],
                description=request.form.get('description'),
                credits=request.form.get('credits'),
                teacher_id=request.form.get('teacher_id') or None
            )
            course.validate()
            course.save()
            flash('Course created successfully!', 'success')
            return redirect(url_for('courses'))
        except ValidationError as e:
            cur.execute("SELECT * FROM teachers")
            teachers = cur.fetchall()
            cur.close()
            conn.close()
            return render_template('create_course.html', teachers=teachers, errors=e.errors)
    
    cur.execute("SELECT * FROM teachers")
    teachers = cur.fetchall()
    cur.close()
    conn.close()
    
    return render_template('create_course.html', teachers=teachers)

@app.route('/courses/<int:id>')
def course_details(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get course details
    cur.execute("""
        SELECT c.*, CONCAT(t.first_name, ' ', t.last_name) as teacher_name
        FROM courses c
        LEFT JOIN teachers t ON c.teacher_id = t.id
        WHERE c.id = %s
    """, (id,))
    course = cur.fetchone()
    
    # Get students enrolled in this course
    cur.execute("""
        SELECT e.enrollment_date, 
               s.id as student_id, 
               CONCAT(s.first_name, ' ', s.last_name) as student_name
        FROM enrollments e
        JOIN students s ON e.student_id = s.id
        WHERE e.course_id = %s
    """, (id,))
    enrollments = cur.fetchall()
    
    # Get grades for this course
    cur.execute("""
        SELECT s.id as student_id, 
               CONCAT(s.first_name, ' ', s.last_name) as student_name,
               g.grade, g.semester, g.year
        FROM grades g
        JOIN students s ON g.student_id = s.id
        WHERE g.course_id = %s
    """, (id,))
    grades = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return render_template('details_course.html', 
                          course=course, 
                          enrollments=enrollments,
                          grades=grades)

@app.route('/courses/<int:id>/edit', methods=['GET', 'POST'])
def edit_course(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if request.method == 'POST':
        try:
            course = Course(
                id=id,
                title=request.form['title'],
                code=request.form['code'],
                description=request.form.get('description'),
                credits=request.form.get('credits'),
                teacher_id=request.form.get('teacher_id') or None
            )
            course.validate()
            course.save()
            flash('Course updated successfully!', 'success')
            return redirect(url_for('course_details', id=id))
        except ValidationError as e:
            cur.execute("SELECT * FROM courses WHERE id = %s", (id,))
            course = cur.fetchone()
            cur.execute("SELECT * FROM teachers")
            teachers = cur.fetchall()
            cur.close()
            conn.close()
            return render_template('edit_course.html', course=course, teachers=teachers, errors=e.errors)
    
    cur.execute("SELECT * FROM courses WHERE id = %s", (id,))
    course = cur.fetchone()
    cur.execute("SELECT * FROM teachers")
    teachers = cur.fetchall()
    cur.close()
    conn.close()
    
    return render_template('edit_course.html', course=course, teachers=teachers)

@app.route('/courses/<int:id>/delete')
def delete_course(id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM courses WHERE id = %s", (id,))
        conn.commit()
        flash('Course deleted successfully!', 'success')
    except Exception as e:
        conn.rollback()
        flash('Error deleting course: ' + str(e), 'error')
    finally:
        cur.close()
        conn.close()
    
    return redirect(url_for('courses'))

# Grades routes
@app.route('/grades')
def grades():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    items_per_page = app.config['ITEMS_PER_PAGE']
    offset = (page - 1) * items_per_page
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # First get the count
    if search:
        cur.execute("""
            SELECT COUNT(*) 
            FROM grades g
            JOIN students s ON g.student_id = s.id
            JOIN courses c ON g.course_id = c.id
            WHERE s.first_name ILIKE %s OR s.last_name ILIKE %s OR c.title ILIKE %s
        """, (f'%{search}%', f'%{search}%', f'%{search}%'))
    else:
        cur.execute("SELECT COUNT(*) FROM grades")
    
    total_count = cur.fetchone()['count']
    
    # Then get the grades for current page
    if search:
        cur.execute("""
            SELECT g.*, 
                   CONCAT(s.first_name, ' ', s.last_name) as student_name,
                   c.title as course_title
            FROM grades g
            JOIN students s ON g.student_id = s.id
            JOIN courses c ON g.course_id = c.id
            WHERE s.first_name ILIKE %s OR s.last_name ILIKE %s OR c.title ILIKE %s
            ORDER BY g.id
            LIMIT %s OFFSET %s
        """, (f'%{search}%', f'%{search}%', f'%{search}%', items_per_page, offset))
    else:
        cur.execute("""
            SELECT g.*, 
                   CONCAT(s.first_name, ' ', s.last_name) as student_name,
                   c.title as course_title
            FROM grades g
            JOIN students s ON g.student_id = s.id
            JOIN courses c ON g.course_id = c.id
            ORDER BY g.id
            LIMIT %s OFFSET %s
        """, (items_per_page, offset))
    
    grades = cur.fetchall()
    total_pages = (total_count + items_per_page - 1) // items_per_page
    
    cur.close()
    conn.close()
    
    return render_template('grades.html', 
                         grades=grades, 
                         page=page, 
                         total_pages=total_pages,
                         total_count=total_count,
                         search=search,
                         items_per_page=items_per_page)  # Pass items_per_page to template

@app.route('/grades/create', methods=['GET', 'POST'])
def create_grade():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if request.method == 'POST':
        try:
            grade = Grade(
                student_id=request.form['student_id'],
                course_id=request.form['course_id'],
                grade=request.form['grade'],
                semester=request.form['semester'],
                year=request.form['year']
            )
            grade.validate()
            grade.save()
            flash('Grade created successfully!', 'success')
            return redirect(url_for('grades'))
        except ValidationError as e:
            cur.execute("SELECT * FROM students")
            students = cur.fetchall()
            cur.execute("SELECT * FROM courses")
            courses = cur.fetchall()
            cur.close()
            conn.close()
            return render_template('create_grade.html', students=students, courses=courses, errors=e.errors, current_year=datetime.now().year)
    
    cur.execute("SELECT * FROM students")
    students = cur.fetchall()
    cur.execute("SELECT * FROM courses")
    courses = cur.fetchall()
    cur.close()
    conn.close()
    
    return render_template('create_grade.html', students=students, courses=courses, current_year=datetime.now().year)

@app.route('/grades/<int:id>/edit', methods=['GET', 'POST'])
def edit_grade(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if request.method == 'POST':
        try:
            grade = Grade(
                id=id,
                student_id=request.form['student_id'],
                course_id=request.form['course_id'],
                grade=request.form['grade'],
                semester=request.form['semester'],
                year=request.form['year']
            )
            grade.validate()
            grade.save()
            flash('Grade updated successfully!', 'success')
            return redirect(url_for('grades'))
        except ValidationError as e:
            cur.execute("SELECT * FROM grades WHERE id = %s", (id,))
            grade = cur.fetchone()
            cur.execute("SELECT * FROM students")
            students = cur.fetchall()
            cur.execute("SELECT * FROM courses")
            courses = cur.fetchall()
            cur.close()
            conn.close()
            return render_template('edit_grade.html', grade=grade, students=students, courses=courses, errors=e.errors)
    
    cur.execute("SELECT * FROM grades WHERE id = %s", (id,))
    grade = cur.fetchone()
    cur.execute("SELECT * FROM students")
    students = cur.fetchall()
    cur.execute("SELECT * FROM courses")
    courses = cur.fetchall()
    cur.close()
    conn.close()
    
    return render_template('edit_grade.html', grade=grade, students=students, courses=courses)

@app.route('/grades/<int:id>/delete')
def delete_grade(id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM grades WHERE id = %s", (id,))
        conn.commit()
        flash('Grade deleted successfully!', 'success')
    except Exception as e:
        conn.rollback()
        flash('Error deleting grade: ' + str(e), 'error')
    finally:
        cur.close()
        conn.close()
    
    return redirect(url_for('grades'))

# Statistics page
@app.route('/stats')
def stats():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        # Course enrollment statistics
        cur.execute("""
            SELECT c.title, COUNT(e.student_id) as enrollment_count
            FROM courses c
            LEFT JOIN enrollments e ON c.id = e.course_id
            GROUP BY c.id, c.title
            ORDER BY enrollment_count DESC
        """)
        enrollment_stats = cur.fetchall()
        
        # Grade distribution
        cur.execute("""
            WITH grade_ranges AS (
                SELECT 
                    CASE 
                        WHEN grade >= 16 THEN 'Très Bien (16-20)'
                        WHEN grade >= 14 THEN 'Bien (14-15.9)'
                        WHEN grade >= 12 THEN 'Assez Bien (12-13.9)'
                        WHEN grade >= 10 THEN 'Passable (10-11.9)'
                        ELSE 'Insuffisant (0-9.9)'
                    END as grade_label,
                    grade
                FROM grades
                WHERE grade IS NOT NULL
            )
            SELECT grade_label, COUNT(*) as count
            FROM grade_ranges
            GROUP BY grade_label
            ORDER BY 
                CASE grade_label
                    WHEN 'Très Bien (16-20)' THEN 1
                    WHEN 'Bien (14-15.9)' THEN 2
                    WHEN 'Assez Bien (12-13.9)' THEN 3
                    WHEN 'Passable (10-11.9)' THEN 4
                    ELSE 5
                END
        """)
        grade_distribution = cur.fetchall()

        # Average grade
        cur.execute("""
            SELECT ROUND(AVG(grade), 2) as avg_grade 
            FROM grades 
            WHERE grade IS NOT NULL
        """)
        avg_grade = cur.fetchone()['avg_grade'] or 0
        
        # Students per major
        cur.execute("""
            SELECT major, COUNT(*) as count
            FROM students
            WHERE major IS NOT NULL AND major != ''
            GROUP BY major
            ORDER BY count DESC
        """)
        major_stats = cur.fetchall()

        return render_template('stats.html',
                            enrollment_stats=enrollment_stats,
                            grade_distribution=grade_distribution,
                            major_stats=major_stats,
                            avg_grade=avg_grade)
    finally:
        cur.close()
        conn.close()
# Database connection function
def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        database=os.environ.get('DB_NAME', 'school'),
        user=os.environ.get('DB_USER', 'postgres'),
        password=os.environ.get('DB_PASSWORD', 'root'),
        port=os.environ.get('DB_PORT', '5432')
    )
    return conn    

if __name__ == '__main__':
    app.run(debug=True,port=5001)