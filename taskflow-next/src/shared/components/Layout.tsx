// Server Component: no contiene 'use client', se ejecuta en el servidor por defecto.
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

function DashboardSkeleton() {
    return (
        <span
            className="inline-block h-6 w-24 rounded bg-gray-400 animate-pulse"
            style={{ verticalAlign: 'middle' }}
        />
    );
}

function UserAvatar({src, name}: {src: string, name: string}) {
    return (
        <Image
            src={src}
            alt={name }
            width={40}
            height={40}
            className="rounded-full"
        />
    );
}

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onDashboardClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
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
                </div>
                <nav style={{ display: 'flex', gap: '16px' }}>
                    <Link href="/" style={{ color: '#fff', textDecoration: 'none', pointerEvents: loading ? 'none' : 'auto' }} onClick={onDashboardClick}>
                        {loading ? <DashboardSkeleton /> : 'Dashboard'}
                    </Link>
                    {/* <Link href="/tasks" style={{ color: '#fff', textDecoration: 'none' }}>Tareas</Link>
                    <Link href="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Proyectos</Link> */}
                </nav>
            </header>
            <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>{children}</main>
        </div>
    );
}