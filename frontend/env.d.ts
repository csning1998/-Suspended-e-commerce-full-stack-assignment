/// <reference types="vite/client" />

interface LoginFormData {
  userName: string;
  userPassword: string;
}

interface RegistrationFormData {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  confirmPassword: string;
}
