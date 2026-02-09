import { useRoutes, Link, useEffect, useState } from 'react-router-dom';
import './App.css'
import './styles/theme.css';
import ViewContentCreators from './pages/ViewContentCreators';
import AddContentCreator from './pages/AddContentCreator';
import EditContentCreator from './pages/EditContentCreator';
import DeleteContentCreator from './pages/DeleteContentCreator';
import { supabase } from './client';

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
    { path: '/add', element: <AddContentCreator /> },
    { path: '/edit/:id', element: <EditContentCreator /> },
    { path: '/delete/:id', element: <DeleteContentCreator /> },
  ]);

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">View All Creators</Link></li>
          <li><Link to="/add">Add Creator</Link></li>
        </ul>
      </nav>
      {routes}
    </>
  );
}

export default App
