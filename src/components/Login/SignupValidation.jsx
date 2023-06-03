const validation = (values) => {
   const errors = {};
   let isValid = false;
   const passwordRegex = new RegExp(
      '^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*'
   );

   if (!values.username) {
      errors.username = 'Username is required.';
      isValid = false;
   }
   if (!values.email) {
      errors.email = 'Email is required.';
      isValid = false;
   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid.';
      isValid = false;
   }
   if (!values.password) {
      errors.password = 'Password is required.';
      isValid = false;
   } else if (!passwordRegex.test(values.password)) {
      errors.password =
         'Password should be more than 8 character and contain atleast 1 uppercase letter and digit.';
      isValid = false;
   }
   if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required.';
      isValid = false;
   } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password don't match.";
      isValid = false;
   }
   if (values.terms === 'false' || values.terms === false) {
      errors.terms = 'Please accept T&C to continue.';
      isValid = false;
   } else {
      isValid = true;
   }
   return [errors, isValid];
};

export default validation;