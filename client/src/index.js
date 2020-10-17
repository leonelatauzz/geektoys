import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Redux/Reducers/reducer';
import './index.css';
import App from './App';
import './componentes/css/Producto.css'
import './componentes/css/catalogo.css'
import './componentes/css/productCard.css'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './componentes/css/navbar.css';
import './componentes/css/carusel.css'
import './componentes/css/forms.css';
import './componentes/css/SingIn.css';
import './componentes/css/footer.css';
import './componentes/tablaOrden.css';
import './componentes/css/order.css'


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
