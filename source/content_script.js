// The element where a right click occurred
var clickedEl = null;

// Create the mousedown listener
document.addEventListener("mousedown", function(event){
    // Right click
    if(event.button == 2) {
        clickedEl = getTextArea(event.target);
    }
}, true);

// On message received
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'pasteHTML') {
    insertHtml(clickedEl, getClipboardText());
  }
});

// Recursively select the text area in case the target points to an inner element
function getTextArea(elm){
  if(!elm.id)
    return getTextArea(elm.parentNode);
  else
    return elm;
}

// Insert content into element
function insertHtml(elm, content){

  // If node is empty, there's no need to create a new element
  if(elm.childNodes.length==0){
    elm.innerHTML = content;
  } else {
    var newElement = document.createElement("div");
    newElement.innerHTML = content;
    elm.appendChild(newElement);
  }

  // Apply a line break so the user don't get stuck in HTML content
  var space = document.createElement("div");
  var br = document.createElement('br');
  space.appendChild(br);
  elm.appendChild(space);
}

// getClipboardText - return any text that is currently on the clipboard
function getClipboardText() {

    // create div element for pasting into
    var pasteElm = document.createElement("textarea");

    // place div outside the visible area
    pasteElm.style.position = "absolute";
    pasteElm.style.left = "-10000px";
    pasteElm.style.top = "-10000px";

    // add element to body
    document.body.appendChild(pasteElm);

    // paste the current clipboard text into the element
    pasteElm.focus();
    document.execCommand('paste');

    // get the pasted text from the textarea
    var clipboardText = pasteElm.value;

    // remove the temporary element
    document.body.removeChild(pasteElm);

    // return the text
    return clipboardText;
}
