import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-card border border-gray-200 shadow-card p-5 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

