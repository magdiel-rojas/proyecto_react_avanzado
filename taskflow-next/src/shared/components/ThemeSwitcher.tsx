'use client';
import { useLocalStorage } from '@/hooks';
import { Button } from '@/shared/ui';


const themeColors: Record<'light' | 'dark', { background: string, text: string }> = {
    light: { background: '#f8fafc', text: '#1e293b' },
    dark: { background: '#1e293b', text: '#f8fafc' },
};

const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* <span>Tema actual: <b>{theme}</b></span> */}
            <Button onClick={toggleTheme} size="sm"
                style={{
                    backgroundColor: themeColors[theme].background,
                    color: themeColors[theme].text,
                    border: `1px solid ${themeColors[theme].text}`,
                    borderRadius: '1000px',
                    width: '32px',
                    height: '32px',
                    padding: 0,
                }}>
                {theme === 'light' ? '🌙' : '☀️'}
            </Button>
        </div>
    );
};

export { ThemeSwitcher };
