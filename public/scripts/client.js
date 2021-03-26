/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.

//NOTESS:::
// delete unused functions

// name on tweets beside image


//function to translate tweet timestamp


function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 5) {
    return 'Just now';
  }
  if (secondsPast < 60) {
    return secondsPast + ' seconds ago';
  }
  if (secondsPast === 60) {
    return 'a minute ago';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + ' minutes ago';
  }
  if (secondsPast === 3600 && secondsPast < 3660) {
    return 'an hour ago';
  }
  if (secondsPast < 86400) {
    return parseInt(secondsPast / 3600) + ' hours ago';
  }
  if (secondsPast === 86400 && secondsPast < 90000) {
    return 'a day ago';
  }
  if (secondsPast < 604800) {
    return parseInt(secondsPast / 86400) + ' days ago';
  }
  if (secondsPast === 604800) {
    return 'a week ago';
  }
  if (secondsPast <= 31536000) {
    return parseInt(secondsPast / 604800) + ' weeks ago';
  }
}


//creates tweet header
const createHeader = (tweet) => {
  const $tweetHeader = $('<header>').addClass('tweet_header');
  const $presetAvatar = ($('<img>').attr('src', tweet.user.avatars));
  const $presetUserName = $('<p id="user-name">').text(tweet.user.name);
  const $presetUserHandle = $('<p id="user-handle">').text(tweet.user.handle);

  const $avatarNameNest = $('<div>').addClass('avatar-name-nest');
  $avatarNameNest.append($presetAvatar);
  $avatarNameNest.append($presetUserName);

  // $tweetHeader.append($presetAvatar);
  // $tweetHeader.append($presetUserName);
  $tweetHeader.append($avatarNameNest);
  $tweetHeader.append($presetUserHandle);

  return $tweetHeader;
};

//creates tweet footer
const createFooter = (tweet) => {
  const $tweetFooter = $('<footer>').addClass('tweet_footer');
  const $presetTime = $('<time>').text(timeSince(tweet.created_at));
  const $retweetFlagHeartIcons = $(`<span class="icons"><p><i class="fas fa-retweet"></i> <i class="fas fa-flag"></i> <i class="fas fa-heart"></i></p></span>`);

  $tweetFooter.append($presetTime);
  $tweetFooter.append($retweetFlagHeartIcons);

  return $tweetFooter;
};

//creates full tweet post, combining user input text and header + footer
const createTweetElement = (tweet) => {
  const $tweet = $('<section id="tweets-container">');
  // const $newTweetArticle = $('<article>');
  const $tweetMessage = $('<p>').text(tweet.content.text);

  // $tweet.append($newTweetArticle);
  $tweet.append(createHeader(tweet));
  $tweet.append($tweetMessage);
  $tweet.append(createFooter(tweet));

  return $tweet;
};





$(document).ready(() => {
  //error messages are hidden when the document is complete
  $('.errors p').slideUp(0);


  //Orgainizes tweet display in reverse and adds new tweet to top of pile;
  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      let readTweet = createTweetElement(tweet);
      $('#tweets-box').prepend(readTweet);
    }
  };

  // renderTweets(data);
  const loadTweet = () => {
    $.ajax({
      url: "/tweets",
      method: 'GET'
    })
      .then(res => {
        console.log(res);
        let readTweet = createTweetElement(res[res.length - 1]);
        $('#tweets-box').prepend(readTweet);
      });
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: 'GET'
    })
      .then(res => {
        console.log(res);
        renderTweets(res);
      });
  };

  const handleSumbitEvent = (event) => {
    event.preventDefault();
    let tweetLength = $("#tweet-text").val().length;
    if (tweetLength > 0 && tweetLength < 140) {
      $('.errors p').slideUp()
      console.log('Tweet button clicked, performing ajax call...');
      const formData = $(".new-tweet-typed").serialize();
      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: formData
      })
        .then(res => {
          console.log('sent properly', res);
          loadTweet()
          //resets form to blank and counter to 140
          document.getElementById('tweet-text').value = "";
          $('.counter').text('140')
        });
      //hidden error messages reveal here
    } else if (tweetLength > 140) {
      $('#error-msg').text('Too many words');
      $('.errors p').slideDown()
    } else {
      $('#error-msg').text('Invalid Entry!');
      $('.errors p').slideDown()
    }

  }

  $('.new-tweet-typed').on('submit', handleSumbitEvent);



  loadTweets();

});

