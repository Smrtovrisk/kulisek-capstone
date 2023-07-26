import logo from './logo.svg';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import {Routes,Route} from 'react-router-dom'
import Admin from './Admin';
import Customer from './Customer';
import AddMedicine from './AddMedicine';
import ViewMedicine from './ViewMedicine';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
     

     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path='/admin' element={<Admin/>}>
          <Route path="addMedicine" element={<AddMedicine/>}></Route>
          <Route path="viewMedicine" element={<ViewMedicine/>}></Route>
      </Route>
      <Route path='/customer' element={<Customer/>}>
      <Route path="viewMedicine" element={<ViewMedicine/>}></Route>
      <Route path="cart" element={<Cart/>}></Route>
      </Route>
     </Routes>
    </div>
  );
}

export default App;