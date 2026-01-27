import React from 'react'

const Profile = ({name, age,skills}) => {
  return (
    <div>
      <h1>i am {name} and I am {age} years old</h1>
      <u1>
        {skills.map((skill)=>{
        return <li>{skill}</li>
        })}
      </u1>
    </div>
  )
}

export default Profile
