export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

function deleteAllUsers() {
  localStorage.removeItem('users');
}

function listUsers() {
  const usersFromStore = localStorage.getItem('users');

  const retriviedUsers = usersFromStore ? JSON.parse(usersFromStore) : [];

  return retriviedUsers;
}

function addUser(user: UserData) {
  const retriviedUsers = listUsers();

  const users = [...retriviedUsers, user];

  localStorage.setItem('users', JSON.stringify(users));
}

function getUserById(id: string) {
  const retriviedUsers = listUsers();

  const user = retriviedUsers.find((user: UserData) => user.id === id);

  if (!user) return null;

  return user;
}

export { addUser, deleteAllUsers, getUserById, listUsers };
