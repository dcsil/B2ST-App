import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from '../App'
import { AuthContextProvider } from "../context/AuthContext"
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

jest.mock('axios', ()=>({
    get: () => {
      return Promise.resolve({
        data:[]
      })
    },
    post: () => {
        return Promise.resolve({
          data:[]
        })
      },
  }))

jest.mock('react-apexcharts',()=>({
    __esModule: true,
    default: () => <div/>  
}));
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

describe("Dashboard navigation",()=>{
    beforeAll(()=>{
        localStorage.setItem('user', JSON.stringify({email:"a@a.com"}));
    })

    test("Login navigate to dashboard after login", async () => {
        renderwithRouter(<App />, { route: '/login' });
        expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
    })

    test("Signup navigate to dashboard after login", async () => {
        renderwithRouter(<App />, { route: '/signup' });
        expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
    })

    test("Dashboard navigating after login", async () =>{
        renderwithRouter(<App />);
        await fireEvent.click(screen.getAllByText(/Dashboard/i)[0]);
        expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(1);
        expect(screen.getAllByText(/Revenue/i)[0]).toBeInTheDocument();
    })
    
    test("Campaign navigating render after login", async () =>{
        renderwithRouter(<App />);
        await fireEvent.click(screen.getAllByText(/Dashboard/i)[0]);
        await fireEvent.click(screen.getAllByText(/Campaign/i)[0]);
        expect(screen.getAllByText(/Campaign/i).length).toBeGreaterThan(1);
        expect(screen.getAllByText(/Contact/i)[0]).toBeInTheDocument();
    })

    test("Plans render after login", async () =>{
        renderwithRouter(<App />);
        await fireEvent.click(screen.getAllByText(/Dashboard/i)[0]);
        await fireEvent.click(screen.getAllByText(/Plans/i)[0]);
        expect(screen.getAllByText(/Plans/i).length).toBeGreaterThan(1);
    })
})