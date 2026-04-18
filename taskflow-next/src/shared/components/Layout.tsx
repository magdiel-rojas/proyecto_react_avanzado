import Link from "next/link";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <header style={{
                backgroundColor: '#1e293b',
                color: '#fff',
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ margin: 0, fontSize: '20px' }}>Gestor de Trabajo</h1>
                <nav style={{ display: 'flex', gap: '16px' }}>
                    <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
                    {/* <Link href="/tasks" style={{ color: '#fff', textDecoration: 'none' }}>Tareas</Link>
                    <Link href="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Proyectos</Link> */}
                </nav>
            </header>
            <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>{children}</main>
        </div>
    );
}