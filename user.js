var Twitter = require('twitter');
 
module.exports=function (res,screen_name) {
    var client = new Twitter({
        consumer_key: '78minLkn7buOVesNbhXOhf43c',
        consumer_secret: 'sYRke7w0HvLZDfwhe7Uq61fdof6ybGwtXkSfoSnZLY1kBLP8UW',
        access_token_key: '1330519292731928578-gg4XRPVnK3lHgQEk3FX44N6r70Oy9q',
        access_token_secret: 'rXRWFpy002l69vqnmE57mjI6l5j6Xi4IuVurf6sD4AeiY'
      });
       var one_way=[];
       var user_display=[];
      var params = {screen_name: screen_name};
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
              name:user.name,
              avatar:user.profile_image_url,
              screen_name:user.screen_name,
              url:user.url
          };
          user_display.push(user_obj);
          
      });
      res.render('list',{users:user_display});
        });
      
        });
        
      });
}