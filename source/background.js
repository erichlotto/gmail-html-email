// Select pages with context menu enabled
var showForPages = ["http://mail.google.com/*","https://mail.google.com/*"];

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "editable";
  var title = "Append clipboard as HTML";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                        "documentUrlPatterns":showForPages,
                                        "id": "context" + context });
});

// Add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  // Notify the current tab that the context item has been clicked
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tab.id, {action: "pasteHTML"});
  });
};
