import React, { useState } from "react";
import axios from "axios";
import { Typography, Container, Button, Alert, Paper } from "@mui/material";

const Admin = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    console.log("Uploaded file:", file);
  };

  const handleDataUpload = () => {
    if (!uploadedFile) {
      setUploadError("Please upload a file before clicking Upload File!");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    axios
      .post("/api/update_db", formData)
      .then((response) => {
        setUploadSuccess(true);
        console.log("Data uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
        setUploadError(
          "Error uploading data. Please ensure that only LWE data in correct format in uploaded."
        );
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const styles = {
    container: {
      marginBottom: "1rem",
      padding: "1rem",
    },
    header: {
      marginBottom: "1rem",
    },
    input: {
      display: "block", // Display the input on a new line
      border: "1px solid #ccc",
      borderRadius: "0.25rem",
      padding: "0.5rem",
      marginBottom: "1rem",
    },
    button: {
      backgroundColor: "#4caf50", // Changed color to green
      color: "white",
      padding: "0.5rem 2rem",
      borderRadius: "0.25rem",
      cursor: "pointer",
      fontSize: "1rem",
      textDecoration: "none",
      transition: "background-color 0.3s",
      marginTop: "0.25rem", // Reduced margin
    },
    paper: {
      padding: "1.5rem", // Reduced padding
    },
    alert: {
      marginBottom: "1rem", // Reduced margin
    },
  };

  return (
    <Container maxWidth="sm" style={styles.container}>
      <Typography variant="h2" gutterBottom>
        Welcome to Admin Centre
      </Typography>
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h4" style={styles.header}>
          Latest LWE Bill Excel File
        </Typography>
        <Typography variant="subtitle1" style={styles.header}>
          Wait 30s after upload for changes to be seen in Dashboard
        </Typography>

        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileUpload}
          style={styles.input}
        />
        {uploadError && (
          <Alert severity="error" style={styles.alert}>
            {uploadError}
          </Alert>
        )}
        {uploadSuccess && (
          <Alert severity="success" style={styles.alert}>
            File Uploaded. Changes made to Dashboard!
          </Alert>
        )}
        <Button
          variant="contained"
          style={styles.button}
          onClick={handleDataUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Admin;
