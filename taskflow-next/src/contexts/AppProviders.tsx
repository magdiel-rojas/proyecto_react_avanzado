'use client'
import { ThemeProvider } from './ThemeContext';

export function AppProviders({ children }: React.PropsWithChildren) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}