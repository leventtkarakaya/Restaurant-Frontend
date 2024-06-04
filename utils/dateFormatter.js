import moment from "moment";
export function dateFormatter(date) {
  if (!date) return;
  return moment(date).format("DD/MM/YYYY HH:mm");
}
