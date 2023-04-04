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
  children?: React.ReactNode;
}
export function AddReviewButton(props: Props) {
  const { setShowForm, children } = props;

  return (
    <AddMarkerBtn onClick={() => setShowForm(true)} >
      <span>{children} <FontAwesomeIcon icon={faCirclePlus} size={'2x'} /></span>
    </AddMarkerBtn>
  );
}
