import { useNavigate, useParams } from 'react-router';

import { Spinner } from '../Spinner/Spinner.tsx';
import { Person } from '../../services/types/types.ts';
import { ErrorIndicator } from '../ErrorIndicator/ErrorIndicator.tsx';

import './ItemListStyles.css';
import { ReactNode } from 'react';

type Props = {
  items: Person[];
  isLoading: boolean;
  isServerError?: boolean;
  children?: ReactNode;
};

export const ItemList = ({
  items,
  isLoading,
  isServerError = false,
  children,
}: Props) => {
  const navigate = useNavigate();
  const { pageId } = useParams();

  if (isLoading) return <Spinner />;

  return (
    <div className="containerResults">
      <h1>Results</h1>
      {isServerError ? (
        <ErrorIndicator />
      ) : (
        <div className="containerItems">
          <ul>
            {items.map(({ id, name }) => (
              <li key={id} data-testid={'card-item'}>
                <button
                  className={'itemLink'}
                  onClick={() => {
                    navigate(`/page/${pageId}/people/${id}`);
                  }}
                >
                  <strong>name:</strong> {name}
                </button>
              </li>
            ))}
          </ul>
          {children}
        </div>
      )}
    </div>
  );
};
