import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  } ,[])

  const handleUser = (event) =>{
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...users, data];
      form.reset()
      setUsers(newUser)

    })
  }

  return (
    <>
      <div>
      </div>
      <h1>Users managemant system</h1>
      <h3>Numers of users: {users.length}</h3>


      <form onSubmit={handleUser}>
        <input type="text" name="name" />
        <br /> <br />
        <input type="email" name="email" id="" />
        <br /> <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id}. {user.name}: {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
