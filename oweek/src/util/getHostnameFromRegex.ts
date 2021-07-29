/**
 * function to parse the domain name from a string. Ex: (https://www.youtube.com/watch?123123) => youtube.com
 */
const getHostnameFromRegex = (url: string): string | null => {
  // run against regex
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  // extract hostname (will be null if no match is found)
  return matches && matches[1];
};

export default getHostnameFromRegex;
