import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  className?: string;
}

export function BackButton({ label = 'Kembali', className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-700 transition ${className}`}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
}

