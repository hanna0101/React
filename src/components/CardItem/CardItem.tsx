import './cardItem.css';

interface CardItemsProps {
  img: string;
  name: string;
  birthYear: number;
  gender: string;
  eyeColor: string;
  handleDetailsClose: () => void;
}

export const CardItem = ({
  img,
  name,
  birthYear,
  gender,
  eyeColor,
  handleDetailsClose,
}: CardItemsProps) => {
  return (
    <div className="cardItem">
      <button className={'close'} onClick={handleDetailsClose}>
        X
      </button>
      <img src={img} alt={name} />
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Birth Year:</strong> {birthYear}
      </div>
      <div>
        <strong>Gender:</strong> {gender}
      </div>
      <div>
        <strong>Eye Color:</strong> {eyeColor}
      </div>
    </div>
  );
};
