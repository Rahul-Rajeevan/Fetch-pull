import React, { useEffect, useState } from 'react';
import User from './User';

const Users = () => {
  const [allUsers, setAllUsers] = useState([]); // Full list from API
  const [users, setUsers] = useState([]);       // Displayed list

  async function fetchUsers() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await res.json();
    setAllUsers(data);
    setUsers(data); // Initially show all users
  }

  function sort(e) {
    let val = e.target.value;
    let sorted = [...users]; // Clone current filtered list

    if (val === "asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (val === "desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setUsers(sorted); // Update with sorted list
  }

  function handleSearch(e) {
    let term = e.target.value.toLowerCase();
    let result = allUsers.filter(user => user.name.toLowerCase().includes(term));
    setUsers(result);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <select name="sortByName" id="sortByName" onChange={sort}>
        <option value="">Sort by name</option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>

      <input type="text" placeholder="Search by name" onChange={handleSearch} />

      <ol>
        {users.map(user => (
          <User key={user.id} person={user} />
        ))}
      </ol>
    </div>
  );
};

export default Users;
