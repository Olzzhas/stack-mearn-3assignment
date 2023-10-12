import RegistrationForm from './components/registrationForm/RegistrationForm';
import './App.scss';
import UsersList from './components/usersList/UsersList';

function App() {
  return (
    <div className="wrapper">
      <RegistrationForm />
      <UsersList />
    </div>
  );
}

export default App;
