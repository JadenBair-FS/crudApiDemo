const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Student = require("../models/Student");

const getStudent = async (req, res, next) => {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student === null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
};

//GET ALL
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET ONE
router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

// POST CREATE
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH UPDATE
router.patch("/:id", getStudent, async (req, res) => {
    if (req.body.name != null) {
        res.student.name = req.body.name;
    }
    if (req.body.class != null) {
        res.student.class = req.body.class;
    }
    try {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.deleteOne();
    res.json({ message: "Deleted student" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


