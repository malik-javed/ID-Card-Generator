import axios from "axios";
const BASE_URL = `http://localhost:4000/api/v1`;
// Base URL for your backend server
const API_URL = `${BASE_URL}/idcards`;

export const uploadImage = async (file) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/assets`, file, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
      },
    });

    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to create a new ID card
export const createIdCard = async (idCardData) => {
  console.log("idCardDatra: ", idCardData);
  try {
    const response = await axios.post(API_URL, idCardData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating ID card:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Error creating ID card");
  }
};

// Function to update an existing ID card
export const updateIdCard = async (idCardId, idCardData) => {
  try {
    const response = await axios.put(`${API_URL}/${idCardId}`, idCardData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating ID card");
  }
};

// Function to delete an ID card
export const deleteIdCard = async (idCardId) => {
  try {
    await axios.delete(`${API_URL}/${idCardId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting ID card");
  }
};

// Function to get a specific ID card by ID
export const getIdCard = async (idCardId) => {
  try {
    const response = await axios.get(`${API_URL}/${idCardId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching ID card");
  }
};

// Function to get all ID cards
export const getIdCards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching ID cards");
  }
};
