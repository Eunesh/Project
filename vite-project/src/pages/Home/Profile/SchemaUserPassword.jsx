import * as Yup from "yup";

export const Schema = Yup.object({
  current_password: Yup.string()
    .min(6, "Password too small")
    .required("Please enter your password"),
  new_password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and minimum of 8 length"
    )
    .required("Please enter your password"),
  confirm_new_password: Yup.string()
    .required()
    .oneOf([Yup.ref("new_password"), null, "Password must match"]),
});
