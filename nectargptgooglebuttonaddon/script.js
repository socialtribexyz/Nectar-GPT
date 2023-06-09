 // Simple logic to use gpt 4 or gpt 3
const useChatGPT4 = false;
const chatGPTUrl = `https://chat.openai.com/chat${
  useChatGPT4 ? '?model=gpt-4' : ''
}`;

// Checking if the page is google search but not a google search results page
const URL = window.location.href;

// Checks if the URL includes the following
const includesGoogle = URL.includes('www.google.com');
const isSearch = URL.includes('search');
const isChatGpt = URL.includes('chat.openai.com');

// If the URL is not a google search page and it includes google run google searching code
const canRun = (!isSearch && includesGoogle) || !isChatGpt;

const searchPrefix = `/c `;

const cleanSearch = (str) => {
  // remove search prefix
  str = str.replace(searchPrefix, '');

  // remove any extra spaces
  str = str.trim();

  // Return the cleaned string
  return str;
};

if (URL.includes('chat.openai.com')) {
  let prompt = null;
  let dateTime = null;

  chrome.storage.local.get(['prompt', 'dateTime']).then((saved) => {
    console.log('Saved Data is: ', saved.prompt, saved.dateTime);

    // Prompt decoded as it is saved as uri encoded string
    console.log('ALL DATA: ', JSON.stringify(saved));
    prompt = saved.prompt;
    dateTime = saved.dateTime;

    if (prompt !== null && prompt !== undefined && prompt !== 'undefined') {
      console.log('PROMPT FOUND!!');

      const inputPrompt = () => {
        // Find the form
        const form = document.querySelector('form');
        console.log('Form is: ', form);

        // Find the message input field and set its value to the search input
        const messageInput = form.querySelector('textarea');
        messageInput.value = prompt;
        console.log('messageInput.value is: ', messageInput.value);

        // Clear the prompt and date time from storage after use
        chrome.storage.local.clear();

        // Find the send button and click it
        const sendButton = form.querySelector('button');
        sendButton.disabled = false;
        sendButton.click();
      };

      // Wait for the page to load ( definitely not the best way to do this )
      setTimeout(() => {
        inputPrompt();
      }, 2000);

      console.log(`Prompt is: ${prompt} and Date is: ${dateTime}`);
    }
  });
}

const getSearchValue = () => {
  const searchValue = document.querySelector('[title="Search"]').value;
  // If the value is not blank it continues
  if (searchValue.length) {
    return searchValue;
  }
};

// Edits the suggestions google gives so they can send you to ChatGPT too
const setToTeal = (selector, chatgptMessage) => {
  document.querySelectorAll(selector).forEach(function (item) {
    if (chatgptMessage) {
      item.classList.add('Teal-Text');
    } else {
      item.classList.remove('Teal-Text');
    }
  });
};

const sendToChatGPT = (text) => {
  // Function to save prompt and current date and time
  // This also cleans the prompt of any extra characters and prefix
  const prompt = cleanSearch(text);
  const dateTime = new Date().toLocaleString();

  console.log('PROMPT: ', prompt);

  chrome.storage.local.set({ prompt: prompt, dateTime: dateTime }).then(() => {
    console.log('Saved values message: ', prompt, ' Date: ', dateTime);
  });

  window.location.href = chatGPTUrl;
};

const chatgptMessage = () => {
  // gets the input value from the function
  const search = getSearchValue();
  // checks it has returned a value
  if (search) {
    console.log('SEARCH VALUE: ', search);
    sendToChatGPT(search);
  }
};

window.onbeforeunload = function (e) {
  if (!includesGoogle) return;
  return e.preventDefault();
};

document.addEventListener(
  'click',
  (e) => {
    // Don't want it running on google search / result pages
    if (!includesGoogle) return;
    // If we have not clicked on the ChatGPT button we want the page
    // to behave the same as normal
    if (!e.target.matches('.ChatGPT-Button')) return;
    // Prevent default click action that google does ( searches )
    e.preventDefault();
    // Now we run our search Function
    chatgptMessage();
  },
  false
);

document.addEventListener('keyup', (e) => {
  // The search and results page both use the same input title
  // This code can run on both (⌐■_■)
  if (!includesGoogle) return;
  // Gets the search value, checks it has a value and checks for the "/s" command
  const search = getSearchValue();
  const chatgptMessage = search?.includes(searchPrefix);
  // Search Field text
  setToTeal('[title="Search"]', chatgptMessage);
  // Suggestion text
  setToTeal('[role="option"]', chatgptMessage);
  // Checking it can run and it is the enter key
  if (e.code == 'Enter' && chatgptMessage) {
    e.preventDefault();
    // removes "/c " from the start of our query and whitespace
    const searchCleaned = cleanSearch(search);
    sendToChatGPT(searchCleaned);
  }
});

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
};

// This runs if this is the correct page
if (canRun) {
  // Grabs the buttons color to account for dark mode and any styling changes
  const luckyButton = document.querySelector(
    'input[value="I\'m Feeling Lucky"]'
  );
  const colour = window.getComputedStyle(luckyButton).getPropertyValue('color');
  const backgroundColour = window
    .getComputedStyle(luckyButton)
    .getPropertyValue('background-color');

  const ChatgptLogo = chrome.runtime.getURL('images/chatgpt-logo.png');
  const ChatgptButtonInner = `
    <span class="ChatGPT-Logo-Container Flex-Center">
      <img src="${ChatgptLogo}" alt="" class="ChatGPT-Logo Flex-Center">
    </span>
    ChatGPT
  `;

  const ChatgptButtonInnerNoAnimation = `
    <img src="${ChatgptLogo}" alt="" class="ChatGPT-Logo Flex-Center" style="margin-right: 4px;">
    ChatGPT
  `;

  // Finding each "I'm feeling lucky" Button
  var inputs = document.querySelectorAll('input[name="btnI"]');
  for (i = 0; i < inputs.length; i++) {
    // This is the main home screen Button that is going to be animated
    if (i == 1) {
      // Creating our animated button so there is no jump on load
      const ButtonAnimated = document.createElement('div');
      ButtonAnimated.classList.add('Button-Container-Viewport');
      ButtonAnimated.innerHTML = `
                <div class="Button-Container">
                    <button class="Button" style="color: ${colour}; background-color: ${backgroundColour};">I'm Feeling Lucky</button>
                    <button onclick="chatgptMessage()" class="ChatGPT-Button Button Flex-Center">
                      ${ChatgptButtonInner}
                    </button>
                </div>
            `;
      // replacing the feeling lucky button
      inputs[i].replaceWith(ButtonAnimated);
    } else {
      // Creating the new ChatGPT button
      const newButton = document.createElement('button');
      newButton.innerHTML = ChatgptButtonInnerNoAnimation;
      newButton.classList.add('ChatGPT-Button', 'Button', 'Inline-Flex');
      newButton.style.transform = 'translateY(4px)';
      newButton.onclick = () => chatgptMessage();
      // replacing the feeling lucky button
      inputs[i].replaceWith(newButton);
    }
  }
}
