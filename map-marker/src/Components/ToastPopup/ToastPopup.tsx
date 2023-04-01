import Toast from 'react-bootstrap/Toast';
import styled from 'styled-components';

interface Props {
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  headerText: string;
  bodyText: string;
}

const StyledToast = styled(Toast)`
  float: right;
  position: relative;
`;

export function ToastPopup(props: Props){
  const { setShowToast, headerText, bodyText } = props;

  return (
    <StyledToast onClose={() => setShowToast(false)}>
      <Toast.Header>
        <strong className="me-auto" style={{color: 'red'}}>{headerText}</strong>
      </Toast.Header>
      <Toast.Body>{bodyText}</Toast.Body>
    </StyledToast>
  );
}
