import * as Yup from "yup";

export const Schema = Yup.object({
  name: Yup.string()
    .min(2, "Name too small")
    .max(30)
    .required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and minimum of 8 length"
    )
    .required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null, "Password must match"]),
});
