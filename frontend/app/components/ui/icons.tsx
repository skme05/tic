/* Icônes SVG partagées (décoratives : aria-hidden). */

export const IconLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.6c0-1.34-.5-2.25-1.7-2.25-1.3 0-2.07.86-2.07 2.25V21H10Z" />
  </svg>
);

export const IconFacebook = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.5-1.46h1.6V4.1C16.3 4.04 15.4 4 14.4 4 11.9 4 10.3 5.5 10.3 8.3v2.2H8v3h2.3V21Z" />
  </svg>
);

export const IconX = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 3h3l-6.6 7.6L21.5 21h-5.3l-4.1-5.4L7.2 21H4.1l7-8L3.1 3h5.4l3.8 5 5.2-5Zm-1.1 16h1.5L7.6 4.5H6Z" />
  </svg>
);

export const IconEmail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

export const IconCheck = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
