import { MainIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import main from "../assets/main.svg";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-12">
      <nav className="fixed top-0 left-0 p-4">
        <MainIcon />
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            Video<span className="text-blue-500">Vault</span>
          </h1>
          <p className="text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
            quis, labore pariatur nisi voluptatibus culpa dolorem nesciunt! Ut
            architecto consequatur reprehenderit, voluptates dolorem vitae
            nesciunt impedit temporibus, nam molestiae officiis.
          </p>
          <div className="mt-4">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-4 transition duration-300"
            >
              Login Page
            </Link>
            <Link
              to="/register"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition duration-300"
            >
              Register Page
            </Link>
          </div>
        </div>
        <img
          src={main}
          alt="Augmented reality"
          className="w-full md:max-w-xl mx-auto"
        />
      </div>
    </div>
  );
};

export default Landing;
