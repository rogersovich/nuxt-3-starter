import * as yup from "yup"

// export const schemaValidationRegister = {
//   company_name: yup.string().required('Company Name is required'),
//   fullname: yup.string().required('Fullname is required'),
//   email: yup
//     .string()
//     .required('Email is required')
//     .email('Format must be Email'),
//   phone: yup
//     .string()
//     .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
//     .required('Phone is required'),
//   password: yup.string().required('Password is required').min(6),
//   pass_confirm: yup
//     .string()
//     .required('Password Confirm is required')
//     .min(6)
//     .oneOf([yup.ref('password')], 'Password Confirm must be match to Password'),
//   agree_newsletter: yup
//     .boolean()
//     .oneOf([true], 'Agree Newsletter is required.'),
//   agree_terms: yup.boolean().oneOf([true], 'Agree Term is required.'),
// };

export const schemaValidationText = {
  name: yup.string().required("Name is required"),
}

export const schemaValidationlogin = {
  email: yup.string().required("email is required").email(),
  password: yup.string().required("Password is required").min(6),
}
