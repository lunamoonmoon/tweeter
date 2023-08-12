/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const { request } = require("express");
import { format, render, cancel, register } from 'timeago.js';

$(document).ready(function() { //runs callback when DOM ready and browser loaded
  
  function renderTweets(tweets) {
     for (let tweet of tweets) { // loops through tweets
      let tweetInHtml = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('#tweets-container').append(tweetInHtml); // takes return value and appends it to the tweets container
     };
  };

  function createTweetElement(tweet) {
    //markup for tweet format
    const tweetHtml = `
      <article class="tweet">
        <header>
        <div class="profile-avatar-name">
        <img src="${tweet.user.avatars}">
        ${tweet.user.name}
      </div>
           <span class="username">${tweet.user.handle}</span>
        </header>
        <div class="tweet-text">${tweet.content.text}</div>
        <footer class="date-stamp">
          ${format(tweet.created_at)}
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

    const textValue = $("#tweet-text").val();

    //if form empty or null or over 140 char then send error
    if (textValue === "" || textValue === null){
      alert("Please enter a tweet");
      return;
    };

    if (textValue.length > 140){
      alert("Your tweet exceeds the 140 character limit");
      return;
    };

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize() //send the form data to the server
    })
    .fail(function(error) {
     alert('Error: ' + error); //on error log
    });
  });

  function loadtweets() {
    $.ajax({ //The loadtweets function will use jQuery to make a request to /tweets
      url: '/tweets',
      method: 'GET',
      dataType: 'json', //receives the array of tweets as JSON
      success: function(formInput) {
        renderTweets(formInput);
      },
      error: function(error) {
        console.error('Error: ', error);
      }
    });
  };

loadtweets();

});
