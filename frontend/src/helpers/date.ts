import { date } from 'quasar'


const formatISODate = (ISODate: string) => {
  const timestamp = new Date(ISODate);

  return date.formatDate(timestamp, 'DD/MM/YYYY');
};

export { formatISODate };
