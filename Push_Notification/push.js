var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BH69pA3LNC5IbvWyKLs0dMz2DytdrTHThVWjBr0o3lmBwtP68V7CM-KFUQEMfBz4dAdVUFcSPn0gp87oUzsSTSo",
   "privateKey": "nrOM-YIHnYgdUZY4fPGTbqa5mqnVMl_GBMG5NqlgPDE"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dF_bpE26-6o:APA91bFW0684tWWDANm1qrYKWQtOexO-LYxUDP9A8gMAM7P_ooGSODSfJiCXII9mf3JAPBsNvRt92E4E6J44tOVn_GITDIhKetIa2XKzyV-lnMvuN4WZYb1eP1-KFgWyLqZg7e2hCrr1",
   "keys": {
       "p256dh": "BFDtYwZ+SN8od28x8USbseVde+kWePMHD1fTGbFFQ6zii4eBCi4FMQBnCFFhRJ9rhmKN3qrk8rHvZWHBdzg/968=",
       "auth": "RXbx/Z+bk4wkPeOcVpZGAg=="
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
