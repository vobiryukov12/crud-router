import './errorMessage.scss';

interface IErrorMessageProps {
  error: string
}

export function ErrorMessage({ error }: IErrorMessageProps) {
  return (
    <div className='error'>{error}</div>
  );
}
