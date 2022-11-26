
import React from 'react';
import App from '../App';
import { AuthContextProvider } from "../context/AuthContext"
import { render } from '@testing-library/react';

//@babel/preset-react
//@babel/plugin-syntax-jsx
it('renders without crashing', () => {
  render(<AuthContextProvider>
    <App />
  </AuthContextProvider>);
});