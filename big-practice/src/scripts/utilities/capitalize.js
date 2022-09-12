/**
 * Convert a lower case string with dashes to upper case string without dashes
 * @param {String} state 
 * @returns String
 */
export default function capitalize(state) {
  const lower = state.toLowerCase();
  const capital = state.charAt(0).toUpperCase() + lower.slice(1);

  return capital.replace('-', ' ');
}
