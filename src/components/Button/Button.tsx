import './button.css';

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  onClick,
  label,
  type = 'button',
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
