import { Button } from '../Button/Button.tsx';
import './pagination.css';
import { useNavigate } from 'react-router';
import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  nextPage: string | null;
  previousPage: string | null;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  nextPage,
  previousPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const navigate = useNavigate();

  const handleClickPrevious = () => {
    setCurrentPage((prev: number) => (previousPage ? prev - 1 : prev));
    navigate(`/?page=${currentPage - 1}`, { replace: true });
  };

  const handleClickNext = () => {
    setCurrentPage((prev: number) => (nextPage ? prev + 1 : prev));
    navigate(`/?page=${currentPage + 1}`, { replace: true });
  };

  return (
    <div className="paginationContainer">
      <Button
        label={'Previous'}
        onClick={handleClickPrevious}
        disabled={!previousPage}
      />
      <Button label={'Next'} onClick={handleClickNext} disabled={!nextPage} />
    </div>
  );
};
