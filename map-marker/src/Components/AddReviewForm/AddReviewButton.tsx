import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const AddMarkerBtn = styled.div`
  color: green;
  cursor: pointer;
  &:hover {
    color: darkgreen;
  }
`;

interface Props{
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddReviewButton(props: Props) {
  const { setShowForm } = props;

  return (
    <AddMarkerBtn onClick={() => setShowForm(true)} >
      <FontAwesomeIcon icon={faCirclePlus} size={'2x'} />
    </AddMarkerBtn>
  );
}
