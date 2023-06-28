import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCurrentUser from '../../hooks/useCurrentUser';
import useLogout from '../../hooks/useLogout';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import Logo from '../../assets/logo.png';

export default function AppLayout({ children }) {
  const [user] = useCurrentUser();
  const [logout, { loading: isLoading }] = useLogout({
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      AuthManager.logout();
    },
  });

  const onLogout = () => {
    logout({ variables: { token: AuthManager.getRefreshToken() } });
  };

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to={paths.home}>
            <img src={Logo} alt="Logo" style={{ height: '60px', marginRight: '2px' }} />
          </Navbar.Brand>
          <Navbar.Collapse className="collapse navbar-collapse" id="responsive-navbar-nav">
            <Nav className="navbar-nav me-auto">
              <Nav.Link as={Link} to={paths.home}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={paths.Tests}>
                Tests
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link as={Link} to={paths.myProfile}>
                {user?.email}
              </Nav.Link>
              <ButtonWithSpinner loading={isLoading} variant="outline-secondary" onClick={onLogout}>
                logout
              </ButtonWithSpinner>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}