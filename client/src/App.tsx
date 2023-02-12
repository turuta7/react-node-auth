import { observer, Observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUSER';
import UserService from './services/UserService';

function App() {

  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  if (store.isLoading) {
    return (
      <div>Loading....</div>
    )
  }

  if (!store.isAuth) {
    return (
      <div>

        <LoginForm />
        <button onClick={getUsers}>get users</button>
        {users.map(user => <div key={user.email}>{user.email}</div>)}

      </div>
    )
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</h1>
      <button onClick={() => store.logout()}>logout</button>
      <div>
        <button onClick={getUsers}>get users</button>
        {users.map(user => <div key={user.email}>{user.email}</div>)}
      </div>
    </div>
  );
}

export default observer(App);
