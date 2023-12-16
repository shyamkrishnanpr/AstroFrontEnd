import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { useCreateAstrologerMutation } from "../api/api";
import { validateForm } from "../validation/RegisterValidation";

interface AstrologerFormData {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Container = styled("div")({
  maxWidth: 700,
  margin: "auto",
  marginTop: 30,
  padding: 16,
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
  background: "#fff",
});

const languageOptions = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Malayalam",
  "Marathi",
];

const specialtiesOptions = [
  "Natal Astrology",
  "Horary Astrology",
  "Mundane Astrology",
  "Medical Astrology",
];

interface AstrologerFormProps {
  onSuccess: () => void;
}

const AstrologerForm: React.FC<AstrologerFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<AstrologerFormData>({
    name: "",
    gender: "",
    email: "",
    languages: [],
    specialties: [],
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof AstrologerFormData, string>>
  >({});
  const [serverError, setServerError] = useState<string | null>(null);

  const [createAstrologer] = useCreateAstrologerMutation();

  const handleChangeLanguage = (
    event: SelectChangeEvent<typeof formData.languages>
  ) => {
    const {
      target: { value },
    } = event;
    setFormData((prevData) => ({ ...prevData, languages: value as string[] }));
  };

  const handleChangeSpecialties = (
    event: SelectChangeEvent<typeof formData.specialties>
  ) => {
    const {
      target: { value },
    } = event;
    setFormData((prevData) => ({
      ...prevData,
      specialties: value as string[],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        await createAstrologer(formData).unwrap();
        onSuccess();
        console.log("Form data submitted:", formData);
      } catch (error) {
        setServerError(
          "An error occurred while submitting the form. Please try again later."
        );
        console.log("Error submitting form:", error);
      }
    } else {
      setValidationErrors(errors);
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div>
      <Container>
        {serverError && (
          <Typography
            variant="body1"
            color="error"
            style={{ marginBottom: 16 }}
          >
            {serverError}
          </Typography>
        )}
        <h2 style={{ color: "#333", marginBottom: 5 }}>New Registration</h2>
        <form onSubmit={onSubmit}>
          <TextField
            name="name"
            label="Name"
            required
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            error={!!validationErrors.name}
            helperText={validationErrors.name || " "}
            margin="normal"
          />
          <TextField
            name="gender"
            label="Gender"
            required
            fullWidth
            value={formData.gender}
            onChange={handleInputChange}
            error={!!validationErrors.gender}
            helperText={validationErrors.gender || " "}
            margin="normal"
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            required
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email || " "}
            margin="normal"
          />
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Languages*
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={formData.languages}
              required
              onChange={handleChangeLanguage}
              input={<OutlinedInput label="Languages" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {languageOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={formData.languages.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 1, mb: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Specialties*
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={formData.specialties}
              required
              onChange={handleChangeSpecialties}
              input={<OutlinedInput label="Specialties" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {specialtiesOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={formData.specialties.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AstrologerForm;
