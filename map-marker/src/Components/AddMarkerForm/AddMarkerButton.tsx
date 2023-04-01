import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { AddMarkerForm } from './AddMarkerForm';

const AddMarkerBtn = styled.div`
  color: green;
  cursor: pointer;
  &:hover {
    color: darkgreen;
  }
`;

interface Props{
  markerPos: {lat: number, lng: number};
}
export function AddMarkerButton(props: Props) {
  const { markerPos } = props;
  const [ showForm, setShowForm ] = useState(false);

  return (
    <>
      <AddMarkerBtn onClick={() => setShowForm(true)} >
        <FontAwesomeIcon icon={faCirclePlus} size={'2x'} />
      </AddMarkerBtn>
      {showForm && <AddMarkerForm setShowForm={setShowForm} markerPos={markerPos} />}
    </>
  );
}
