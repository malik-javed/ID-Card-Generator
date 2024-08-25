import React, { useState } from "react";
import IDCardForm from "../components/IDCardForm";
import IDCardPreview from "../components/IDCardPreview";
import "./Home.css";

const Home = () => {
  const [cardData, setCardData] = useState(null);

  const handleCardUpdate = (data) => {
    setCardData(data);
  };

  return (
    <div className="home">
      <IDCardForm onCardUpdate={handleCardUpdate} />
      <IDCardPreview cardData={cardData} />
    </div>
  );
};

export default Home;
