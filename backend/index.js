const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const Schema = mongoose.Schema;

const Form = new Schema({
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  contno: { type: String, required: true },
  message: { type: String, required: true },
});

const FormData = mongoose.model("Form", Form);

const db =
  "mongodb+srv://admin:" +
  process.env.MONGP +
  "@memories.3ypawsz.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.post("/api/user", (req, res) => {
  console.log(req.body);

  let dataObj = new FormData(req.body);
  dataObj.save().then(res.sendFile(path.join(__dirname, "/sendtable.html")));
});

app.get("/api/data", (req, res) => {
  FormData.find({}).then((Fdata) => res.send(Fdata));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port port ${port}🔥`));
