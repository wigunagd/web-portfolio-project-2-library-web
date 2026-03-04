import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export function formatTanggal(dateval: Date | string | number, formatTgl: string): string{
    return dayjs(dateval).format(formatTgl);
}