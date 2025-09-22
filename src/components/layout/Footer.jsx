import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <img src="/logo.png" alt="Logo" className="h-12 mb-4" />
          <p>Tourism Guide - Your gateway to exploring Bangladesh!</p>
        </div>
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-bold">Connect with Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://github.com/developer" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/developer" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <a href="https://twitter.com/developer" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;