import React from 'react';
import styles from './ContentCreator.module.css';

const ContentCreator = () => {
    const creator = {
        name: "Even Chris",
        description: "I enjoy programming!",
        image: "https://via.placeholder.com/150",
        socialLinks: {
            youtube: "@even",
            twitter: "@even",
            instagram: "@even"
        }
    };

    return (
        <div className={styles.contentCreator}>
            <img src={creator.image} alt={`${creator.name}'s profile`} />
            <h1>{creator.name.toUpperCase()}</h1>
            <p>{creator.description}</p>
            <div className={styles.socialLinks}>
                <p>📺 YouTube: {creator.socialLinks.youtube}</p>
                <p>🐦 Twitter: {creator.socialLinks.twitter}</p>
                <p>📸 Instagram: {creator.socialLinks.instagram}</p>
            </div>
            <div className={styles.buttons}>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default ContentCreator;