import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errorToast = (error: string) => {
  toast.error(error, { toastId: error });
};
