import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Redux/Reducers/reducer';
import './index.css';
import App from './App';
import '.././src/componentes/Producto.css'
import '.././src/componentes/catalogo.css'
import '.././src/componentes/productCard.css'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././src/componentes/navbar.css';
import '.././src/componentes/carusel.css'
import '../src/componentes/forms.css';
import './componentes/SingIn.css'
import './componentes/footer.css'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
