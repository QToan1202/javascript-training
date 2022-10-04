import { AVATAR_URL } from '../constants/url';

/**
 * Get a random image base on ID
 * @returns String image link
 */
export default function avatar() {
  // Get a random number for 1 to 1000
  const randomID = Math.round(Math.random() * 1000) + 1;
  const size = 200;

  return `${AVATAR_URL}/${randomID}/${size}`;
}
