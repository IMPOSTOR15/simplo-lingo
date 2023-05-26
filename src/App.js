import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from "./components/UI/Navbar/Navbar";
import { useContext,  useEffect,  useState } from 'react';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import { check } from './http/userAPI';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  console.log(process.env.REACT_APP_API_URL);

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
});

export default App;
