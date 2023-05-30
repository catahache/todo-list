import { Routes as Switch, Route } from 'react-router-dom';
import CONSTANTS from '../constants/routes';
import Login from '../views/login';
import NoMatch from '../views/noMatch';
import Unauthorized from '../views/unauthorized';

const Routes = () => {
//   const { state } = useAuth();

  return (
    <Switch>
        <Route index path={CONSTANTS.HOME}/>
        {/* public routes */}
        {/* {!state.user && <Route path={CONSTANTS.ROUTES.LOGIN} element={<Login />} />} */}
        <Route path={CONSTANTS.LOGIN} element={<Login />} />
        <Route path={CONSTANTS.UNAUTHORIZED} element={<Unauthorized />} />

        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={['admin']} />}> */}
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="/forms/tournaments/:action">
            <Route path=":id" element={<Tournament />} />
            <Route path="" element={<Tournament />} />
          </Route> */}
          {/* <Route path="/tournaments" element={<Tournaments />} /> */}
          {/* <Route path="/tournaments/:id/members" element={<TournamentMembers />} /> */}
        {/* </Route> */}
        <Route path="*" element={<NoMatch />} />
      {/* </Route> */}
    </Switch>
  );
};
export default Routes;