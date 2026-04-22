'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserAvatar } from "./UserAvatar";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const onDashboardClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setTimeout(() => {
            router.push("/");
        }, 800);
    };

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
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <UserAvatar src="/globe.svg" name="Usuario" />
                    <h1 style={{ margin: 0, fontSize: '20px' }}>Gestor de Tareas</h1>
                    <ThemeSwitcher />
                </div>
                <nav style={{ display: 'flex', gap: '16px' }}>
                    <Link href="/" style={{ color: '#fff', textDecoration: 'none' }} onClick={onDashboardClick}>{'Inicio'}</Link>
                    {/* <Link href="/tasks" style={{ color: '#fff', textDecoration: 'none' }}>Tareas</Link>
                    <Link href="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Proyectos</Link> */}
                </nav>

            </header>
            <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>{children}</main>
        </div>
    );
}