/// <reference types="vite/client" />

interface LoginFormData {
  userName: string;
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
