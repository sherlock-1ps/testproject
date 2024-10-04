/**
 * Convert html string to plain text
 */
export const convertHtmlToText = (html: string) => {
  return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent
}
