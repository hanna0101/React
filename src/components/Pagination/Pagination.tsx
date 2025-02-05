import { Button } from '../Button/Button.tsx';
import './pagination.css';
import { API } from '../../constants/constants.ts';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  handleClickPrev: () => void;
  handleClickNext: () => void;
}

export const Pagination = ({
  currentPage = API.FIRST_PAGE,
  totalPage = API.TOTAL_PAGE,
  handleClickPrev,
  handleClickNext,
}: PaginationProps) => {
  const isPrevDisabled = currentPage === API.FIRST_PAGE;
  const isNextDisabled = currentPage === totalPage;

  return (
    <div className="paginationContainer">
      <Button
        label={'Prev'}
        onClick={handleClickPrev}
        disabled={isPrevDisabled}
      />
      <span>
        Page {currentPage} of {totalPage}
      </span>
      <Button
        label={'Next'}
        onClick={handleClickNext}
        disabled={isNextDisabled}
      />
    </div>
  );
};
