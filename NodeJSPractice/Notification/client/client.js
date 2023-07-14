const publicVapidKey = 'BCBvRRHpnOpVSnwbapm87UbnxDzlSq9BkBUH_YMUPrHY3wVpTZqAaD5kv7E_ypJ8jdRXLlrKOzZO9Zlp6ouMK1w';

// Check for service worker 
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}

// Register sw, register push , send push
async function send() {
    // register service worker
    console.log("Registering service worker");
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log("Registering Worker registered...");

    // register push
    console.log("registering push");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase4TonitArray(publicVapidKey)
    });
    console.log("push registered");

    // send push notification
    console.log("sending push");
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log("push sent");
}

function urlBase4TonitArray(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64);
    const outputArray = new Unit84Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}