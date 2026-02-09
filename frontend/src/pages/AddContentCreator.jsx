import React, { useState } from 'react';
import supabase from '../client';
import './AddContentCreator.css';

const AddContentCreator = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [urls, setUrls] = useState({ youtube: '', twitter: '', instagram: '' });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUrls({ ...urls, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const newCreator = {
            name,
            url: urls,
            description,
            imageURL,
        };

        const { error } = await supabase.from('creators').insert([newCreator]);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Content creator added successfully!');
            setName('');
            setDescription('');
            setImageURL('');
            setUrls({ youtube: '', twitter: '', instagram: '' });
        }
    };

    return (
        <div className="add-creator-container">
            <h1>Add Content Creator</h1>
            <form onSubmit={handleSubmit} className="add-creator-form">
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
                <button type="submit">Add Content Creator</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AddContentCreator;