const express = require("express");
const Medicines = require("../Models/Medicines");
const fs = require("fs");
const csv = require("csv-parser");
const crypto = require("crypto");

const router = express.Router();

// Add Medicines Via File
router.route("/uploadCSV").post(async (request, response) => {
  try {
    fs.createReadStream("medicine.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const medicine = new Medicines({
          name: row.c_name,
          batch: row.c_batch_no,
          expiry: row.d_expiry_date,
          qty: row.n_balance_qty,
          packing: row.c_packaging,
          id: row.c_unique_code,
          schema: row.c_schemes,
          mrp: row.n_mrp,
          manufacturer: row.c_manufacturer,
          hsn: row.hsn_code,
        });
        await medicine.save();
      });
    response.status(200).send("Success");
  } catch (error) {
    response.status(500).send({ message: "Server Error" });
  }
});

// searchMedicine
router.route("/searchMedicine").post(async (request, response) => {
  try {
    const { name } = request.body;
    const medicine = await Medicines.find({
      name: { $regex: `(\s+${name}|^${name})` },
    });
    response.status(200).send(medicine);
  } catch (error) {
    response.status(500).send({ message: "Server Error" });
  }
});

//getMedicineDetails
router.route("/getMedicineDetails").post(async (request, response) => {
  try {
    const { id } = request.body;
    const medicine = await Medicines.find({ id: id });
    response.status(200).send(medicine);
  } catch (error) {
    response.status(500).send({ message: "Server Error" });
  }
});

// Place Order
router.route("/placeorder").post(async (request, response) => {
  try {
    const { id, quantity, name } = request.body;
    const medicine = await Medicines.find({ id: id });
    if (!medicine) {
      return response.status(401).send({ message: "No Medicine Found" });
    }

    const orderId = crypto.randomBytes(16).toString("hex");
    response.status(200).send({
      name: name,
      orderId: orderId,
      subtotal: parseInt(medicine[0].mrp) * parseInt(quantity),
    });
  } catch (error) {
    response.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
