import React from 'react';

const Button = ({ onClick, className, children }) => {
    const baseBtn =
        'inline-flex justify-center items-center font-bold gap-4 border border-white rounded-lg h-12 px-8 cursor-pointer hover:bg-white hover:text-indigo-950 transition-all';

    return (
        <button onClick={onClick} className={`${baseBtn} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
