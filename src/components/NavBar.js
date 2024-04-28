import { useLocation, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <nav className="bg-black shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-3xl py-2 pl-4 font-bold">SPACEX API</h1>
        <ul className="flex flex-row space-x-4 pr-4">
          <li
            onClick={() => navigate('/')}
            className={`text-white hover:text-gray-300 cursor-pointer ${
              pathName === '/' ? 'text-gray-300' : ''
            }`}
          >
            Launches
          </li>
          <li
            onClick={() => navigate('/histories')}
            className={`text-white hover:text-gray-300 cursor-pointer ${
              pathName === '/histories' ? 'text-gray-300' : ''
            }`}
          >
            Histories
          </li>
        </ul>
      </div>
    </nav>
  );
};
