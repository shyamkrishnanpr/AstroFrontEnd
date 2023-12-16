interface FormData {
  name: string;
  gender: string;
  email: string;
  languages: string;
  specialties: string;
}

export const validateForm = (formData: FormData) => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.gender.trim()) {
    errors.gender = "Gender is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.languages.trim()) {
    errors.languages = "Languages are required";
  }

  if (!formData.specialties.trim()) {
    errors.specialties = "Specialties are required";
  }

  return errors;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
