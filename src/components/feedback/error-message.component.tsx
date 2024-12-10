interface ErrorMessageProps {
  message: string | string[];
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return Array.isArray(message) ? (
    <ul>
      {message.map((m, index) => (
        <li key={`error-message-${index}`}>{m}</li>
      ))}
    </ul>
  ) : (
    <span>{message}</span>
  );
}
