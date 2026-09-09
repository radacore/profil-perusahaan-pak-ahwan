import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'h4', 'blockquote', 'code', 'pre', 'hr', 'span', 'div', 'img', 'figure', 'figcaption'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'src', 'alt', 'width', 'height', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}
