type Props = {
  contactEmail?: string | null;
  messengerUrl?: string | null;
  viberUrl?: string | null;
};

export default function ContactIcons({
  contactEmail,
  messengerUrl,
  viberUrl,
}: Props) {
  const hasAny = contactEmail || messengerUrl || viberUrl;
  if (!hasAny) return null;

  return (
    <div className="flex justify-center gap-5 mb-8">
      {contactEmail && (
<a        
          href={`mailto:${contactEmail}`}
          title="Email us"
          className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 transition transform hover:scale-110 flex items-center justify-center shadow-md"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="2" />
            <path d="M3 6L12 13L21 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
      {messengerUrl && (
<a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Message us"
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 transition transform hover:scale-110 flex items-center justify-center shadow-md"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C6.5 3 2 7 2 12c0 2.6 1.1 4.9 2.9 6.6V22l3-1.6c1.3.4 2.7.6 4.1.6 5.5 0 10-4 10-9s-4.5-9-10-9z"
              fill="white"
            />
            <path
              d="M6.5 14.5L10 11L12.5 13L17.5 9L13.5 13.2L11 11.2L6.5 14.5Z"
              fill="#3b82f6"
            />
          </svg>
        </a>
      )}
      {viberUrl && (
<a
          href={viberUrl}
          title="Chat on Viber"
          className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 transition transform hover:scale-110 flex items-center justify-center shadow-md"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C7 3 3 6.5 3 11c0 2.8 1.6 5.3 4 6.8-.1.9-.4 2.2-1 3.2 1.4-.3 2.9-1 3.9-1.7.7.1 1.4.2 2.1.2 5 0 9-3.5 9-8S17 3 12 3z"
              stroke="white"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d="M9 8.5c0 3.5 2.5 6 6 6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="15" cy="14.5" r="1.2" fill="white" />
          </svg>
        </a>
      )}
    </div>
  );
}