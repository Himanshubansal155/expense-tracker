import { NotificationManager } from "react-notifications";

class toastService {
  static showtoast = (message, title) => {
    NotificationManager.success(message, title);
  };
  static showErrorToast = (message, title) => {
    NotificationManager.error(message, title);
  };
  static showInfoToast = (message, title) => {
    NotificationManager.info(message, title);
  };
  static showWarningToast = (message, title) => {
    NotificationManager.warning(message, title);
  };
}

export default toastService;
