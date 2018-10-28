import moment from 'moment';

export function fromNow(ts) {
  return moment.unix(ts).format("DD/MM/YYYY HH:mm:ss")
}
