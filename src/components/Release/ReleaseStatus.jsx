import React from 'react';

const ReleaseStatus = ({ type, children }) => {
    let styleClass = '';

    switch (type.toLowerCase()) {
        case 'released':
        case 'returning':
        case 'returning series':
            styleClass = 'text-green-600';
            break;
        case 'cancelled':
            styleClass = 'text-red-600';
            break;
        case 'postponed':
            styleClass = 'text-orange-600';
            break;
        case 'tba':
            styleClass = 'text-blue-600';
            break;
        case 'rumored':
            styleClass = 'text-gray-600';
            break;
        case 'ended':
            styleClass = 'text-gray-400';
            break;
        case 'in production':
            styleClass = 'text-yellow-600';
            break;
        case 'post production':
            styleClass = 'text-purple-600';
            break;
        case 'on air':
            styleClass = 'text-teal-600';
            break;
        default:
            styleClass = 'text-gray';
            break;
    }

    return (
        <div className={`font-bold rounded-2xl uppercase ${styleClass}`}>
            {children}
        </div>
    );
};

export default ReleaseStatus;
