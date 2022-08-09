
import './App.css';
import Headers from './Components/Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Register from './Components/Routers/Auth/Register';
import Login from './Components/Routers/Auth/Login';
import Vacations from './Components/Routers/Vacations/Vacations';
import AddVacation from './Components/Routers/Vacations/AddVacation';
import Reports from './Components/Routers/Reports/Reports';
import MyVacations from './Components/Routers/Vacations/MyVacations';
import UpdateVacation from './Components/Routers/Vacations/UpdateVacation'


function App() {

  return (
    <div className="App">


      <BrowserRouter>
        <Headers />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/vacations' element={<Vacations />} />
          <Route path='/add-vacation' element={<AddVacation />} />
          <Route path='/edit-vacation/:v_id' element={<UpdateVacation />} />
          <Route path='/myVacations' element={<MyVacations />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/*' element={<div className='container text-danger'> <h2>Page 404, Not found!</h2> </div>} />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
