import { Link } from "react-router-dom";
import { MainIcon, LogoutIcon } from "../assets/icons";
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const { user, logoutUser } = useDashboardContext();

  return (
    <header className="p-2 md:p-4 flex justify-between items-center">
      <Link to='/dashboard' className="flex items-center gap-1">
        <MainIcon />
        <span className="font-bold text-xl">VideoVault</span>
      </Link>
      <div className="hidden md:block">
        <div className="font-bold text-xl border border-gray-500 rounded-full px-4 py-1 shadow shadow-gray-300">
          Welcome: {user?.name}
        </div>
      </div>
      
      <div>
        <button
          type="button"
          onClick={logoutUser}
          className="mx-2 flex font-bold text-xl"
        >
          Logout
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
