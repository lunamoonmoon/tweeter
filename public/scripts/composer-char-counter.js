$(document).ready(function() { //runs callback when DOM ready and browser loaded

let textInput = document.getElementById("tweet-text"); //get text input by id

$(textInput).on("input", function() { //event on input in text area
  let currentCount = this.value.length;
  let charCount = this.parentElement.querySelector(".counter");
  
  charCount.textContent = 140 - currentCount; //char limit 140 - char in text input area
  if (currentCount> 140) { //if exceed char limit
    charCount.classList.add("over-count"); //change colour to red
  } else {
    charCount.classList.remove("over-count"); //change colour back
  };
});
});
