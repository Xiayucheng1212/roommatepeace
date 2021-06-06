import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from 'components/HomePage.jsx';
import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {

    ReactDOM.render(
            <HomePage />,
        document.getElementById('root')
    );
};
