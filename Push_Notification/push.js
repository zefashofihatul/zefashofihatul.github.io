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
    "endpoint": "https://fcm.googleapis.com/fcm/send/c4mX_glpACs:APA91bHjJPGBu_Ca2eMWjY635rV3OOb6RiR6Akt-RSJ4_pSHgw3XxMvn82a2FKurAY05ZmOK7z-nN5izqtgXTaUmRFou2npZSVhShFCiyusfsNbNHBdip6PhLlp49EC4R8nNBNedysh0",
   "keys": {
       "p256dh": "BCDLpqz7PEZTHABDdR9xCY97uKEAVvdQVcGiuvB6LfX9h2ed/t91AmSkjoJPU+EM8D7oNwNEbUHRP2P19sf4r2k=",
       "auth": "0KhFZFfvshZ11telkz8gOQ=="
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
