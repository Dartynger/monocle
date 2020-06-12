importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js')

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAsCV9mr1HEEGNB8_kZcnO0nbxIsA75ELI',
  authDomain: 'monocle-7ae4c.firebaseapp.com',
  databaseURL: 'https://monocle-7ae4c.firebaseio.com',
  projectId: 'monocle-7ae4c',
  storageBucket: 'monocle-7ae4c.appspot.com',
  messagingSenderId: '989266014492',
  appId: '1:989266014492:web:c035dee020b8e463eb8ad9',
  measurementId: 'G-YMFDZHJ9QB'
})

// Retrieve Firebase Messaging object.
var messaging = firebase.messaging()

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   )
//   console.log(self)

//   // self.runtime.sendMessage({
//   //   type: 'notification',
//   //   payload
//   // })
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   }

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   )
// })
