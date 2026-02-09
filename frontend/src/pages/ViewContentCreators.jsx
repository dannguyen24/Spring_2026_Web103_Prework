import React from 'react';
import ContentCreator from '../components/ContentCreator';

const ViewContentCreators = ({ contentCreators }) => {
    return (
        <div className="container">
            {contentCreators && contentCreators.length > 0 ? (
                contentCreators.map((creator) => (
                    <ContentCreator key={creator.id} {...creator} />
                ))
            ) : (
                <p>No content creators found.</p>
            )}
        </div>
    );
};

export default ViewContentCreators;