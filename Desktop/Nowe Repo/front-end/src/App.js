import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
}
from 'react-router-dom';
import SignIn from './Pages/Login';
import SignUp from './Pages/SignUp';
import Data from './Pages/Data'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn/>} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Data" element={<Data />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
