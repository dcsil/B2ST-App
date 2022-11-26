import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { render } from '@testing-library/react';

//@babel/preset-react
//@babel/plugin-syntax-jsx
it('renders without crashing', () => {
  render(<App />);
});