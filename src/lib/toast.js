import { toast as toastify } from "react-toastify";
import ToastContent from "@/components/ui/toast";

const showToast = (type, message, options = {}) => {
  toastify(
    ({ closeToast }) => (
      <ToastContent message={message} type={type} closeToast={closeToast} />
    ),
    {
      ...options,
      closeButton: false,
      className: "!bg-transparent !shadow-none !p-0",
      bodyClassName: "!p-0",
    }
  );
};  

export const toast = {
  success: (message, options) => showToast("success", message, options),

  error: (message, options) => showToast("error", message, options),

  info: (message, options) => showToast("info", message, options),

  warning: (message, options) => showToast("warning", message, options),
};
