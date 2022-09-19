function getCurrentDate() {
  const date = new Date();

  /**
   * getMonth() return from 0-11
   * Plus 1 to getMonth() to get the current month
   */
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getTemporaryDueDate() {
  const date = new Date();

  /**
   * date.getMonth() + 1 to get the current month
   * Plus more 1 to set the due date next month
   */
  return `${date.getMonth() + 1 + 1}/${date.getDate()}/${date.getFullYear()}`;
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
