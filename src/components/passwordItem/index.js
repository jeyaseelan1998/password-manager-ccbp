import React from 'react'
import './index.css'


const PasswordItem = ({passwordDetails, showPassword, onDeletePasswordItem}) => {
  const {id, website, username, password} = passwordDetails

  const getPassword = () => {
    if(showPassword) {
      return <p>{password}</p>
    }

    return <img src='https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png' alt='stars' className='stars'/>

  }

  const onButtonClick = () => onDeletePasswordItem(id)

  return (
    <li className='password-item-container'>
      <div className='first-letter-container'>
        <p>{website[0].toUpperCase()}</p>
      </div>
      <div className='details-container'>
        <p>{website}</p>
        <p>{username}</p>
        {getPassword()}
      </div>
      <button data-testid='delete' onClick={onButtonClick}>
        <img src='https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png' alt='delete'/>
      </button>
    </li>
  )
}

export default PasswordItem