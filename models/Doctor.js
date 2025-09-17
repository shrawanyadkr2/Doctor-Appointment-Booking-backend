const { types } = require("joi");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "doctor",
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: String,
  address: String,
  imageUrl: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  availableSlots: [
    {
      date: String,
      time: String,
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = DoctorModel;
