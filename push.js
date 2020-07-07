var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BB4HBBIgyDsiJFXGgj121Vs59JQ2w6s6bccX9eYHlsqNmJvW3tqmY18-BxtItCgPoLSgYHJLDeP0UJF6ASFSREI",
   "privateKey": "4tWeD8YU3HlsczBHsdGHGQvr5jN9zWO1H06Jq2QrlTA"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e5TtCF1p8gc:APA91bHYUcSTQ0ZdVpFeZzTHZHyK0CYUtQEVvKn5hYjHXL79aTxaHWOOIFRK0mFmLkImXNTMaPAnXgqecpIYbvJ-E92dPF5rnNH7p0wOa4QIKjH71eS8UEAy-McPzNQ8zEzcEMozuE6n",
   "keys": {
       "p256dh": "BNl2bcXL+h6zQ99eNSuQUWFn5XgVJeUpuGvocMKb3DZhjp9MiNgFoRlzuBs8bj9zOA4hCWxUYaLwDdR5VXKYa/0=",
       "auth": "1enxaGmwrEFxWTiyMlL8Uw=="
    }
};
var payload = 'LAST MATCH: Persib (8) VS Persija (0)!';
var options = {
    gcmAPIKey: '1069950770061',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
// {"publicKey":"BBItcP6Hf6F2yg3uhcAd063DCqU1D3KZygU54YF-uyRWwmuhCd-M0dki2jVJhjOghMSOaS8eVuNe6VK7tFOpYcA","privateKey":"V1Rjf1VtJRc_Hr3MenBiX_OYTMX-XOOH5bdJivID4X8"}
