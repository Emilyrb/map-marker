import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  value: number;
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
  const { value } = props;
  const [ rating, setRating ] = useState(value);

  return (
    <div>
    {[...Array(5)].map((_, index) => {
      index += 1;
      return (
        <StyledButton
          type="button"
          key={index}
          onClick={() => {console.log(index); setRating(index);}}
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
