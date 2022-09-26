/**
 * Get the current date with then return with format mm/dd/yyy
 * @returns String
 */
function getCurrentDate() {
  const date = new Date();

  /**
   * getMonth() return from 0-11
   * Plus 1 to getMonth() to get the current month
   */
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

/**
 * Set due date by 1 month with the current month
 * @returns String
 */
function getTemporaryDueDate() {
  const date = new Date();

  /**
   * date.getMonth() + 1 to get the current month
   * Plus more 1 to set the due date next month
   */
  return `${date.getMonth() + 1 + 1}/${date.getDate()}/${date.getFullYear()}`;
}

/**
 * Calculating diff time in due date and created date
 * @param {String} date 
 * @param {String} method 
 * @param {String} adverb 
 * @returns String
 */
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

/**
 * Convert string date to match format with input date type
 * @param {String} dateStr 
 * @returns String
 */
function convertDateInput(dateStr) {
  const [month, day, year] = dateStr.split('/');

  // Subtract month by 1 because JavaScript counts months from 0 to 11
  // Add day by 1 because the timezone difference
  const date = new Date(+year, +month - 1, +day + 1);
  const [dateValue] = date.toISOString().split('T');

  return dateValue;
}

/**
 * Convert date string from yyyy-mm-dd to mm/dd/yyyy
 * @param {String} date 
 * @returns String
 */
function formatDate(date) {
  const [year, month, day] = date.split('-');

  return [month, day, year].join('/');
}

/**
 * Calculate the time elapsed when added comment to present
 * @param {String} timeStamp 
 * @returns String
 */
function timeElapse(timeStamp) {
  const minutes = 1000 * 60;
  const diffMins = Math.floor((Date.now() - (+timeStamp)) / minutes);
  const [dateString] = new Date(timeStamp).toISOString().split('T');
  const diffHours = Math.floor(diffMins / 60);

  switch (true) {
    case (diffMins === 0):
      return 'Just now';
    
    case (diffMins === 1): 
      return `${diffMins} min ago`;

    case (diffMins < 60):
      return `${diffMins} mins ago`;

    case (diffMins < (60 * 24)):
      
      return `${diffHours} ${(diffHours === 1) ? 'hour' : 'hours'} ago`;
  
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
