import React from 'react'

const User = ({person}) => {
  return (
    <li>
        <p>{person.name}</p> 
        <p>{person.email}</p>
    </li>
  )
}

export default User