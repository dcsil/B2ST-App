import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { render, screen } from '@testing-library/react';

// //@babel/preset-react
// //@babel/plugin-syntax-jsx
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

const sum = (a, b) =>{
  return a + b
}

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
