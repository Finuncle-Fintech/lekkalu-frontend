export type SignupDto = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string | boolean;
};

export type LoginDto = Pick<SignupDto, "username" | "password">;
