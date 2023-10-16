import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages/Home/Home';

import { store } from './redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer position='bottom-left' />
      <Home />
    </Provider>
  );
};
