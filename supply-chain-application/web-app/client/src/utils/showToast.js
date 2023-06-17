import { toast } from "react-toastify";

export const notify = (status, message) => {
  if (status === "success")
    toast.success(message, {
      toastId: message,
    });
  else
    toast.error(message, {
      toastId: message,
    });
};
