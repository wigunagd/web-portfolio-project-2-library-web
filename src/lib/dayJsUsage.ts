import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export function formatTanggal(dateval: Date | string | number): string{
    return dayjs(dateval).format('DD MMMM YYYY');
}