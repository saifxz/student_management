const mongoose = require('mongoose');
const Student = require('./models/Student');
const Course = require('./models/Course');

// Replace with your MongoDB Atlas URI
const uri = 'mongodb+srv://saiffuddin90:1234@saifcluster.1rmiwbj.mongodb.net/?retryWrites=true&w=majority&appName=saifCluster';

mongoose.connect(uri)
  .then(() => console.log('MongoDB Atlas connected!'))
  .catch(err => console.error('Connection error:', err));


// Create Course
async function createCourse() {
  const course = new Course({
    courseName: "Database Systems",
    instructor: "Dr. Smith",
    credits: 3
  });
  await course.save();
  console.log('Course created:', course);
}

// Create Student
async function createStudent(courseId) {
  const student = new Student({
    name: "John Doe",
    email: "john2@example.com",
    age: 22,
    enrolledCourses: [courseId]
  });
  await student.save();
  console.log('Student created:', student);
}

// Fetch Students
async function getAllStudents() {
  const students = await Student.find();
  console.log('All students:', students);
}

// Fetch Students with Courses
async function getStudentsWithCourses() {
  const students = await Student.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'enrolledCourses',
        foreignField: '_id',
        as: 'courseDetails'
      }
    }
  ]);
  console.log('Students with courses:', students);
}

// Update Student Name
async function updateStudentName(studentId, newName) {
  await Student.findByIdAndUpdate(studentId, { name: newName });
  console.log('Student updated');
}

// Delete Student
async function deleteStudent(studentId) {
  await Student.findByIdAndDelete(studentId);
  console.log('Student deleted');
}

// Delete Course
async function deleteCourse(courseId) {
  await Course.findByIdAndDelete(courseId);
  console.log('Course deleted');
}

// Example Usage
async function run() {
  const newCourse = await createCourse();
//   await createCourse()
  await createStudent('680d493c554f3b30a59f2370');
  await getAllStudents();
  await getStudentsWithCourses();
  // await updateStudentName('student_id_here', 'New Name');
  // await deleteStudent('student_id_here');
}

run();
