import React, { useEffect, useState } from "react";
import Model from "../../shared components/Model/Model";
import "./CreateCategory.scss";
import CancelIcon from "@mui/icons-material/Close";
import ButtonField from "../../shared components/Button/Button";
import Input from "../../shared components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CATEGORY,
  SHOW_ALL_CATEGORIES,
} from "../../../constants/action.constants";
import { MenuItem } from "@mui/material";
import toastService from "../../../services/toastService";

const CreateCategory = ({ create, handleClose }) => {
  const [type, setType] = useState(true);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const categoryStore = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleCategoryCreate = () => {
    if (title) {
      dispatch({ type: ADD_CATEGORY, payload: { title } });
    } else {
      toastService.showErrorToast("Please Enter Title");
    }
  };
  const handleSubCategoryCreate = () => {
    if (title && categoryId) {
      console.log("Sub Category create", title, categoryId);
    } else {
      if (!title) {
        toastService.showErrorToast("Please Enter Title");
      } else {
        toastService.showErrorToast("Please Select Category");
      }
    }
  };
  useEffect(() => {
    setTitle("");
    if (!type && !categoryStore.isCategoriesLoaded) {
      dispatch({ type: SHOW_ALL_CATEGORIES });
    }
  }, [type]);
  const categories = categoryStore.categories;
  return (
    <Model open={create} hideBackdrop>
      <div className="bg-white rounded absolute left-10 sm:left-20 top-20 md:left-1/3 focus:outline-none">
        <div className="text-xl text-gray-400 p-3 flex justify-between items-start relative border border-gray-200">
          <div className="flex justify-between">
            <span>New {type ? "Category" : "Sub Category"}</span>
          </div>
          <CancelIcon
            className="text-darkPrimary text-xl cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="h-10 width flex text-center cursor-pointer">
          <div
            className={`w-1/2 p-2 border-b border-r border-gray-300 hover:bg-gray-300 ${
              type && "bg-gray-200"
            }`}
            onClick={() => setType(true)}
          >
            Category
          </div>
          <div
            className={`w-1/2 p-2 border-b border-gray-300 hover:bg-gray-300 ${
              !type && "bg-gray-200"
            }`}
            onClick={() => setType(false)}
          >
            SubCategory
          </div>
        </div>
        <div className="h-48 p-3">
          <div>
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {!type && (
              <Input
                label="Select Category"
                select
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Input>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <ButtonField
              buttonstyle={{
                borderRadius: 80,
                paddingLeft: 24,
                paddingRight: 24,
              }}
              onClick={() => {
                if (type) {
                  handleCategoryCreate();
                } else {
                  handleSubCategoryCreate();
                }
              }}
            >
              Create
            </ButtonField>
          </div>
        </div>
      </div>
    </Model>
  );
};

export default CreateCategory;
