import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from "./components/UI/Navbar/Navbar";
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import AppRouter from './components/AppRouter';

function App() {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)


  // useEffect(() => {
  //   check().then(data => {
  //     user.setUser(true)
  //     user.setIsAuth(true)
  //   }).finally(() => {
  //     setLoading(false)
  //   })
  // }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
