
import React from 'react';
import App from '../App';
import Revenue from "../pages/dashboard/Revenue";
import { AuthContextProvider } from "../context/AuthContext"
import { render,screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

const renderwithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return {user:userEvent.setup(),
    ...render(
      <AuthContextProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </AuthContextProvider>),
  }
}

//@babel/preset-react
//@babel/plugin-syntax-jsx
it('renders without crashing', () => {
  const {user} = renderwithRouter(<App />);
  expect(screen.getByText(/Welcome to B2ST/i)).toBeInTheDocument();
});

it('landing on a bad page', () => {
  renderwithRouter(<App />, { route: '/some/badRoute' })
  expect(screen.getByText(/404 Error/i)).toBeInTheDocument();
});

it('landing page navigating', async () => {
  const {user} = renderwithRouter(<App />);
  expect(screen.getByText(/Welcome to B2ST/i)).toBeInTheDocument();
  await user.click(screen.getByText(/Login/i));
  expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
  await user.click(screen.getByText(/Register/i));
  expect(screen.getAllByText(/Sign up/i)[0]).toBeInTheDocument();
  await user.click(screen.getByText(/B2ST/i));
  expect(screen.getByText(/Welcome to B2ST/i)).toBeInTheDocument();
});

it('landing to dashboard before login should navigate to home', async () => {
  renderwithRouter(<App />, { route: '/dashboard' });
  expect(screen.getByText(/Welcome to B2ST/i)).toBeInTheDocument();
});

it('landing to campaign before login should navigate to home', async () => {
  renderwithRouter(<App />, { route: '/dashboard/campaign' });
  expect(screen.getByText(/Welcome to B2ST/i)).toBeInTheDocument();
});

it('landing to paln before login should navigate to home', async () => {
  renderwithRouter(<App />, { route: '/dashboard/plans' });
  expect(screen.getByText(/Welcome to B2ST/i)).toBeInTheDocument();
});
