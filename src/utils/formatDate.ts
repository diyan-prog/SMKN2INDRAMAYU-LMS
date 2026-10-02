import { format as formatDateFn, parseISO, differenceInDays, isToday, isTomorrow } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Format tanggal ke format Indonesia
 * @param date - Tanggal (string atau Date object)
 * @param format - Format output (default: 'd MMMM yyyy')
 */
export function formatDate(date: string | Date, format: string = 'd MMMM yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDateFn(dateObj, format, { locale: id });
  } catch {
    return 'Tanggal tidak valid';
  }
}

/**
 * Format tanggal dan waktu ke format Indonesia
 */
export function formatDateTime(date: string): string {
  try {
    const dateObj = parseISO(date);
    return formatDateFn(dateObj, 'd MMMM yyyy, HH:mm', { locale: id });
  } catch {
    return 'Tanggal tidak valid';
  }
}

/**
 * Format waktu ke format HH:mm
 */
export function formatTime(time: string): string {
  try {
    const dateObj = parseISO(`2000-01-01T${time}`);
    return formatDateFn(dateObj, 'HH:mm');
  } catch {
    return time;
  }
}

/**
 * Cek apakah deadline sudah lewat
 */
export function isDeadlinePassed(deadline: string): boolean {
  const deadlineDate = parseISO(deadline);
  const now = new Date();
  return deadlineDate < now;
}

/**
 * Hitung sisa waktu ke deadline (dalam jam)
 */
export function getTimeRemaining(deadline: string): number {
  const deadlineDate = parseISO(deadline);
  const now = new Date();
  const diffInMs = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60));
}

/**
 * Format deadline dengan status visual
 */
export function formatDeadline(deadline: string): { text: string; color: string } {
  const daysRemaining = differenceInDays(parseISO(deadline), new Date());
  
  if (isToday(parseISO(deadline))) {
    return { text: 'Hari ini', color: 'text-primary-dark font-semibold' };
  }
  if (isTomorrow(parseISO(deadline))) {
    return { text: 'Besok', color: 'text-primary-dark font-semibold' };
  }
  if (daysRemaining === 1) {
    return { text: 'Besok', color: 'text-primary-dark font-semibold' };
  }
  if (daysRemaining > 0 && daysRemaining <= 3) {
    return { text: `${daysRemaining} hari lagi`, color: 'text-accent font-semibold' };
  }
  if (daysRemaining <= 0) {
    return { text: `Terlambat ${Math.abs(daysRemaining)} hari`, color: 'text-danger font-semibold' };
  }
  return { text: formatDate(deadline), color: 'text-gray-600' };
}

/**
 * Format jam mulai-selesai menjadi range
 */
export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}
