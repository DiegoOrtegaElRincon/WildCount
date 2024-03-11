import React from 'react';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children} {/* Make sure to render children */}
    </div>
  )
}

export default Layout;