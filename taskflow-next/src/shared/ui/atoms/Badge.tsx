import React from 'react';

interface BadgeProps {
    label: string;
    color?: string;
    variant?: 'solid' | 'outline';
    onClick?: () => void;
}
    
const Badge = React.memo(({ label, color = '#6b7280', variant = 'solid', onClick }: BadgeProps) => {
    const style = variant === 'solid'
        ? { backgroundColor: color, color: '#fff' }
        : { border: `1px solid ${color}`, color };
    
    return (
        <span
            style={{ ...style, fontSize: '12px', padding: '2px 8px', borderRadius: '12px', cursor: onClick ? 'pointer' : 'default' }}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            onClick={onClick}
        >
            {label}
        </span>
    );
});

export { Badge };