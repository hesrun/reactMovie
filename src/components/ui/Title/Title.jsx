import React from 'react';

const H1 = ({ children }) => {
    return <h1 className="text-2xl mb-4 md:mb-6 md:text-4xl">{children}</h1>;
};
const H2 = ({ children }) => {
    return (
        <h2 className="mt-4 mb-4 text-2xl md:mt-8 md:mb-6 md:text-4xl first:mt-0">
            {children}
        </h2>
    );
};
const H3 = ({ children }) => {
    return <h3>{children}</h3>;
};

export { H1, H2, H3 };
