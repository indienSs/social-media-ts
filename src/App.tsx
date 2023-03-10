import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import NotFound from "./components/NotFound";
import { apiUrl } from "./assets/apiUrl";
import { User } from "./types/userType";
import axios from "axios";
import { setUsers } from "./redux/userReducer/slice";
import { useDispatch } from "react-redux";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>(apiUrl);
      dispatch(setUsers(data));
    };
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
