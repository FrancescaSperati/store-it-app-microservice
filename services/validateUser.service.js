"use strict";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const fs = require('fs');
var request = require('request');

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
	apiKey: "AIzaSyBu8M_B2P3MeZJyiggSokAnp_zmnWlYXvg",
    authDomain: "store-it-app.firebaseapp.com",
    databaseURL: "https://store-it-app.firebaseio.com",
    projectId: "store-it-app",
    storageBucket: "",
    messagingSenderId: "1046318766844",
    appId: "1:1046318766844:web:921b5318becc0899ee5579",
    measurementId: "G-L5FX21ZCME"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

module.exports = {
	name: "validateUser",
	settings: {
	},
	dependencies: [],
	actions: {

		addUser: {
			params: {
				userEmail: "string",
				password: "string"
			},
			handler(ctx) {
				let newUser = firebase.auth().createUserWithEmailAndPassword(ctx.params.userEmail, ctx.params.password)
				.catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					return "error"+errorMessage;
					// ...
				  });
				  return newUser;
			}
		},
		
		validate: {
			params: {
				userEmail: "string",
				password: "string"
			},
			handler(ctx) {
				var user = firebase.auth().signInWithEmailAndPassword(ctx.params.userEmail, ctx.params.password)
				.catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					return "";
					// ...
				  });
				  return user;
			}
		},

		update: {
			params: {
				userName: "string",
				userPicture: "string"
			},
			handler(ctx){
				var user = firebase.auth().currentUser;
				user.updateProfile({
					displayName: ctx.params.userName,
					photoURL: ctx.params.userPicture,
				}).then(function() {
					// Update successful.
				}).catch(function(error) {
					// An error happened.
				});
				return user;
			}
		},

		signout: {
			handler(ctx){
				firebase.auth().signOut().then(function() {
					// Sign-out successful.
				  }).catch(function(error) {
					// An error happened.
				  });
			}
			
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},
};