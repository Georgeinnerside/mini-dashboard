import * as Yup from "yup";

//  validation for  form (post)
export const PostFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(30, "Title cannot exceed 30 characters"),
  body: Yup.string()
    .required("Post is required")
    .min(10, "Post must be at least 10 characters")
    .max(100, "Post must not exceed 100"),
});
