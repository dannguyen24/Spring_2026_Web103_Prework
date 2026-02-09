import { useRoutes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import './styles/theme.css';
import ViewContentCreators from './pages/ViewContentCreators';
import ViewContentCreator from './pages/ViewContentCreator';
import AddContentCreator from './pages/AddContentCreator';
import EditContentCreator from './pages/EditContentCreator';
import DeleteContentCreator from './pages/DeleteContentCreator';
import supabase from './client';
function App() {
  const [contentCreators, setContentCreators] = useState([]);

  useEffect(() => {
    const fetchContentCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching content creators:', error);
      } else {
        setContentCreators(data);
      }
    };

    fetchContentCreators();
  }, []);

  const routes = useRoutes([
    { path: '/', element: <ViewContentCreators contentCreators={contentCreators} /> },
    { path: '/creators/:id', element: <ViewContentCreator /> },
    { path: '/add', element: <AddContentCreator /> },
    { path: '/edit/:id', element: <EditContentCreator /> },
    { path: '/delete/:id', element: <DeleteContentCreator /> },
  ]);

  return (
    <div className="app">
      <nav className="nav-container">
        <div className="nav-buttons">
          <Link to="/" className="nav-button">
            View All Creators
          </Link>
          <Link to="/add" className="nav-button">
            Add Creator
          </Link>
        </div>
      </nav>
      <main className="main-content">
        {routes}
      </main>
    </div>
  );
}

export default App
