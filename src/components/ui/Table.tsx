import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => ReactNode;
  className?: string;
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  rowClickable?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  loading,
  empty,
  emptyMessage = 'Data tidak tersedia',
  rowClickable = false,
  onRowClick,
  className,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (empty || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={keyExtractor(row, idx)}
              className={cn(
                'border-b border-gray-100 hover:bg-gray-50 transition-colors',
                rowClickable ? 'cursor-pointer' : ''
              )}
              onClick={() => rowClickable && onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn('px-6 py-4 text-sm text-gray-700', col.className)}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

