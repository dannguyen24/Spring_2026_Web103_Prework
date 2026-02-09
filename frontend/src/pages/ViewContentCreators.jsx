import React from 'react';
import CreatorCard from '../components/CreatorCard';

const ViewContentCreators = ({ contentCreators }) => {
    return (
        <div className="container">
            <h1>Content Creators</h1>
            {contentCreators && contentCreators.length > 0 ? (
                <div className="creators-grid">
                    {contentCreators.map((creator) => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            ) : (
                <p>No content creators found.</p>
            )}
        </div>
    );
};

export default ViewContentCreators;