import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store, { persistor } from './reduxToolkit/index.js';
import { PersistGate } from 'redux-persist/integration/react'
import { StateProvider } from './context/StateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StateProvider>
          <App />
        </StateProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
