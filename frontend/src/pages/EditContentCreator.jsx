import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client';
import './EditContentCreator.css';

const EditContentCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [urls, setUrls] = useState({ youtube: '', twitter: '', instagram: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setName(data.name);
                setDescription(data.description);
                setImageURL(data.imageURL);
                setUrls(data.url || { youtube: '', twitter: '', instagram: '' });
            }
        };

        if (id) {
            fetchCreator();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUrls({ ...urls, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const updatedCreator = {
            name,
            url: urls,
            description,
            imageURL,
        };

        const { error } = await supabase
            .from('creators')
            .update(updatedCreator)
            .eq('id', id);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Content creator updated successfully!');
            navigate('/');
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Content creator deleted successfully!');
            navigate('/');
        }
    };

    return (
        <div className="edit-creator-container">
            <h1>Edit Content Creator</h1>
            <form onSubmit={handleSubmit} className="edit-creator-form">
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </label>
                <label>
                    YouTube URL:
                    <input
                        type="url"
                        name="youtube"
                        value={urls.youtube}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Twitter URL:
                    <input
                        type="url"
                        name="twitter"
                        value={urls.twitter}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Instagram URL:
                    <input
                        type="url"
                        name="instagram"
                        value={urls.instagram}
                        onChange={handleInputChange}
                    />
                </label>
                <div className="button-group">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleDelete} className="delete-button">
                        Delete
                    </button>
                </div>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default EditContentCreator;