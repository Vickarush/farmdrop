importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBb1EUsexjqT-kRTw2ZJucGDvxyUGO3XJs",
  authDomain: "farmdrop-76b03.firebaseapp.com",
  databaseURL: "https://farmdrop-76b03-default-rtdb.firebaseio.com",
  projectId: "farmdrop-76b03",
  storageBucket: "farmdrop-76b03.firebasestorage.app",
  messagingSenderId: "937882257938",
  appId: "1:937882257938:web:44a4a87bb977ea7feca6cb",
  measurementId: "G-0WJ71MBBRE"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});