//  Client Component: requiere 'use client' porque utiliza hooks de React (useState, useContext, useMemo).
'use client'
import { createContext, useContext, useState, useMemo } from 'react';

const ThemeStateContext = createContext<{ theme: string } | null>(null);
const ThemeDispatchContext = createContext<{ setTheme: React.Dispatch<React.SetStateAction<string>> } | null>(null);

type ThemeProviderProps = {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState('light');
    const stateValue = useMemo(() => ({ theme }), [theme]);
    const dispatchValue = useMemo(() => ({ setTheme }), []);
    return (
        <ThemeStateContext.Provider value={stateValue}>
            <ThemeDispatchContext.Provider value={dispatchValue}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeStateContext.Provider>
    );
}
export function useTheme() {
    const context = useContext(ThemeStateContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
export function useThemeActions() {
    const context = useContext(ThemeDispatchContext);
    if (!context) {
        throw new Error('useThemeActions must be used within ThemeProvider');
    }
    return context;
}