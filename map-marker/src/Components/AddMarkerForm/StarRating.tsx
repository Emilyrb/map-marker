import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { AllReviewsDTO } from '../../Types';

interface Props {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  formData: AllReviewsDTO | {};
  setFormData: React.Dispatch<React.SetStateAction<AllReviewsDTO | {}>>;
  keyId: string;
}

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  &:focus {
    border: 0;
    outline: none;
  }
  padding: 0 5px;
`;

export function StarRating(props: Props) {
  const { rating, setRating, formData, setFormData, keyId } = props;

  return (
    <div>
    {[...Array(5)].map((_, index) => {
      index += 1;
      return (
        <StyledButton
          type="button"
          key={index}
          onClick={() => {
            setRating(index);
            setFormData({...formData, [keyId]: index});
          }}
        >
          {
            index <= rating ?
              <FontAwesomeIcon style={{color: 'gold'}} icon={faStar} />
              : <FontAwesomeIcon style={{color: 'gray'}} icon={faStar} />
          }
        </StyledButton>
      );
    })}
  </div>
  );
}
