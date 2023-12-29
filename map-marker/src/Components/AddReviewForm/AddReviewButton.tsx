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

const Text = styled.span`
`;

const Icon = styled.span`
  vertical-align: middle;
  margin: 0 5px;
`;

interface Props{
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
export function AddReviewButton(props: Props) {
  const { setShowForm, children } = props;

  return (
    <AddMarkerBtn onClick={() => setShowForm(true)} >
      <Text>{children}</Text><Icon><FontAwesomeIcon icon={faCirclePlus} size={'2x'} /></Icon>
    </AddMarkerBtn>
  );
}
