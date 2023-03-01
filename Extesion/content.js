console.log("content script loaded");
chrome.runtime.onMessage.addListener(getMessage); // recieve message Event Listener
// window.addEventListener ("load", myMain, false);
// we can use above to test whether the page has loaded or not and only then SEND INVITE
// but since we are clikcing the button on popup I feel it's not required

function myMain () {
    send();  
}

async function send(){
    let allconnection = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"); // get invite button

    let count = 0; // count invites sent
    for(let conn of allconnection){
        if(conn.innerText === "Follow" || conn.innerText === "Connect"){ // only to follow and connect
            count ++; // invite count update
            console.log("Inviting: ",conn.ariaLabel);
            conn.click(); // click the sent Invite button with click event
            await wait5sec();
            console.log("5 sec over");
            let send = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1"); // get confirm send invite button on linkedin page popup
            if(send.length > 0 && send[0].innerText === "Send"){
                await send[0].click();
            }
            await wait5sec();
            (async () => {
                const response = await chrome.runtime.sendMessage({invited: count}); // send a message to popup that invite was sent successfully
              })();
        }
    }
    console.log("over");
    (async () => {
        const response = await chrome.runtime.sendMessage({msg: "over"}); // send a message to popup that all invitations are sent
      })();
}

const wait5sec = () => { // used this function to wait for new popup to load on page once invite button is cliked o LinkedIn
    return new Promise((resolve,reject) => {
        setInterval(() => {
            resolve();
        },2000);
    })
}// gives a sense of smooth flow and not immediate excecution

function getMessage(msg,sender,senderResponse){ // calbback from listening to event on content
    console.log("message from popup");
    console.log(msg.text);
    myMain();
}

