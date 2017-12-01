const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

// Authentication for twitter API
var client = new Twitter({
  consumer_key: 'a2Nhh9MqEfoqbF7wvPOvsJVlt',
  consumer_secret: 'EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU',
  access_token_key: '931617198866444288-xZ94xupUldyuvTZUshHaxlFrk9mWHbP',
  access_token_secret: '0DuUv94HhZJrXF484GQXpKjWMFZ6AttMYJQw5o1FmmdI7'
});

// Grabs user input for screen_name and returns list of tweets.
router.post('/timeline', (req, res, next) => {
	let params = {screen_name: req.body.screenname};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    // var str = "";
	    var timeline = [];
	    for (var key in tweets) {
	    	// console.log(tweets[key].text);
	    	// console.log(tweets[key].user.screen_name);
	    	// str = str.concat(tweets[key].text);
	    	// console.log(str);
	    	let date = tweets[key].created_at;
	    	let [a, b, c, ...d] = date.split(" ");
	    	var created_at = a + " " + b + " " + c;
	    	// console.log(created_at);
	    	let newTweet = {
	    		tweet: tweets[key].text,
	    		screen_name: tweets[key].user.screen_name,
	    		created_at: created_at
	    	}
	    	timeline.push(newTweet);
	    }
	    res.json({success: true, msg: timeline});
	  }else{
	  		res.json({success: false, msg: 'Failed API call'});
		}
	});
});
router.post('/home_timeline', (req, res, next) => {
	let params = {screen_name: req.body.screenname};
	client.get('statuses/home_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    // var str = "";
	    var timeline = [];
	    for (var key in tweets) {
	    	// console.log(tweets[key].text);
	    	// console.log(tweets[key].user.screen_name);
	    	// str = str.concat(tweets[key].text);
	    	// console.log(str);
	    	let date = tweets[key].created_at;
	    	let [a, b, c, ...d] = date.split(" ");
	    	var created_at = a + " " + b + " " + c;
	    	// console.log(created_at);
	    	let newTweet = {
	    		tweet: tweets[key].text,
	    		screen_name: tweets[key].user.screen_name,
	    		created_at: created_at
	    	}
	    	timeline.push(newTweet);
	    }
	    res.json({success: true, msg: timeline});
	  }else{
	  		res.json({success: false, msg: 'Failed API call'});
		}
	});
});
module.exports = router;
