"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
});

export default function PostFormModal({
  isOpen,
  isClose,
  onSubmit,
  defaultValues,
}) {
  //  yup and react-hook form for handling submit and error
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { title: "", body: "" },
  });

  // handles post action
  const submitHandler = (data) => {
    onSubmit(data);
    isClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="text-gray-800 bg-white  dark:bg-gray-800 p-6 rounded-xl w-96">
        <h2 className="text-gray-700 dark:text-gray-200 text-lg font-bold mb-4">
          Post Form
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title")}
              className="text-gray-700 dark:text-gray-200 w-full border rounded p-2"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Body</label>
            <textarea
              {...register("body")}
              className="text-gray-700 dark:text-gray-200 w-full border rounded p-2 h-[60%]"
              placeholder="Enter body"
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={isClose}
              className="text-gray-200 dark:text-gray-200 px-4 py-2 bg-gray-500  rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
