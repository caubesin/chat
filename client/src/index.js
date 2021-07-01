import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./css/index.css";
import "./font/FA5PRO-master/css/all.min.css";
import { BrowserRouter as Router} from 'react-router-dom';

import store from "./app/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);