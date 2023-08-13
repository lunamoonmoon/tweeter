/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { //runs callback when DOM ready and browser loaded
  
  function renderTweets(tweets) {
    $('#tweets-container').empty();
     for (let tweet of tweets.reverse()) { // loops through tweets
      let tweetInHtml = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('#tweets-container').append(tweetInHtml); // takes return value and appends it to the tweets container
     };
  };

  function createTweetElement(tweet) {
  
    //get user info from page
    const profileImage = $(".profile-pic").attr("src");
    const username = $(".username").text();
    const timeStamp = timeago.format(tweet.created_at);

    //markup for tweet format
    const tweetHtml = `
      <article class="tweet">
        <header>
        <div class="profile-avatar-name">
        <img class="profile-img" src="${profileImage}">
        <span class="profile-name"> ${username} </span>
      </div>
           <span class="username">${tweet.user.handle}</span>
        </header>
        <div class="tweet-text">${tweet.content.text}</div>
        <footer class="date-stamp">
        ${timeStamp}
          <span class="reaction-buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-regular fa-share-from-square"></i>
            <i class="fa-regular fa-bookmark"></i>
          </span>
        </footer>
      </article>
      <br>
    `;
    return tweetHtml;
  };

  $("#post-tweet").on("submit", function(event) { //event listener for the submit event
    event.preventDefault(); //prevent default form submission
    const textValue = $("#tweet-text").serialize();

    //if form empty or null or over 140 char then send error
    if (textValue.trim() === "" || textValue === null){
      $(".error-message").html('<i class="fa-solid fa-exclamation"></i>&nbsp;Please enter your tweet&nbsp;<i class="fa-solid fa-exclamation"></i>');
      $(".error-container").slideDown(); //show error html element
      return;
    };

    if (textValue.length > 140){
      $(".error-message").html('<i class="fa-solid fa-exclamation"></i>&nbsp;Please make your tweet 140 characters or less&nbsp;<i class="fa-solid fa-exclamation"></i>');
      $(".error-container").slideDown(); //show error html element
      return;
    };

    $(".error-container").slideUp();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: textValue, //send the form data to the server
    })
    .done(function(tweet) {
      loadtweets(); //after post success fetch tweets
      $("#tweet-text").val("");
    })
    .fail(function(error) {
     alert('Error: ' + error); //on error log
    });
  });

  function loadtweets() {
    $.ajax({ //The loadtweets function will use jQuery to make a request to /tweets
      url: '/tweets',
      method: 'GET',
      success: function(formInput) {
        console.log(formInput);
        renderTweets(formInput);
      },
      error: function(error) {
        console.error('Error: ', error);
      }
    });
  };

loadtweets();

});
