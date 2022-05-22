import { BASE_URL } from "../constants/secrets";
import { post } from "./base.api";

export const convert = (event) => {
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

export const uploadFileOrImage = async (file) => {
  try {
    const url = BASE_URL + "image";
    const data = await convert(file);
    const imageData = await post(url, {
      image: data,
    });
    return imageData.data;
  } catch (error) {
    throw error;
  }
};
