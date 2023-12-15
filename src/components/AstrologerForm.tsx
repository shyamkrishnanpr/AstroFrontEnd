import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { useCreateAstrologerMutation } from "../api/api";

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

const languageOPtions = [
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
  const [languages, setlanguages] = React.useState<string[]>([]);
  const [specialties, setSpecialties] = React.useState<string[]>([]);

  const [createAstrologer] = useCreateAstrologerMutation();

  const handleChangeLanguage = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value },
    } = event;
    setlanguages(value as string[]);
  };

  const handleChangeSpecialties = (
    event: SelectChangeEvent<typeof specialties>
  ) => {
    const {
      target: { value },
    } = event;
    setSpecialties(value as string[]);
  };

  const { register, handleSubmit } = useForm<AstrologerFormData>();

  const onSubmit: SubmitHandler<AstrologerFormData> = async (data) => {
    try {
      await createAstrologer(data).unwrap();
      onSuccess();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name")}
          label="Name"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("gender")}
          label="Gender"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          required
          fullWidth
          margin="normal"
        />
        <FormControl sx={{ mt: 1, width: 600 }} {...register("languages")}>
          <InputLabel id="demo-multiple-checkbox-label">Languages*</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            {...register("languages")}
            value={languages}
            onChange={handleChangeLanguage}
            input={<OutlinedInput label="Languages" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {languageOPtions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={languages.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{ mt: 1, mb: 1, width: 600 }}
          {...register("specialties")}
        >
          <InputLabel id="demo-multiple-checkbox-label">
            Specialties*
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            {...register("specialties")}
            value={specialties}
            onChange={handleChangeSpecialties}
            input={<OutlinedInput label="specialties" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {specialtiesOptions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={specialties.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AstrologerForm;
