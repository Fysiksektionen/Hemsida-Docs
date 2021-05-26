import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import APIDocs from "./APIDocs/APIDocs";

ReactDOM.render(
  <React.StrictMode>
      <div className="App">
          <APIDocs />
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);
