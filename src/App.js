import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import {isNullOrUndefined} from 'util';
import {FileUpload} from './FileUpload';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      pictures: [],
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      'state_changed',
      snapshot => {
        let precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: precentage,
        });
      },
      error => {
        console.log(error.message);
      },
      () => {
        storageRef.getDownloadURL().then(res => {
          // this.setState({
          //   uploadValue: 100,
          //   picture: res,
          // });
          const record = {
            photoURL: this.state.user.photoURL,
            displayName: this.state.user.displayName,
            image: res,
          };

          const dbRef = firebase.database.ref('pictures');
          const newPicture = dbRef.push();
          newPicture.set(record);
        });
      },
    );
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({user}));
    firebase
      .database()
      .ref('pictures')
      .on('child_added', snapshot => {
        this.setState({
          pictures: this.state.pictures.concat(snapshot.val()),
        });
      });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    if (!isNullOrUndefined(this.state.user)) {
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.displayName} />
          <br />
          <button onClick={this.handleLogout}>Salir</button>
          <br />
          <FileUpload onUpload={this.handleUpload} />
          {this.state.pictures.map(picture => (
            <div>
              <img src={picture.image} alt="" />
              <br />
              <img src={picture.photoURL} alt={picture.displayName} />
              <br />
              <span>{picture.displayName}</span>
            </div>
          ))}
          <div>Hola {this.state.user.displayName}!</div>
        </div>
      );
    } else {
      return <button onClick={this.handleAuth}>Login Con Google</button>;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>pseudogram</h2>
          {this.renderLoginButton()}
        </header>
      </div>
    );
  }
}

export default App;
