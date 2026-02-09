import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreatorCard.module.css';

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

const normalizeUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
};

const CreatorCard = ({ creator }) => {
    const navigate = useNavigate();

    if (!creator) {
        return null;
    }

    const name = creator.name || 'Unknown Creator';
    const description = creator.description || 'No description provided.';
    const image = creator.image || creator.image_url || creator.imageURL || 'https://via.placeholder.com/600x400?text=No+Image';

    const youtube = creator.youtube || creator.youtube_url || creator.socialLinks?.youtube;
    const twitter = creator.twitter || creator.twitter_url || creator.socialLinks?.twitter;
    const instagram = creator.instagram || creator.instagram_url || creator.socialLinks?.instagram;

    const personalUrl = creator.url || creator.website || creator.personalUrl;

    const handleCardClick = () => {
        if (creator.id) {
            navigate(`/creators/${creator.id}`);
        }
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && handleCardClick()}>
            <img className={styles.avatar} src={image} alt={`${name} profile`} />
            <div className={styles.content}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.description}>{description}</p>

                <div className={styles.socialRow}>
                    {youtube && (
                        <a className={styles.iconButton} href={buildSocialUrl('youtube', youtube)} target="_blank" rel="noreferrer" aria-label="YouTube" onClick={stopPropagation}>
                            ▶
                        </a>
                    )}
                    {twitter && (
                        <a className={styles.iconButton} href={buildSocialUrl('twitter', twitter)} target="_blank" rel="noreferrer" aria-label="Twitter" onClick={stopPropagation}>
                            𝕏
                        </a>
                    )}
                    {instagram && (
                        <a className={styles.iconButton} href={buildSocialUrl('instagram', instagram)} target="_blank" rel="noreferrer" aria-label="Instagram" onClick={stopPropagation}>
                            ◎
                        </a>
                    )}
                </div>

                <div className={styles.actionRow}>
                    {personalUrl && (
                        <a className={styles.actionButton} href={normalizeUrl(personalUrl)} target="_blank" rel="noreferrer" onClick={stopPropagation}>
                            More Info
                        </a>
                    )}
                    {creator.id && (
                        <Link className={styles.actionButton} to={`/edit/${creator.id}`} onClick={stopPropagation}>
                            Edit
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatorCard;
