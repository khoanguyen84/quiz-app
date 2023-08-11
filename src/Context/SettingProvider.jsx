import React, { createContext, useState } from "react";

export const SettingContext = createContext();
function SettingProvider({ children }) {
    const [setting, setSetting] = useState({
        amount: 5,
        difficulty: 'easy',
        category: 'General Knowledge'
    })

    return (
        <SettingContext.Provider value={{setting, setSetting}}>
            {children}
        </SettingContext.Provider>
    )
}

export default SettingProvider;