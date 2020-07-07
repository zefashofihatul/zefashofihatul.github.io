var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BBItcP6Hf6F2yg3uhcAd063DCqU1D3KZygU54YF-uyRWwmuhCd-M0dki2jVJhjOghMSOaS8eVuNe6VK7tFOpYcA",
   "privateKey": "V1Rjf1VtJRc_Hr3MenBiX_OYTMX-XOOH5bdJivID4X8"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/etelVRUFWP0:APA91bF7R7UScBiItkd4QtavOwuKa4IQndjAS1CDrmBWJSLLJPm6vQMQzJ-KgypBcUDFd21doJEbQ5Hh2Z5yMmi41mE_KDeOgoB0zQ-TrhT2-yRe1pK17Tt4aw3eHpSQc8LShu61MVQm",
   "keys": {
       "p256dh": "BEp8Hdpk7V5QIO520E0O600bLlx98H8WOitPSMDcRqXa+PDJNuphZbiGAuTakdKmnjB78IigUznIoa4SjuDeD5c=",
       "auth": "ji84Art0a9ga+LRXY/uBcA=="
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
