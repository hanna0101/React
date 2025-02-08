import './itemList.css';
import { useNavigate, useParams } from 'react-router';
import { Spinner } from '../Spinner/Spinner.tsx';
import { Person } from '../../services/types/types.ts';

export const ItemList = ({
  items,
  isLoading,
}: {
  items: Person[];
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const { pageId } = useParams();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul>
      {items.map(({ id, name }) => {
        return (
          <li key={id}>
            <button
              className={'itemLink'}
              onClick={() => {
                navigate(`/page/${pageId}/people/${id}`);
              }}
            >
              <strong>name:</strong> {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
