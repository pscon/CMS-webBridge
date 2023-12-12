import React from "react";
import ListItem from "./ListItem";
import AddContacts from "./AddContacts";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });

    console.log("current state", this.state);
  }

  handleDeleteContact = async (id) => {
    let { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "DELETE",
    });

    let updatedUsers = users.filter((user) => user.id !== id);

    this.setState({
      users: updatedUsers,
    });
  };

  handleUpdateContact = async (name, phone, id) => {
    const { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id,
        phone,
        name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Data from updation of contact", json));

    // let updatedUsers = [];

    let updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.name = name;
        user.phone = phone;
      }
      return user;
    });

    this.setState({
      users: updatedUsers,
    });
  };

  handleAddContact = async (name, phone) => {
    let id = Date.now(); //genarting a unique id using date
    const { users } = this.state;
    const url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("ADD CONTACT", json));

    let updatedUsers = [{ name, phone, id }].concat(users);

    this.setState({
      users: updatedUsers,
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <AddContacts addContact={this.handleAddContact} />
        <div id="contact-list-container">
          <header>
            <img
              src="data:image/jpeg;base64,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"
              alt="contact-icon"
            ></img>
            <h1>Contact Management System</h1>
          </header>
          <ul>
            {users.length === 0 ? (
              <h1>Loading....</h1>
            ) : (
              users.map((user) => {
                return (
                  <ListItem
                    name={user.name}
                    contact={user.phone}
                    key={user.id}
                    id={user.id}
                    handleDelete={this.handleDeleteContact}
                    handleUpdate={this.handleUpdateContact}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
