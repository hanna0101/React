import './ErrorIndicatorStyles.css';
export const ErrorIndicator = () => {
  return (
    <div className="error-indicator" data-testid="error-indicator">
      <h2>Error</h2>
      <p>Something has gone wrong. Please try again later.</p>
    </div>
  );
};
