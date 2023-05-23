const express = require("express");
require("dotenv").config();
require("./db/conn");
const Students = require("./model/Student");
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());

//Create a new Student data
app.post("/students", async (req, res) => {
  try {
    const user = await Students(req.body);
    user
      .save()
      .then(() => {
        res.status(201).send({ message: `${user.name} added successfully` });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get all the students data
app.get("/students", async (req, res) => {
  try {
    const user = await Students.find();
    if (!user) {
      res.status(404).send({ message: "Student NOT Found" });
    } else res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get a Student data by his/her id
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await Students.findById(_id);
    if (!user) res.status(404).send({ message: "Student NOT Found" });
    else res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Update a Student data by his/her id
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await Students.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) res.status(404).send({ message: "Student NOT Found" });
    else
      res
        .status(200)
        .send({ message: `${user.name} data updated successfully` });
  } catch (e) {
    res.status(500).send(e);
  }
});

//Delete a Student data by his/her id
app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await Students.findByIdAndDelete(_id);
    if (!user) res.status(404).send({ message: "Student NOT Found" });
    else res.status(200).send({ message: "Student Data Deleted SuccessFully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`APP IS LISTENING ON ${PORT}`);
});
