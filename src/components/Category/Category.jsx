import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "../shared components/Input/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateCategory from "./CreateCategory/CreateCategory";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_ALL_CATEGORIES } from "../../constants/action.constants";
import "./CreateCategory/CreateCategory.scss";
import Loader from "../shared components/Loader/Loader";

const Category = () => {
  const [type, setType] = useState(1);
  const categoryStore = useSelector((state) => state.category);
  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (type === 1) {
      if (!categoryStore.isCategoriesLoaded) {
        dispatch({ type: SHOW_ALL_CATEGORIES });
      }
    } else {
    }
  }, [type]);
  const categories = categoryStore.categories;
  if (categoryStore.isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <div className="flex justify-between items-center border-b-2">
        <div className="w-2/5 px-3 pt-3">
          <Input
            id="outlined-select"
            select
            label="Select Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {[
              { label: "Categories", value: 1 },
              { label: "subCategories", value: 2 },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Input>
        </div>
        <AddCircleOutlineIcon
          className="text-primary text-4xl cursor-pointer pt-3"
          onClick={() => setCreate(true)}
        />
      </div>
      <div className="w-full flex">
        <div className="w-2/5 border-r border-gray-200 p-2 minhScreen">
          {type === 1 &&
            categories.map((category, index) => (
              <div
                className="w-full hover:bg-gray-200 border border-gray-200 p-2 rounded-xl mt-2"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{category.title}</span>
                  <span>Rs. {category.totalAmount}</span>
                </div>
                Total Expense: 20
                <div className="flex space-x-2">
                  <div className="px-3 text-sm py-1 bg-gray-50 border border-gray-200 max-w-min rounded-full">
                    diesel
                  </div>
                  <div className="px-3 text-sm py-1 bg-gray-50 border border-gray-200 max-w-min rounded-full">
                    Petrol
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div></div>
      </div>
      <CreateCategory create={create} handleClose={() => setCreate(false)} />
    </div>
  );
};

export default Category;
