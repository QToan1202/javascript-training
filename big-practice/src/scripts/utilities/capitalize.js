/**
 * Convert a lower case string with dashes to upper case string without dashes
 * @param {String} state 
 * @returns String
 */
export default function Capitalize(state) {
  const capitalizeString = state[0].toUpperCase() + state.substring(1).toLowerCase();
  const removeDashString = capitalizeString.replace('-', ' ');

  return removeDashString;
}
