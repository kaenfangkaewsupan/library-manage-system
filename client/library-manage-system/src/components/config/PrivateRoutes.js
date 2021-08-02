import { Switch, Route, Redirect } from 'react-router-dom';

import ConfigRoutes from './routes';

export default function PrivateRoutes(props) {
	const role = props.role;

	const allowedRoutes = ConfigRoutes[role].allowedRoutes;
	const redirectRoute = ConfigRoutes[role].redirectRoute;

	return (
		<Switch>
			{allowedRoutes.map(route => (
				<Route exact path={route.url} key={route.url}>
					<route.component setRole={props.setRole} />
				</Route>
			))}
			<Redirect to={redirectRoute} />
		</Switch>
	);
}
