const mongoose = require("mongoose");

const VaultSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    extensions: {
      type: [String],
      required: [true, "Lista de extensiones es requerida"],
    },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const Vault = mongoose.model("Vault", VaultSchema);

module.exports = Vault;