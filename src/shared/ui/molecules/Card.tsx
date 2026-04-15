interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export function Card({ children, className = '', onClick }: CardProps) {
    return (
        <div
            style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '8px',
                backgroundColor: '#fff',
            }}
            className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

function CardHeader({ title, subtitle, actions }: CardHeaderProps) {
    return (
        <div className="flex items-start justify-between mb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }} className="font-semibold text-gray-900">{title}                </h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                {actions && <div>{actions}</div>}
            </div>
        </div>
    );
}

Card.Header = CardHeader;