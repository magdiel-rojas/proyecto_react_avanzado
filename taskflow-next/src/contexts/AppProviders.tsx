// Client Component: contiene 'use client' porque provee contextos React y puede usar hooks.
'use client'
import { ThemeProvider } from './ThemeContext';

export function AppProviders({ children }: React.PropsWithChildren) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}