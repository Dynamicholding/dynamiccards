export interface Account {
  account_num: string;
  // otros campos de la cuenta
}


export interface User {
  id: number;
  first_name: string;
  last_name: string;
  dni: string;
  phone: string;
  email: string;
  pass: string;
  status: string;
  father_id: number;
  reset_token_expiry: string;
  last_password_reset: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: number;
  account?: Account;
}
