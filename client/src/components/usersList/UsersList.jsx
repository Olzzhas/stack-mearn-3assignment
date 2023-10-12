import React from 'react';
import axios from 'axios';
import './usersList.scss';

function UsersList() {
  const [users, setUsers] = React.useState([]);

  const [editingEmail, setEditingEmail] = React.useState(null);
  const [editedData, setEditedData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/user-getall'),
        ]);

        setUsers(usersResponse.data);
      } catch (error) {
        alert('error');
      }
    }
    fetchData();
  }, []);

  const handleDeleteClick = async (userEmail) => {
    console.log(userEmail);
    await axios
      .post('http://localhost:5000/api/user-delete', {
        email: userEmail,
      })
      .then((response) => {
        console.log(response);
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));
      });
  };

  const handleEditClick = (email, userData) => {
    setEditingEmail(email);
    setEditedData(userData);
  };

  const handleSaveClick = () => {
    axios
      .put(`http://localhost:5000/api/user-update`, editedData)
      .then((response) => {
        console.log('Данные обновлены успешно:', response);
        window.location.replace('http:localhost:3000');
        setEditingEmail(null);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });
  };

  const handleCancelClick = () => {
    setEditingEmail(null);
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <table className="userlist-container">
      <thead className="user-table">
        <tr>
          <th>
            <div className="user-find">
              <p>Username</p>{' '}
              <input
                type="text"
                placeholder="Поиск по Username"
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          </th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((user) => user.username.toLowerCase().includes(filter.toLowerCase()))
          .map((user) => (
            <tr key={user.email}>
              <td>
                {editingEmail === user.email ? (
                  <input
                    type="text"
                    value={editedData.username}
                    onChange={(e) => handleFieldChange(`username`, e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>{user.email}</td>
              <td>
                {editingEmail === user.email ? (
                  <input
                    type="password"
                    value={editedData.password}
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                {editingEmail === user.email ? (
                  <>
                    <button onClick={() => handleSaveClick()}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <div className="button-column">
                    <button
                      onClick={() => handleEditClick(user.email, user)}
                      className="button edit-button">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.email)}
                      className="button delete-button">
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default UsersList;
