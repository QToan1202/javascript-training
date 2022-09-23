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

function diffTime(date, method = Math.floor, adverb = 'ago') {
  const convertDate = new Date(date);
  const day = 1000 * 60 * 60 * 24;
  const diff = method(Math.abs(convertDate - Date.now()) / day);

  switch (diff) {
    case 0:
      return 'Today';

    case 1:
      return `${diff} day ${adverb}`;

    case 2:
    case 3:
      return `${diff} days ${adverb}`;

    default:
      return date;
  }
}

function convertDateInput(dateStr) {
  const [month, day, year] = dateStr.split('/');

  // Subtract month by 1 because JavaScript counts months from 0 to 11
  // Add day by 1 because the timezone difference
  const date = new Date(+year, +month - 1, +day + 1);
  const [dateValue] = date.toISOString().split('T');

  return dateValue;
}

function formatDate(date) {
  const [year, month, day] = date.split('-');

  return [month, day, year].join('/');
}

function timeElapse(timeStamp) {
  const minutes = 1000 * 60;
  const diff = Math.floor((Date.now() - (+timeStamp)) / minutes);
  const [dateString] = new Date(timeStamp).toISOString().split('T');

  switch (true) {
    case (diff === 0):
      return 'Just now';
    
    case (diff === 1): 
      return `${diff} min ago`;

    case (diff < 60):
      return `${diff} mins ago`;
  
    default:
      return formatDate(dateString);
  }
}

export default {
  getCurrentDate,
  getTemporaryDueDate,
  diffTime,
  convertDateInput,
  formatDate,
  timeElapse,
};
