import { Routes as Switch, Route } from 'react-router-dom';
import CONSTANTS from '../constants/routes';
import Home from '../views/home';
import Login from '../views/login';
import NoMatch from '../views/noMatch';
import ToDoList from '../views/todoList';
import Unauthorized from '../views/unauthorized';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import RequireAuth from './RequireAuth';

const Routes = () => {
  const { auth } = useSelector((state: RootState) => state.authData);


  return (
    <Switch>
      {!auth.token && <Route path={CONSTANTS.LOGIN} element={<Login />} />} //TODO  / login
      <Route path={CONSTANTS.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={CONSTANTS.NOMATCH} element={<NoMatch />} />

      <Route element={<RequireAuth />}>
        <Route index path={CONSTANTS.HOME} element={<Home />} />
        <Route path={CONSTANTS.TODOS} element={<ToDoList />} />
      </Route>
    </Switch>
  );
};
export default Routes;