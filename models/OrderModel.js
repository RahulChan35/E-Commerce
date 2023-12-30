import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({});

export default new mongoose.model("Order", OrderSchema);
