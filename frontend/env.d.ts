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

interface Products {
  id: number;
  name: string;
  link2Pic: string;
  price: number;
  discountPrice: number;
  collection: string;
  category: string;
  sizes: number[];
  colors: string[];
}


// interface IProduct extends Document {
//   productName: string;
//   description?: string;
//   price: number;
//   state: boolean; // true if the product is published to customers.
//   createdAt?: Date;
//   test: string;
// }