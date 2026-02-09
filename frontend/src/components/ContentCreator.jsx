import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContentCreator.module.css';

const buildSocialUrl = (platform, value) => {
    if (!value) return null;
    if (value.startsWith('http')) return value;
    const handle = value.startsWith('@') ? value.slice(1) : value;

    switch (platform) {
        case 'youtube':
            return `https://www.youtube.com/@${handle}`;
        case 'twitter':
            return `https://x.com/${handle}`;
        case 'instagram':
            return `https://www.instagram.com/${handle}`;
        default:
            return value;
    }
};

const ContentCreator = ({ creator }) => {
    if (!creator) {
        return (
            <div className={styles.contentCreator}>
                <p>Content creator not found.</p>
            </div>
        );
    }

    const name = creator.name || 'Unknown Creator';
    const description = creator.description || 'No description provided.';
    const image = creator.imageURL || 'https://via.placeholder.com/600x400?text=No+Image';

    const { youtube, twitter, instagram } = creator.url || {};

    return (
        <div className={styles.contentCreator}>
            <img className={styles.heroImage} src={image} alt={`${name} profile`} />
            <div className={styles.details}>
                <h1>{name}</h1>
                <p className={styles.description}>{description}</p>
                <div className={styles.socialLinks}>
                    {youtube && (
                        <a href={buildSocialUrl('youtube', youtube)} target="_blank" rel="noreferrer">
                            ▶ YouTube
                        </a>
                    )}
                    {twitter && (
                        <a href={buildSocialUrl('twitter', twitter)} target="_blank" rel="noreferrer">
                            𝕏 Twitter
                        </a>
                    )}
                    {instagram && (
                        <a href={buildSocialUrl('instagram', instagram)} target="_blank" rel="noreferrer">
                            ◎ Instagram
                        </a>
                    )}
                </div>
                <div className={styles.buttons}>
                    {creator.id && (
                        <Link className={styles.secondary} to={`/edit/${creator.id}`}>
                            Edit
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentCreator;