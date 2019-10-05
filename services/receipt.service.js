"use strict";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

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
	name: "receipt",
	settings: {
	},
	dependencies: [],
	actions: {

		add: {
			params: {
                receiptId: "string",
                userId: "string",
                date: "string",
                business: "string",
                name: "string",
                amount: "string",
                picture: "string"
			},
			handler(ctx) {
				firebase.database().ref(ctx.params.userId+'/'+ctx.params.receiptId).set({
					id: ctx.params.receiptId,
                    date: ctx.params.date,
                    business: ctx.params.business,
                    name : ctx.params.name,
                    picture: ctx.params.picture,
                    amount: ctx.params.amount
                });
			}
		},
        
		readTot: {
			params: {
                userId: "string"
			},
			handler(ctx) {
                var uid = ctx.params.userId;
                var ricevute = new Array();
                var elementCount = 0;
                
                var tot;
                var usersRef = firebase.database().ref(uid);
                usersRef.on("value", function(snapshot) {
                    tot = 0;
                    snapshot.forEach(function(userSnapshot) {
                        ricevute[elementCount] = userSnapshot.child("amount").val();
                        tot+=parseInt(ricevute[elementCount]);
                        elementCount++;
                    });
                });
                return tot; 
                //return ricevute.length;
			}
		},

		readHistory: {
			params: {
                userId: "string"
			},
			handler(ctx) {
                var uid = ctx.params.userId;
                var ricevute = new Array();
                var elementCount = 0;
                var usersRef = firebase.database().ref(uid);
                usersRef.on("value", function(snapshot) {
                    snapshot.forEach(function(userSnapshot) {
                        ricevute[elementCount] = userSnapshot;
                        elementCount++;
                    });
                });
                return ricevute;
			}
		},

		delete: {
			params: {
				userId: "string",
				receiptId: "string"
			},
			handler(ctx){
				firebase.database().ref(ctx.params.userId+'/'+ctx.params.receiptId).remove();
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