
chrome.runtime.onMessage.addListener( // add event listener to listen to incoming events
  function(request, sender, sendResponse) {
    if (request && request.invited){ // get each invite count
      console.log(request);
     const display_text =  document.getElementById("para");
     display_text.innerText = request.invited;
    }
    if(request && request.msg){ // to get notified that all invites are sent
      const btn = document.getElementById("btn");
      btn.innerText = "All Invite Sent";
      // we can improve the flow here to disable click event or close the popup  or remove button all together
    }
  }
);

document.getElementById("btn").addEventListener("click", myFunction); // get button element from popup and add event listener CLICK
    function myFunction(){
       console.log('clicked');
        getCurrentTab(); // call function to send a message to content script
       
   }


   async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions); // get current active tab on chrome browser
    console.log(tabs);
    let tab_id = tabs[0].id;

    console.log("tab id got, ",tab_id);
    let msg = {
     "text": "Message from Popup: send Invite"
    };

    chrome.tabs.sendMessage(tab_id,msg); // send message back to content script with active tab and message

  }
