import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [isToogle, setIsToogle] = useState(false);

    return (
        <StateContext.Provider value={{ isToogle, setIsToogle }}>
            {children}
        </StateContext.Provider>
    );
};