// INPUT_REQUIRED {Check if React version is 18+ and accordingly decide on wrapping App with React.StrictMode}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>{/* If React 18+ */}
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
