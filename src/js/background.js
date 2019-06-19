import logo from "../img/zybooks-logo.svg"

// Import images for build
import i34_enabled from "../img/icon34-01.png"
import i34_disabled from "../img/icon34-02.png"
import i128 from "../img/icon128-01.png"

// Settings for custom notifications
const initNotification = () => chrome.notifications.create('initialize', {
    type: "basic",
    title: "ZyBooks Hack",
    message: "ZyBooks Hack was initialized successfully.",
    iconUrl: logo,
}, () => setTimeout(() => chrome.notifications.clear("initialize", null), 2500));
const disableNotification = () => chrome.notifications.create('disable', {
    type: "basic",
    title: "ZyBooks Disabled",
    message: "ZyBooks Hack was disabled.",
    iconUrl: logo,
}, () => setTimeout(() => chrome.notifications.clear("disable", null), 2500));
const successNotification = () => chrome.notifications.create('success', {
    type: "basic",
    title: "Task hacked :)",
    message: "Task was successfully hacked!\nReload page to see the results.",
    iconUrl: logo,
}, () => setTimeout(() => chrome.notifications.clear("success", null), 2500));
const alreadyProcessingNotification = () => chrome.notifications.create('processing', {
    type: "basic",
    title: "Please wait",
    message: "Wait until previous task is processed!",
    priority: 0,
    iconUrl: logo,
}, () => setTimeout(() => chrome.notifications.clear("processing", null), 2500));

var progressNotif = {
    type: "progress",
    title: "Processing...",
    message: "Hacking in progress...",
    priority: 2,
    iconUrl: logo,
};
var iterErrorNotif = {
    type: "basic",
    title: "Error occured",
    message: "Error occured on iteration 1",
    iconUrl: logo,
};

// General settings
const reqInitiator = "https://learn.zybooks.com";
const urlPattern = "*://*.zybooks.com/*";
let state = {
    enabled: true,
    processing: false
};

const setIcon = (state) => chrome.browserAction.setIcon({path: state ? "icon34-01.png": "icon34-02.png"});

// Getting initial state from storage
chrome.storage.sync.get(['enabled'], function(result) {
    console.log('Local storage:', result);
    state.enabled = result.enabled
    setIcon(state.enabled);
});

// Handling clicking on extension icon event
chrome.browserAction.onClicked.addListener((tab) => {
    state.enabled = !state.enabled;
    setIcon(state.enabled);

    // Saving state in local storage
    chrome.storage.sync.set({enabled: state.enabled}, function() {
        state.enabled ? initNotification() : disableNotification();
        console.log(`ZyBooks Hack was ${state.enabled ? 'enabled' : 'disabled'}.`);
    });
});

// Creating initial notification
// initNotification()
console.log("ZyBooks hack loaded successfully!");

// Event handlers for outgoing requests
(function() {
    let payload = null;

    function send_req(headers, body, iteration) {
        fetch(headers.url, {  
            "credentials": "omit",
            "headers": { 
                "accept":" application/json, text/javascript, */*; q=0.01",
                "Content-type": "application/json"
            },
            "referrer":"https://learn.zybooks.com/zybook/UICCS141HallenbeckSummer2019/chapter/1/section/2?content_resource_id=32105341",
            "referrerPolicy":"no-referrer-when-downgrade",
            "method": "POST",
            "mode": "cors",
            "body": body
        })
        .then((r) => {
            chrome.notifications.update('request', {...progressNotif, progress: (iteration+1)*10}, null);
            console.log(`Iteration ${iteration} successfully sended.`);
        })
        .catch((e) => {
            chrome.notifications.create('iterError', {...iterErrorNotif, message: `Error occured on iteration ${iteration}`}, () => setTimeout(() => chrome.notifications.clear("iterError", null), 4000));
            console.warn(`Iteration ${iteration} ended with error, ${e}`);
        })
    }

    chrome.webRequest.onBeforeRequest.addListener((details) => {
        if (!state.enabled) return;

        if (details.initiator == reqInitiator) {
            if (details.url.split('/').reverse()[0] == "activity") {
                if (details.requestBody) {
                    // Decoding payload
                    var postedString = decodeURIComponent(String.fromCharCode.apply(null,
                        new Uint8Array(details.requestBody.raw[0].bytes)));
                    // console.log('REQ', details);
                    let json = JSON.parse(postedString);

                    // Saving payload
                    payload = json;
                }
            }
        }
    }, {urls: [urlPattern]},
    ["requestBody"]);

    chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
        if (!state.enabled) return;

        if (details.initiator == reqInitiator) {
            if (details.url.split('/').reverse()[0] == "activity") {

                if (!payload) return;

                // Saving required headers
                // console.log("Headers:", details)
                let savedHeaders = {
                    url: details.url,
                    headers: details.requestHeaders
                };

                // Checking for active current task
                if (state.processing) return alreadyProcessingNotification();

                // Delayed loop
                state.processing = true;
                var i = 0, howManyTimes = 10;
                chrome.notifications.create('request', {...progressNotif, progress: 0}, () => setTimeout(() => chrome.notifications.clear("request", null), howManyTimes*1000));
                function f() {
                    // Sending requests
                    // console.log("Sending req with payload", payload);
                    send_req(savedHeaders, JSON.stringify({...payload, part: i, complete: true}), i);
                    i++;
                    if( i < howManyTimes ){
                        setTimeout( f, 500 );
                    } else {
                        chrome.notifications.clear('request', null);
                        successNotification();
                        payload = null;
                        state.processing = false;
                    }
                }
                f();
            }
        }
    },
    {urls: [urlPattern]},
    ["requestHeaders"]);
}());