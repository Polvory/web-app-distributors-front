import '@telegram-apps/telegram-ui/dist/styles.css';
import './App.css';
import React, { useEffect } from "react";
import Home from './pages/Home'
import TypeAdd from './pages/TypeAdd';
import TaskAdmin from './pages/TaskAdmin'
import TaskUser from './pages/TaskUser'
import UsresSettings from './pages/UsresSettings'
import AdressesSettings from './pages/AdressesSettings'
import Menu from './components/Menu'
import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TYPE_ADD, TASK_ADMIN, TASK_USER, USRES_SETTINGS, ADRESSES_SETTINGS } from './constants/routes'
// import { observer } from 'mobx-react-lite';
import { userStore } from './stores/UserStore';
import { Login } from './api/api'

function App() {


  const tgMetodGetId = () => {
    return '2025616110'
  }


  async function initUser(tg_user_id) {
    const userData = await Login(tg_user_id);
    if (userData) {
      // alert(userData)

      console.log("Записали юзера в store:", userData.user);
      userStore.setUser(userData.user); // записываем пользователя в store
    }
  }


  useEffect(() => {
    initUser(tgMetodGetId())

  }, []);


  return (
    <AppRoot>
      <Router>
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={TYPE_ADD} element={<TypeAdd />} />
            <Route path={TASK_ADMIN} element={<TaskAdmin />} />
            <Route path={TASK_USER} element={<TaskUser />} />
            <Route path={USRES_SETTINGS} element={<UsresSettings />} />
            <Route path={ADRESSES_SETTINGS} element={<AdressesSettings />} />
          </Routes>
        </main>
      </Router>
    </AppRoot>
  );
}

export default App;
