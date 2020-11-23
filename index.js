var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 var one_way=[];
 var user_display=[];
var params = {screen_name: 'nodejs'};
client.get('followers/ids', params, function(error, follower_results, response) {
  if (error) 
    throw error;
  var followers=follower_results.ids;
  client.get('friends/ids', params, function(error, following_results, response) {
    if (error) {
      throw error;
    }
    var following=following_results.ids;
    following.forEach(function(person){
       if(followers.indexOf(person)===-1){
           one_way.push(person);
       }
    });
one_way=one_way.slice(0,99);
var one_way_string=one_way.join();
client.get('users/lookup', {user_id:one_way_string}, function(error, user_results, response) {
    if (error) {
      throw error;
    }
user_results.forEach(function(user){
    var user_obj={
        name:user.screen_name,
        avatar:user.profile_image_url
    };
    user_display.push(user_obj);
    
});
console.log(user_display);
  });

  });
  
});