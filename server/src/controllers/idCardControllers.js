import { IDCard } from "../models/IDCard.js";
import { CustomError } from "../libs/CustomError.js";

export const createIdCard = async (req, res) => {
  console.log("createIdCard ", req.body);
  try {
    console.log("find all: ", await IDCard.find());
    const idCard = new IDCard(req.body);
    const saved = await idCard.save();
    console.log("idCard: ", saved);
    res.status(201).json({ idCard: saved });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(404).json({
        message: "Colleage name and roll number already registered!",
      });
    }
  }
};

export const updateIdCard = async (req, res) => {
  const idCard = await IDCard.findByIdAndUpdate(req.params.idCardId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ idCard });
};

export const deleteIdCard = async (req, res) => {
  const result = await IDCard.findByIdAndDelete(req.params.idCardId);
  if (!result)
    throw new CustomError(404, {
      message: "Record is not found",
    });

  res.status(200).json({ message: "ID card deleted successfully" });
};

export const getIdCard = async (req, res) => {
  const idCard = await IDCard.findById(req.params.idCardId);
  res.status(200).json({ idCard });
};

export const getIdCards = async (req, res) => {
  const idCards = await IDCard.find();
  res.status(200).json({ idCards });
};
