
// capitalization of first Word in Post title and remove uneccessary
export default function formatTitle(str) {
  if (!str) return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
//  truncating long post to a limited number
export function truncatePost(text, wordLimit) {
  if (!text) return "";
  // splits on spaces, tabs, newlines
  const words = text.trim().split(/\s+/); 
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}
