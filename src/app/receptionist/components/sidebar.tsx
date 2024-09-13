const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-100 p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Hover Sprite</h2>
        <nav className="space-y-4">
          <a href="/receptionist/dashboard" className="block p-2 bg-gray-200 rounded hover:bg-gray-300">
            Dashboard
          </a>
          <a href="/receptionist/bookings" className="block p-2 bg-gray-200 rounded hover:bg-gray-300">
            Bookings
          </a>
          <a href="/receptionist/orders" className="block p-2 bg-gray-200 rounded hover:bg-gray-300">
            Orders
          </a>
          <a href="/receptionist/settings" className="block p-2 bg-gray-200 rounded hover:bg-gray-300">
            Settings
          </a>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  