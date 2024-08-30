"use client";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    
    "&:hover fieldset": {
      borderColor: "var(--primaryColor)", // Border color when hovering
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primaryColor)", // Border color when focused
    },
  },
  "& label.Mui-focused": {
    color: "var(--primaryColor)", // Label color when focused
  },
};
const CustomProjectFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={2}>
        {/* Project Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Project Title"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={8}
            margin="normal"
            {...register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={textFieldStyles}
          />
        </Grid>

        {/* Client Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Mobile"
            type="tel"
            margin="normal"
            {...register("mobile", { required: "Mobile is required" })}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            {...register("address", { required: "Address is required" })}
            error={!!errors.address}
            helperText={errors.address?.message}
            sx={textFieldStyles}
          />
        </Grid>
      </Grid>

      <Box mt={2} textAlign="center">
        <Button type="submit" variant="contained" sx={{background:"var(--primaryColor) !important",color:"white !important"}}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CustomProjectFrom;