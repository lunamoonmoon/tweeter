/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() { //runs callback when DOM ready and browser loaded
  
  function renderTweets(tweets) {
     for (let i of tweets) { // loops through tweets
      let tweetInHtml = createTweetElement(i); // calls createTweetElement for each tweet
      $('#tweets-container').append(${tweetInHtml}); // takes return value and appends it to the tweets container
     };
  };

  function createTweetElement(tweet) {
    const tweetHtml = `
      <article class="tweet">
        <header>
          ${tweet.user.name} <span class="username">${tweet.user.handle}</span>
        </header>
        <div class="tweet-text">${tweet.content.text}</div>
        <footer class="date-stamp">
          ${tweet.created_at}
          <span class="reaction-buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-regular fa-share-from-square"></i>
            <i class="fa-regular fa-bookmark"></i>
          </span>
        </footer>
      </article>
      <br>
    `;
    return tweetHtml
  };
});

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
