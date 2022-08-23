function getCurrentDate() {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function getTemporaryDueDate() {
  const date = new Date();

  // Set the due date 1 month by create date
  return `${date.getDate()}/${date.getMonth() + 2}/${date.getFullYear()}`;
}

export default {
  getCurrentDate, getTemporaryDueDate,
};
