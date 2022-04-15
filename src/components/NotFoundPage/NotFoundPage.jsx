import React from "react";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import ButtonField from "../shared components/Button/Button";
import { COLORS } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mt-20 text-gray-500 relative">
      <span>Sorry, Page Not Found</span>
      <svg
        className="absolute -top-5 opacity-25 w-52 md:w-96 h-52 md:h-96"
        viewBox="0 0 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M182.564,190.927 C131.733,205.042 80.978,188.946 49.55,155.554 C49.541,156.47 48.69,158.668 48.709,159.706 C49.027,177.397 52.82,211.629 81.261,245.526 C81.923,246.314 85.22,247.984 85.907,248.77 C92.913,251.213 100.188,253.037 107.689,254.237 C108.433,254.009 111.503,253.855 112.236,253.615 C151.52,240.745 173.088,210.338 182.076,194.823 C182.7,193.745 182.064,191.847 182.564,190.927"
            fill="#F99D59"
          ></path>
          <path
            d="M222.555,41.941 C221.982,41.717 220.786,40.689 220.217,40.474 C190.517,29.259 167.4,31.329 150.72,36.161 C150.488,36.228 150.141,37.059 149.912,37.127 C191.441,67.415 211.002,134.292 182.564,190.927 C183.406,190.722 184.117,191.346 185.044,191.08 C200.63,186.611 228.444,173.196 254.79,132.34 C255.323,131.515 255.429,129.625 255.961,128.778 C255.962,128.516 256,128.263 256,128 C256,94.817 243.266,64.683 222.555,41.941"
            fill="#178DBC"
          ></path>
          <path
            d="M82.563,8.453 C54.433,19.154 31.054,39.401 16.451,65.338 C16.458,66.133 15.445,67.95 15.461,68.733 C16.489,119.354 36.301,144.6 46.922,154.642 C47.738,155.413 48.847,154.956 49.55,155.554 C49.929,108.545 94.895,45.923 149.912,37.127 C149.993,36.734 150.245,36.466 149.426,35.792 C144.557,31.778 130.111,16.939 87.507,8.621 C86.51,8.427 83.581,8.63 82.563,8.453"
            fill="#E5D332"
          ></path>
          <path
            d="M149.912,37.127 C166.93,32.139 191.885,29.922 222.555,41.941 L222.344,41.699 C198.96,16.111 165.398,0 128,0 C111.975,0 96.701,3.075 82.563,8.453 C123.379,15.539 142.495,29.781 149.912,37.127"
            fill="#3E7947"
          ></path>
          <path
            d="M85.907,248.77 C53.937,212.158 49.358,173.072 49.515,156.187 C49.515,155.972 49.55,155.744 49.552,155.527 C49.552,155.536 49.55,155.545 49.55,155.554 C39.548,147.051 16.955,121.494 16.451,65.338 C11.371,75.09 0,100.442 0,128 C0,183.863 35.839,231.24 85.744,248.695 L85.907,248.77"
            fill="#E57428"
          ></path>
          <path
            d="M255.961,128.778 C227.557,174.088 197.849,187.207 182.564,190.927 C182.49,191.073 182.439,191.223 182.366,191.368 C182.207,191.413 182.524,191.324 182.366,191.368 C174.535,205.788 151.136,240.966 107.689,254.237 C114.283,255.333 121.091,256 128,256 C198.693,256 256,198.693 256,128 C256,128.263 255.962,128.516 255.961,128.778"
            fill="#4A6F5D"
          ></path>
        </g>
      </svg>
      <div className="flex flex-col items-center animate-bounce mt-20">
        <FmdBadIcon className="text-9xl" />
        <span className="text-4xl text-center mt-3">404</span>
      </div>
      <ButtonField
        buttonstyle={{
          backgroundColor: COLORS.primary,
          borderRadius: 20,
          color: "white",
          fontWeight: "bold",
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 8,
          paddingBottom: 8,
        }}
        hoverstyle={{ backgroundColor: COLORS.darkPrimary }}
        onClick={() => navigate("/")}
      >
        Go To Home
      </ButtonField>
    </div>
  );
};

export default NotFoundPage;
