import { errorToast } from '../utils/toasts/toasts';

export const extractErrorMessage = (error: any) => {
  if (typeof error === 'string') return error;

  return (
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    'Something went wrong'
  );
};

interface ReduxErrorHandlerProps {
  error: any;
  rejectWithValue: (value: any) => any;
}

export const reduxErrorHandler = ({
  error,
  rejectWithValue,
}: ReduxErrorHandlerProps) => {
  const errorMessage = extractErrorMessage(error);

  errorToast(errorMessage);

  return rejectWithValue(errorMessage);
};
