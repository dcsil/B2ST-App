import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContextProvider } from "../context/AuthContext"
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import App from '../App';

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

describe("Campaign page rendering",()=>{
    beforeAll(()=>{
        localStorage.setItem('user', JSON.stringify({email:"a@a.com"}));
    })
    
    test("Contact dialog should pop up after clicking on add Contact", async () =>{
        renderwithRouter(<App />);
        await fireEvent.click(screen.getAllByText(/Dashboard/i)[0]);
        await fireEvent.click(screen.getAllByText(/Campaign/i)[0]);
        await fireEvent.click(screen.getByRole('button', {name: /AddContact/i}));
        expect(screen.getAllByText(/Add Contact/i).length).toBeGreaterThan(0);
    })
})