import React from 'react';

const PageError = ({ children }) => {
    return (
        <div className="bg-red-500/50 text-center py-4 rounded-2xl">
            {children}
        </div>
    );
};

export default PageError;
