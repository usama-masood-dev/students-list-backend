import Student from "../models/studentModel.js";

// Get all students
export const getStudents = async (req, res) => {
  try {
    console.log("testing");
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.log("error 12345", error);
    res.status(500).json({ error: error.message });
  }
};

// Get Single Student
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create new Student
export const addStudent = async (req, res) => {
  try {
    const { fullName, fatherName, contactNumber, course } = req.body;
    const newStudent = new Student({
      fullName,
      fatherName,
      contactNumber,
      course,
    });
    await newStudent.save();
    res.status(201).json({ newStudent: newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const { fullName, fatherName, contactNumber, course } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { fullName, fatherName, contactNumber, course },
      { new: true }
    );

    res
      .status(401)
      .json({ message: "Student updated", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
