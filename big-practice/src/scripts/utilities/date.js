function getCurrentDate() {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getTemporaryDueDate() {
  const date = new Date();

  // Set the due date 1 month by create date
  return `${date.getMonth() + 2}/${date.getDate()}/${date.getFullYear()}`;
}

function diffTime(date) {
  const convertDate = new Date(date);
  const day = 1000 * 60 * 60 * 24;
  const diff = Math.round(Math.abs(convertDate - Date.now()) / day);

  switch (diff) {
    case 0:
      return 'Today';

    case 1:
      return `${diff} day ago`;

    case 2:
    case 3:
      return `${diff} days ago`;

    default:
      return date;
  }
}

export default {
  getCurrentDate,
  getTemporaryDueDate,
  diffTime,
};
