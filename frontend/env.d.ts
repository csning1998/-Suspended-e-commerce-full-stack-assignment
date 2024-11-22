/// <reference types="vite/client" />

interface LoginFormData {
  userId: string;
  userPassword: string;
}

interface RegistrationFormData {
  userId: string;
  userFamilyName: string;
  userGivenName: string;
  userEmail: string;
  userPassword: string;
  confirmPassword: string;
}
