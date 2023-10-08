import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { EMAIL_REGEX } from "utils/Constants";
import styles from "./Profile.module.css";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserProfileUpdate = (data) => {
    Swal.fire({
      title: "Profile updated successfully!",
      icon: "success",
    });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleUserProfileUpdate)}>
        <div className={styles.grid}>
          <FormControl>
            <TextField
              label="First Name"
              {...register("first_name", {
                required: "First name is required!",
                minLength: {
                  value: 3,
                  message: "Please enter at least 3 characters!",
                },
                maxLength: {
                  value: 20,
                  message: "Please enter at most 20 characters!",
                },
              })}
              error={Boolean(errors?.first_name?.message)}
              helperText={errors?.first_name?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Last Name"
              {...register("last_name", {
                required: "Last name is required!",
                minLength: {
                  value: 3,
                  message: "Please enter at least 3 characters!",
                },
                maxLength: {
                  value: 20,
                  message: "Please enter at most 20 characters!",
                },
              })}
              error={Boolean(errors?.last_name?.message)}
              helperText={errors?.last_name?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email!",
                },
              })}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
          </FormControl>
        </div>

        <Button variant="contained" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
