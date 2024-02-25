require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Vault = require("./models/vault.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(1337, () => {
  console.log("Server running on port 1337");
});

app.get("/", (req, res) => {
  res.send("VSCode Vault!");
});

app.post("/api/vault", async (req, res) => {
  try {
    const vault = await Vault.create(req.body);
    res.status(200).send(vault);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/vault", async (req, res) => {
  try {
    const vaults = await Vault.find();
    res.status(200).send(vaults);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/vault/:id", async (req, res) => {
  try {
    const vault = await Vault.findById(req.params.id);
    res.status(200).send(vault);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// app.put("/api/vault/:id", async (req, res) => {
//   try {
//     const vault = await Vault.findByIdAndUpdate(req.params.id, req.body);
//     if (!vault) {
//       return res.status(404).send({ message: "Vault not found" });
//     }
//     const updatedVault = await Vault.findById(req.params.id);
//     res.status(200).json(updatedVault);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// app.delete("/api/vault/:id", async (req, res) => {
//   try {
//     const vault = await Vault.findByIdAndDelete(req.params.id);
//     if (!vault) {
//       return res.status(404).send({ message: "Vault not found" });
//     }
//     res.status(200).send({ message: "Vault deleted" });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
