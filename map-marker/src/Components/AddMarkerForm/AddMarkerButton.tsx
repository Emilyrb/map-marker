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

export function AddMarkerButton() {
  const [ showForm, setShowForm ] = useState(false);

  return (
    <>
      <AddMarkerBtn onClick={() => setShowForm(true)} >
        <FontAwesomeIcon icon={faCirclePlus} size={'2x'} />
      </AddMarkerBtn>
      {showForm && <AddMarkerForm setShowForm={setShowForm} />}
    </>
  );
}
