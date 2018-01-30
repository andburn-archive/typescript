import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Hello from './components/Hello';

ReactDOM.render(
  <div>
    <App />
    <Hello name="TypeScript" enthusiasmLevel={5} />
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
