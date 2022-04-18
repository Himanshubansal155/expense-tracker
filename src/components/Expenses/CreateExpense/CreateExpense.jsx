import React, { useEffect, useState } from "react";
import Model from "./../../shared components/Model/Model";
import CancelIcon from "@mui/icons-material/Close";
import "./CreateExpense.scss";
import Input from "../../shared components/Input/Input";
import ButtonField from "../../shared components/Button/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { categoryStoreSelector } from "../../../store/stores.selector";
import { LinearProgress, MenuItem } from "@mui/material";
import {
  SHOW_ALL_CATEGORIES,
  SHOW_ALL_SUB_CATEGORIES,
} from "../../../constants/action.constants";
import { uploadFileOrImage } from "../../../apiService/image.api";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { BallTriangle } from "react-loader-spinner";
import { COLORS } from "../../../constants/Colors";
import toastService from "../../../services/toastService";
import * as Yup from "yup";

const loginSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  categoryId: Yup.string().required("Category is Required"),
  amount: Yup.number()
    .min(0, "Amount Greater than 0")
    .required("Amount is required"),
  date: Yup.string().required("Date is required"),
});

const CreateExpense = ({ create, handleClose, editTitle }) => {
  const categoryStore = useSelector(categoryStoreSelector);
  const [fileLoading, setFileLoading] = useState(false);
  const dispatch = useDispatch();
  const handleExpenseCreate = (e) => {
    console.log("created", e);
  };
  const onClose = () => {
    handleClose();
    formik.resetForm({});
  };
  const categories = categoryStore.categories;
  const subCategories = categoryStore.subCategories;
  const formik = useFormik({
    initialValues: {
      title: editTitle || "",
      description: "",
      amount: undefined,
      date: "",
      time: "",
      categoryId: "",
      subCategoryId: "",
      meta: undefined,
    },
    validationSchema: loginSchema,
    onSubmit: handleExpenseCreate,
  });
  useEffect(() => {
    if (!categoryStore.isCategoriesLoaded) {
      dispatch({ type: SHOW_ALL_CATEGORIES });
    }
    if (formik.values.categoryId) {
      dispatch({
        type: SHOW_ALL_SUB_CATEGORIES,
        payload: { id: formik.values.categoryId },
      });
    }
  }, [formik.values.categoryId]);
  return (
    <Model open={create} hideBackdrop>
      <div className="bg-white border-2 rounded-2xl absolute left-10 w-4/5 lg:w-2/5 lg:left-1/3 top-20 focus:outline-none">
        <div className="text-xl text-gray-400 p-3 flex justify-between items-start relative border-b border-gray-200">
          <div className="flex justify-between overflow-auto">
            <span>{editTitle ? "Edit" : "New"} Expense</span>
          </div>
          <CancelIcon
            className="text-darkPrimary text-xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <Dropzone
          onDrop={async (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
              setFileLoading(true);
              const data = await uploadFileOrImage(acceptedFiles[0]);
              setFileLoading(false);
              formik.setFieldValue("meta", data);
            }
          }}
          multiple={false}
          noDragEventsBubbling={true}
          accept={["image/*", "application/pdf"]}
          onDropRejected={() => {
            toastService.showErrorToast("File format not supported");
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="p-3 overflow-hidden h-full">
              <div>
                <Input
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorfield={formik.touched.title && formik.errors.title}
                />
                <Input
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-2 w-full"
                />
                {!categoryStore.isLoading && categories.length === 0 && (
                  <div className="text-red-400 mt-5 underline text-center cursor-pointer">
                    Please Create Category First
                  </div>
                )}
                {!formik.values.categoryId && categoryStore.isLoading && (
                  <div className="text-darkPrimary">
                    <LinearProgress color="inherit" className="h-5" />
                  </div>
                )}
                {categories.length > 0 && (
                  <Input
                    label="Select Category"
                    name="categoryId"
                    select
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                    className="mt-2 w-full"
                    errorfield={
                      formik.touched.categoryId && formik.errors.categoryId
                    }
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Input>
                )}
                {!!formik.values.categoryId && categoryStore.isLoading && (
                  <div className="text-darkPrimary">
                    <LinearProgress color="inherit" className="h-5" />
                  </div>
                )}
                {!categoryStore.isLoading && subCategories.length > 0 && (
                  <Input
                    label="Select Sub Category"
                    name="subCategoryId"
                    select
                    onChange={formik.handleChange}
                    value={formik.values.subCategoryId}
                    className="mt-2 w-full"
                  >
                    {subCategories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Input>
                )}
                <Input
                  label="Amount"
                  name="amount"
                  type="number"
                  min="1"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-2 w-full"
                  errorfield={formik.touched.amount && formik.errors.amount}
                />
                <Input
                  label="Date"
                  name="date"
                  type="date"
                  className={`mt-2 w-full ${!formik.values.date && "date"}`}
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorfield={formik.touched.date && formik.errors.date}
                />
                <Input
                  label="Time"
                  name="time"
                  type="time"
                  className={`mt-2 w-full ${!formik.values.time && "time"}`}
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {!fileLoading && !formik.values.meta && (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="border-2 p-2 flex justify-center flex-col items-center text-sm">
                      <CloudUploadIcon className="text-8xl" />
                      Drag 'n' drop image or pdf here, or click to select
                    </div>
                  </div>
                )}
                {fileLoading && (
                  <div className="flex justify-center">
                    <BallTriangle
                      heigth="100"
                      width="100"
                      color={COLORS.darkPrimary}
                      ariaLabel="loading-indicator"
                    />
                  </div>
                )}
                {formik.values.meta && (
                  <div className="text-green-600 border p-2 border-green-600 flex flex-col items-center">
                    <div>File Uploaded</div>
                    {formik.values.meta.file_type === "image" && (
                      <img
                        src={formik.values.meta.url}
                        width={100}
                        height={100}
                        alt="Uploaded Images"
                      />
                    )}
                    <div
                      className="text-red-500 border border-red-500 cursor-pointer mt-2 px-4 py-2"
                      onClick={() => formik.setFieldValue("meta", undefined)}
                    >
                      Want To Cancel
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-5">
                <ButtonField
                  buttonstyle={{
                    borderRadius: 80,
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                  onClick={formik.handleSubmit}
                >
                  {editTitle ? "Save" : "Create"}
                </ButtonField>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </Model>
  );
};

export default CreateExpense;
