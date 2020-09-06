import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import history from 'utils/history';
import { Router } from 'react-router-dom';
// import hmr from 'utils/hmr';
import Routes from 'routes';
import './App.css';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
};

// export default hmr(module, App);
export default App;
