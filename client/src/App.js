import AppBar from './components/appBar.js';
import { Outlet } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { getUser } from './store/auth';
import Cookies from 'js-cookie';
import './load.css';

function App() {
  const token = Cookies.get("user_token");
  // const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },  
    });
    if (res.ok) {
      const user = await res.json();
      dispatch(getUser(user));
    }
    setIsLoading(false);
  }


  useEffect(() => {
    fetchUser();
  }, []);
  
  if (isLoading) {
    return <div className="load"></div>;
  }


  return (
    <>
      <AppBar />
      < Outlet />
    </>
  );
}

export default App;
