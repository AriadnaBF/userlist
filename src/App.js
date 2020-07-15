import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Spinner, Button } from "reactstrap";
import { getUsers } from "./api/getUsers";
import { selectUser } from "./api/selectUser";
import "./App.css";

function App() {
  class UserInterface extends React.Component {
    constructor(props) {
      super(props);
      this.state = { users: [], selectedUser: "none" };
    }

    async componentDidMount() {
      const listofusers = await getUsers();
      this.setState({ ...this.state, users: listofusers });
    }

    handleClick = async (id) => {
      this.setState({ ...this.state, selectedUser: "isloading" });
      const user = await selectUser(id);
      this.setState({ ...this.state, selectedUser: user });
    };

    render() {
      const listOfUsers = this.state.users;
      const userToShow = this.state.selectedUser;

      return (
        <div className="row">
          <div className="col-6">
            <h1>Lista de usuarios:</h1>
            <Table className="text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Ver Info</th>
                </tr>
              </thead>

              <UserList users={listOfUsers} handle={this.handleClick} />
            </Table>
          </div>
          <div className="col-6">
            <UserInfo user={userToShow} />
          </div>
        </div>
      );
    }
  }

  class UserList extends React.Component {
    render() {
      if (this.props.users.length === 0) {
        return (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center">
                <Spinner color="success" />{" "}
              </td>
            </tr>
          </tbody>
        );
      } else {
        return (
          <tbody>
            {this.props.users.map((value) => {
              return (
                <tr>
                  <td>{value.first_name}</td>
                  <td>{value.last_name}</td>
                  <td>{value.email}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => this.props.handle(value.id)}
                    >
                      +
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        );
      }
    }
  }

  class UserInfo extends React.Component {
    render() {
      if (this.props.user === "none") {
        return null;
      }
      if (this.props.user === "isloading") {
        return (
          <div className="row">
            <div className="col-8 mt-5 border-left border-top border-bottom p-2">
              <Spinner color="success" className="d-block mx-auto" />
            </div>
            <div className="col-4 mt-5 border-right border-top border-bottom p-2">
              <div className="mx-auto d-block bg-success loading-user" />
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div className="col-8 mt-5 border-left border-top border-bottom p-2">
              <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-success">
                  <h2>
                    {this.props.user.first_name} {this.props.user.last_name}
                  </h2>
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold mr-2">Id:</span>
                  {this.props.user.id}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold mr-2">Nombre:</span>
                  {this.props.user.first_name}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold mr-2">Apellido:</span>
                  {this.props.user.last_name}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold mr-2">Email:</span>
                  {this.props.user.email}
                </li>
              </ul>
            </div>
            <div className="col-4 mt-5 border-right border-top border-bottom p-2">
              <img
                alt="User avatar"
                src={this.props.user.avatar}
                className="mx-auto d-block"
              />
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="App">
      <div className="container-lg">
        <UserInterface />
      </div>
    </div>
  );
}

export default App;
