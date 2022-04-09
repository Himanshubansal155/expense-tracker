import { BASE_URL } from "../constants/secrets";
import { post } from "./base.api";

const convert = (event) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(new Blob([event]));
    return reader;
  });
};

export const uploadFileOrImage = async (event) => {
  try {
    const url = BASE_URL + "/upload";
    const file = event.target.files[0];
    convert(file).then((data) => {
      post(url, {
        image: data,
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          throw error;
        });
    });
  } catch (error) {
    throw error;
  }
};
