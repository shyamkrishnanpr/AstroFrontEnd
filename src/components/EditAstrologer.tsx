// EditAstrologer.tsx
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAstrologersQuery,
  useUpdateAstrologerMutation,
} from "../api/api";

import { styled } from "@mui/system";

import { validateForm } from "../validation/FormValidation";

// Styled components for improved UI
const Container = styled("div")({
  maxWidth: 700,
  margin: "auto",
  marginTop:50,
  
  padding: 16,
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
  background: "#fff",
});

const Title = styled("h2")({
  color: "#333",
  marginBottom: 24,
});

const FeedbackMessage = styled("p")({
  color: "green",
  fontWeight: "bold",
});

const ErrorMessage = styled("p")({
  color: "red",
  fontWeight: "bold",
});

const SaveButton = styled(Button)({
  margin: 49,
});

const EditAstrologer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const { data: astrologer, isLoading, error } = useGetAstrologersQuery([]);

  const selectedAstrologer = astrologer?.find((a: any) => a._id === id);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [formData, setFormData] = useState({
    name: selectedAstrologer?.name || "",
    gender: selectedAstrologer?.gender || "",
    email: selectedAstrologer?.email || "",
    languages: selectedAstrologer?.languages.join(", ") || "",
    specialties: selectedAstrologer?.specialties.join(", ") || "",
  });

  const [
    updateAstrologerMutation,
    { isLoading: isUpdating, error: updateError },
  ] = useUpdateAstrologerMutation();

  const handleSubmit = async () => {
    try {
      const errors = validateForm(formData);

      if (Object.keys(errors).length === 0) {
        await updateAstrologerMutation({
          id,
          updatedAstrologer: formData,
        });

        setIsSaved(true);

        setTimeout(() => {
          setIsSaved(false);
          navigate(`/edit/${id}`);
        }, 2000);
        setValidationErrors({});
      } else {
        setValidationErrors(errors);
        console.log("validation failed", errors);
      }
    } catch (err) {
      console.error("Error updating astrologer:", err);
      // Handle error (e.g., show a user-friendly error message)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !selectedAstrologer) {
    return <p>Error loading astrologer details.</p>;
  }

  return (
    <Container>
      <Title>Edit Astrologer</Title>

      <form>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!validationErrors.name}
          helperText={validationErrors.name || " "}
          style={{ margin: 10 }}
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          error={!!validationErrors.gender}
          helperText={validationErrors.gender || " "}
          style={{ margin: 10 }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!validationErrors.email}
          helperText={validationErrors.email || " "}
          style={{ margin: 10 }}
        />
        <TextField
          label="Languages"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          error={!!validationErrors.languages}
          helperText={validationErrors.languages || " "}
          style={{ margin: 10 }}
        />
        <TextField
          label="Specialties"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          error={!!validationErrors.specialties}
          helperText={validationErrors.specialties || " "}
          style={{ margin: 10 }}
        />

        <SaveButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </SaveButton>
      </form>

      {isSaved ? (
        <FeedbackMessage>Changes saved successfully!</FeedbackMessage>
      ) : (
        ""
      )}
      {updateError && <ErrorMessage>Error saving changes</ErrorMessage>}
    </Container>
  );
};

export default EditAstrologer;
