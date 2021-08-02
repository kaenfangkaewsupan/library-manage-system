import { useState } from 'react';

import PrivateRoutes from './components/config/PrivateRoutes';
import localStorageService from './components/services/localStorageService';

function App() {
	const [role, setRole] = useState(localStorageService.getRole());

	return (
		<>
			<PrivateRoutes role={role} setRole={setRole} />
		</>
	);
}

export default App;
