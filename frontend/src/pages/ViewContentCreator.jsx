import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContentCreator from '../components/ContentCreator';
import supabase from '../client';

const ViewContentCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError(error.message);
                setCreator(null);
            } else {
                setCreator(data);
            }

            setLoading(false);
        };

        if (id) {
            fetchCreator();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container">
                <p>Loading content creator...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <p>{error}</p>
                <Link to="/">Back to all creators</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <Link to="/">← Back to all creators</Link>
            <ContentCreator creator={creator} />
        </div>
    );
};

export default ViewContentCreator;
