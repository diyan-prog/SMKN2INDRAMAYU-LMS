import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 text-red-600 rounded-full">
            <AlertCircle size={48} />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl font-semibold text-gray-700">Halaman Tidak Ditemukan</p>
          <p className="text-gray-500 mt-2">
            Halaman yang Anda cari tidak ada atau telah dihapus.
          </p>
        </div>
        <Button
          onClick={() => navigate('/login')}
          fullWidth
          size="lg"
        >
          Kembali ke Login
        </Button>
      </div>
    </div>
  );
}

