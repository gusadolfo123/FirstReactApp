import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDUaQAg1lvL0ufkLf8udHXpCnIoXsKT8Dc',
  authDomain: 'pseudogram-d1e0d.firebaseapp.com',
  databaseURL: 'https://pseudogram-d1e0d.firebaseio.com',
  projectId: 'pseudogram-d1e0d',
  storageBucket: 'pseudogram-d1e0d.appspot.com',
  messagingSenderId: '201330211059',
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
