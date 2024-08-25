import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// CSS styles as JavaScript objects
const styles = {
  idCardPreview: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  idCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  idCardImage: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover",
    marginBottom: "20px",
    border: "3px solid #2196f3",
  },
  idCardDetails: {
    textAlign: "center",
  },
  idCardDetailsH3: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  idCardDetailsP: {
    fontSize: "1rem",
    color: "#666",
    margin: "5px 0",
  },
  downloadButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  downloadButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#2196f3",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  downloadButtonHover: {
    backgroundColor: "#1976d2",
  },
};

const IDCardPreview = ({ cardData }) => {
  const cardRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ensure the image is fully loaded before enabling downloads
  useEffect(() => {
    const img = new Image();
    img.src = cardData?.picture;
    img.onload = () => setImageLoaded(true);
  }, [cardData?.picture]);

  const downloadAsImage = () => {
    if (imageLoaded) {
      html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${cardData.fullName}_IDCard.png`;
        link.click();
      });
    }
  };

  const downloadAsPDF = () => {
    if (imageLoaded) {
      html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
        const pdf = new jsPDF("portrait", "px", "a4");
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(
          imgData,
          "PNG",
          20,
          20,
          canvas.width * 0.75,
          canvas.height * 0.75
        ); // Adjusting size for better fit
        pdf.save(`${cardData.fullName}_IDCard.pdf`);
      });
    }
  };

  if (!cardData) {
    return <div style={styles.idCardPreview}>No ID card data available</div>;
  }

  return (
    <div style={styles.idCardPreview}>
      <div className="id-card" ref={cardRef} style={styles.idCard}>
        <img src={cardData.picture} alt="Profile" style={styles.idCardImage} />
        <div style={styles.idCardDetails}>
          <h3 style={styles.idCardDetailsH3}>{cardData.fullName}</h3>
          <p style={styles.idCardDetailsP}>
            <strong>ID:</strong> {cardData.rollNo}
          </p>
          <p style={styles.idCardDetailsP}>
            <strong>Course:</strong> {cardData.course}
          </p>
          <p style={styles.idCardDetailsP}>
            <strong>College:</strong> {cardData.collegeName}
          </p>
          <p style={styles.idCardDetailsP}>
            <strong>Date of Birth:</strong>{" "}
            {new Date(cardData.dob).toLocaleDateString()}
          </p>
          <p style={styles.idCardDetailsP}>
            <strong>Address:</strong> {cardData.address.city},{" "}
            {cardData.address.state}, {cardData.address.country} -{" "}
            {cardData.address.pinCode}
          </p>
          <p style={styles.idCardDetailsP}>
            <strong>Mobile:</strong> {cardData.mobileNo}
          </p>
        </div>
      </div>
      <div style={styles.downloadButtons}>
        <button
          onClick={downloadAsImage}
          style={{ ...styles.downloadButton, marginRight: 5 }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.downloadButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor =
              styles.downloadButton.backgroundColor)
          }
          disabled={!imageLoaded}
        >
          Download as Image
        </button>
        <button
          onClick={downloadAsPDF}
          style={styles.downloadButton}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.downloadButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor =
              styles.downloadButton.backgroundColor)
          }
          disabled={!imageLoaded}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default IDCardPreview;
