import { LoginDto } from "types/auth";

const validation = (values: LoginDto): [Record<string, string>, boolean] => {
  let errors: Record<string, string> = {};
  let isValid = false;
  //const passwordRegex = new RegExp("^(?=.*[A - Za - z])(?=.*\\d)(?=.*[@$!% *#?&])[A-Za-z\\d@$!%*#?&]{8,}$");

  if (!values.username) {
    errors.username = "Username is required.";
    isValid = false;
  }
  // else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //     errors.email = "Email is invalid."
  //     isValid = false;
  // }

  if (!values.password) {
    errors.password = "Password is required.";
    isValid = false;
  }

  return [errors, isValid];
};

export default validation;
