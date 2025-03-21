import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required!"],
    trim: true,
  },
  fatherName: {
    type: String,
    required: [true, "Father Name is required!"],
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: [true, "Contact Number is required!"],
    trim: true,
    match: [/^\d{10,15}$/, "Invalid Contact Number format"],
  },
  course: {
    type: String,
    enum: {
      values: [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "UI UX Design",
      ],
      message:
        "Course must be one of: Web Development, Data Science, Machine Learning, UI UX Design",
    },
    required: [true, "Course is required!"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Number, default: () => Math.floor(Date.now() / 1000) },
  updatedAt: { type: Number, default: () => Math.floor(Date.now() / 1000) },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
