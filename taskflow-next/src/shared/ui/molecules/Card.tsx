// Client Component: requiere 'use client' porque maneja eventos (onClick) en el cliente.
'use client'
interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    color?: string;
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export function Card({ children, className = '', onClick, color = '#fff', ...props }: CardProps) {
    return (
        <div
            style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '8px',
                backgroundColor: '#fff',
                borderLeft: `4px solid ${color}`,
            }}
            className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

function CardHeader({ title, subtitle, actions }: CardHeaderProps) {
    return (
        <div className="items-start justify-between mb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }} className="font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                {actions && <div>{actions}</div>}
            </div>
        </div>
    );
}

Card.Header = CardHeader;