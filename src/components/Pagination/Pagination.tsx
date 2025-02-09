import { useNavigate } from 'react-router';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '../Button/Button.tsx';

import './PaginationStyles.css';

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
    if (!previousPage) return;

    setCurrentPage(Math.max(currentPage - 1, 0));
    navigate(`/page/${currentPage - 1}`);
  };

  const handleClickNext = () => {
    if (!nextPage) return;

    setCurrentPage(currentPage + 1);
    navigate(`/page/${currentPage + 1}`);
  };

  return (
    <div className="paginationContainer">
      <Button
        label={'Previous'}
        onClick={previousPage ? handleClickPrevious : undefined}
        disabled={!previousPage}
      />
      <Button
        label={'Next'}
        onClick={nextPage ? handleClickNext : undefined}
        disabled={!nextPage}
      />
    </div>
  );
};
