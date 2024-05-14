import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/navbar.component';
import Employees from './components/employees.component';

function App() {
  return (
    <div className="App">
      <div className='d-flex flex-column'>
        <NavbarHeader />
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
          <div style={{ width: '80%' }}>
            <Employees />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
