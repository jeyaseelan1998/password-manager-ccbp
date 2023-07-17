import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import PasswordItem from "../passwordItem";
import NoPasswordsView from '../NoPasswordsView'

import './index.css'

const initialFormFields = {
  websiteInput: '',
  usernameInput: '',
  passwordInput: ''
}

class PasswordManagerHome extends Component {
  state = {
    passwordsList: [],
    searchInput:'',
    showPassword: false,
    ...initialFormFields
  }

  onChangeInput = event => {
    const { name, value } = event.target
    this.setState({[name]: value})
  }

  onTogglePasswordVisibility = event => {
    this.setState({showPassword: event.target.checked})
  }

  onDeletePasswordItem = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(item => item.id !== id)
    }))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, passwordInput, usernameInput} = this.state
    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      password: passwordInput,
      username: usernameInput
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      ...initialFormFields
    }))
  }

  getFilteredPasswordsList = () => {
    const {passwordsList, searchInput} = this.state
    const filteredPasswordsList = passwordsList.filter(item => item.website.toLowerCase().includes(searchInput.toLowerCase()))
    return filteredPasswordsList
  }

  render() {
    const { searchInput, showPassword, websiteInput, usernameInput, passwordInput, passwordsList } = this.state
    const filteredPasswordsList = this.getFilteredPasswordsList()

    return (
      <div className="app-container">
        <header>
          <nav>
            <img src='https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png ' className="app-logo" alt='app logo' />
          </nav>
        </header>
        <div className="password-manager-section">
          <img src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png" alt="password manager" className="add-new-password-image-1" />
          <form className="add-new-password-form" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">
              Add New Password
            </h1>
            <div className="input-container">
              <label className="input-icon-label" htmlFor="websiteInput">
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png" alt="website" className="input-icon" />
              </label>
              <input
                name="websiteInput"
                value={websiteInput}
                type="text"
                className="input"
                id="websiteInput"
                onChange={this.onChangeInput}
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <label className="input-icon-label" htmlFor="usernameInput">
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png" alt="username" className="input-icon" />
              </label>
              <input
                name="usernameInput"
                value={usernameInput}
                type="text"
                className="input"
                id="usernameInput"
                onChange={this.onChangeInput}
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <label className="input-icon-label" htmlFor="passwordInput">
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png" alt="password" className="input-icon" />
              </label>
              <input
                name="passwordInput"
                value={passwordInput}
                type="password"
                className="input"
                id="passwordInput"
                onChange={this.onChangeInput}
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png" alt="password manager" className="add-new-password-image-2" />
        </div>
        <div className="password-manager-section password-manager-display-section">
          <div className="passwords-count-and-search-field-container">
            <div className="paswords-count-display-container">
              <p>Your Passwords</p>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="input-container search-input-container">
              <label className="input-icon-label" htmlFor="searchInput">
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png" alt="search" className="input-icon" />
              </label>
              <input
                name="searchInput"
                value={searchInput}
                type="search"
                className="input"
                id="searchInput"
                onChange={this.onChangeInput}
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="separator"/>
          <div className="checkbox-container">
            <input id="checkbox" type="checkbox" checked={showPassword} name="showPassword" onChange={this.onTogglePasswordVisibility}/>
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          {
            filteredPasswordsList.length !== 0 ? (
              <ul className="passwords-lists">
                {
                  filteredPasswordsList.map(item => 
                    <PasswordItem key={item.id} passwordDetails={item} showPassword={showPassword} onDeletePasswordItem={this.onDeletePasswordItem}/>
                    )
                }
              </ul>
            ) : (
              <NoPasswordsView/>
            )
          }
        </div>
      </div>
    )
  }
}

export default PasswordManagerHome