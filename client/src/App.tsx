// Import react-router-dom outlet tag
import { Outlet } from 'react-router-dom';
// Import the navbar
import Navbar from './components/Navbar';


// Function to build the main page component
function App() {

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

// Export the main page component
export default App
