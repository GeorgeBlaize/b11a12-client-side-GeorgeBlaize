import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left space-y-6 md:space-y-0">
        
        {/* Left Section */}
        <div>
          <img src="/logo.png" alt="Logo" className="h-12 mx-auto md:mx-0 mb-4" />
          <p className="text-sm md:text-base">
            Tourism Guide – Your gateway to exploring Bangladesh!
          </p>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Connect with Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/developer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/developer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/developer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>

      </div>

      {/* Optional bottom line for small screens */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Tourism Guide. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
