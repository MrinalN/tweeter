/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.

//NOTESS:::
// delete unused functions
// cheveron Animation
// clean up timeStamp

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
  if (secondsPast === 3600) {
    return 'an hour ago';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + ' hours ago';
  }
  if (secondsPast <= 259200) {
    return parseInt(secondsPast / 86400) + ' months ago';
  }
  if (secondsPast <= 31536000) {
    return parseInt(secondsPast / 259200) + ' years ago';
  }
}

// NOT USING error outputs function
const errorOutputs = (input) => {
  if (input.length === 0) {
    return alert('Invalid input!');
  } else if (input.length > 140) {
    return alert('Exceeded 140 character limit!');
  }
};

//creates tweet header
const createHeader = (tweet) => {
  const $tweetHeader = $('<header>').addClass('tweet_header');
  const $presetAvatar = $('<img>').attr('src', tweet.user.avatars);
  const $presetUserHandle = $('<p>').text(tweet.user.handle);

  $tweetHeader.append($presetAvatar);
  $tweetHeader.append($presetUserHandle);

  return $tweetHeader;
};

//creates tweet footer
const createFooter = (tweet) => {
  const $tweetFooter = $('<footer>').addClass('tweet_footer');
  const $presetTime = $('<time>').text(timeSince(tweet.created_at));
  const $retweetFlagHeartIcons = $(`<p><i class="fas fa-retweet"></i> <i class="fas fa-flag"></i> <i class="fas fa-heart"></i></p>`);

  $tweetFooter.append($presetTime);
  $tweetFooter.append($retweetFlagHeartIcons);

  return $tweetFooter;
};

//creates full tweet post, combining user input text and header + footer
const createTweetElement = (tweet) => {
  const $tweet = $('<section id="tweets-container">');
  const $newTweetArticle = $('<article>');
  const $tweetMessage = $('<p>').text(tweet.content.text);

  $tweet.append($newTweetArticle);
  $tweet.append(createHeader(tweet));
  $tweet.append($tweetMessage);
  $tweet.append(createFooter(tweet));

  return $tweet;
};





$(document).ready(() => {
  $('.errors p').slideUp(0);
 

  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      let readTweet = createTweetElement(tweet);
      $('#tweets-box').prepend(readTweet);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
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
          // $('#tweet-text').val('');
          document.getElementById('tweet-text').value = "";
          $('.counter').text('140')
          //this is where the action for instant posting would go...
          //then .text("")? to empty and counter reset?
        });

    } else if (tweetLength > 140) {
      //  alert('Exceeded 140 character limit!');
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

// ***
// $(".new-tweet-typed").text('');
// $('.counter').text('140')






// const handleSumbitEvent = (event) => {
//   event.preventDefault();
//   let tweetLength = $("#tweet-text").val().length;
//   console.log(tweetLength)
//   if (tweetLength === 0) {
//     $('#no_words').slideDown(7000);
//     // return alert('Invalid input');
//   } else if (tweetLength > 140) {
//     return alert('Exceeded 140 character limit!');
//     // $('#too_many_words').slideDown();
//   } else {
//     console.log('Tweet button clicked, performing ajax call...');
//     const formData = $(".new-tweet-typed").serialize();
//     $.ajax({
//       url: "/tweets",
//       method: 'POST',
//       data: formData
//     })
//       .then(res => {
//         console.log('sent properly', res);
//         loadTweet()
//         //this is where the action for instant posting would go...
//         //then .text("")? to empty and counter reset?
//       });
//   }






/*
The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
The form should not be cleared
The form should not submit */

// if('.new-tweet-typed' === "") {
//   $("<div title='Error'>Invalid tweet. Try again!</div>").dialog();
// }
// if('.new-tweet-typed'.length > 140) {
//   $("<div title='Error'>Tweet too long. Please keep to 140 characters.</div>").dialog();
// }



// const $newTweetIconHeader = $('<header class="profile-icon">')
    // const $newTweetIcon = $('<i class="far fa-user-circle">')


    // const $tweetMessage = $('<p>')
    // $tweetMessage.append(`${tweet.content.text}`)

    // const $tweetFooter = $('<footer>')
    // $tweetFooter.append(`${tweet.created_at}`)
    // $tweetFooter.append(`<p><i class="fas fa-retweet"></i><i class="fas fa-flag"></i><i class="fas fa-heart"></i></p>`)


    // $tweet.append($newTweetArticle)
    // $tweet.append($newTweetIconHeader)
    // $tweet.append($newTweetIcon)
    // $tweet.append($tweetMessage)
    // $tweet.append($tweetFooter)

    //   const $tweet = `
    // <section id="tweets-container">
    // <article>
    //   <header>
    //     <div class="profile-icon">
    //       <i class="far fa-user-circle"></i>
    //     </div>
    //   </header>

    //   <p>
    //   ${tweet.user.handle}
    //   </p>

    //   <p>
    //   ${tweet.content.text}
    //   </p>

    //   <footer>
    //     <p>10 Days Ago</p>
    //     <p><i class="fas fa-retweet"></i> <i class="fas fa-flag"></i> <i class="fas fa-heart"></i></p>
    //   </footer>
    // </article>
    // </section>`