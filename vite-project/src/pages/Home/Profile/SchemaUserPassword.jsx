import * as Yup from "yup";

export const Schema = Yup.object({
  current_password: Yup.string()
    .min(6, "Password too small")
    .required("Please enter your password"),
  new_password: Yup.string()
    .min(6, "Password too small")
    .required("Please enter your password"),
  confirm_new_password: Yup.string()
    .required()
    .oneOf([Yup.ref("new_password"), null, "Password must match"]),
});
