import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from '../components/LogOutBtn';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Manage mobile menu state
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/sign-up',
      active: !authStatus,
    },
    {
      name: userData,
      slug: '/user-profile',
      active: authStatus,
    },
    {
      name: 'Admin Panel',
      slug: '/admin-panel',
      active: authStatus,
    },
    {
      name: 'Images',
      slug: '/images',
      active: authStatus,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-blue-600 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="text-white text-3xl font-bold">
            <button onClick={() => navigate('/')} className="hover:text-gray-300">
              MyApp
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="text-white font-medium hover:text-gray-300 transition duration-300"
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <button onClick={toggleMobileMenu} className="block text-white font-medium py-2 hover:text-gray-300 rounded transition duration-300">
                <LogoutBtn />
              </button>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white hover:text-gray-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-500 py-2 px-4 space-y-1">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug);
                  toggleMobileMenu();
                }}
                className="block text-white font-medium py-2 hover:bg-blue-700 rounded transition duration-300"
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && (
            <button onClick={toggleMobileMenu} className="block text-white font-medium py-2 hover:bg-blue-700 rounded transition duration-300">
              <LogoutBtn />
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
