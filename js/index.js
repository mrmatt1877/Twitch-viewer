 var usernames = ["hero1877456464654642222", "hero1877", "sxyhxy", "Giggle_Monster", "Mr_Amplified", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "GfinityTV"];

 function getAllTheData() {
   //running through each item in the array
   usernames.forEach(function(username) {
     //making a url to call the api for each item in the array
     function makeURL(type, name) {
       return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
     };
     //variables
     var html
     var status
     var url
     var game
     var logo
     var name
       //making the first call to the api for the profile info
     $.getJSON(makeURL("channels", username), function(data) {
       if (data.logo === null || data.logo === undefined) {
         logo = "http://img-w.zeebox.com/images/profile/generic/Empty_Profile_08.png:square"
       } else {
         logo = data.logo;
       }

       name = data.display_name;

       game = data.game;
       //getting the live stream status. has to be nested in the first call
       $.getJSON(makeURL("streams", username), function(streamData) {

         if (streamData.stream === null) {
           status = "offline";
           game = "offline";
           //console.log("offline")
         } else if (streamData.stream === undefined) {
           status = "no-user";
           name = username
           game = "no-user";
           //console.log("No User")
         } else {
           status = "online";

           // console.log("online")
         };
         //setting the url
         //console.log(data.url)
         if (status === "offline") {
           url = data.url + "/profile";
         } else if (status === "no-user") {
           url = "#";
         } else {
           url = data.url;
         }
         //writing the html. This has to be in the second call to the api or it returns "undefined
         html = '<div class=" feed ' + status + '"><a href="' + url + '" target="_blank"><ul class="info row well"><li class="col-xs-2"><img class="img-circle img-responsive" src="' + logo + '"/></li><li class="name col-xs-1">' + name + '</li><li class="activity col-xs-7">' + game + '</li><li class="status col-xs-2">' + status + '</li></ul></a></div>';

         $(".results").append(html);
       });
       /*console.log(1);
       console.log(usernames.length);*/

     });
   });
 };

 //setting up the links in the nav bar
 $(document).ready(function() {
   getAllTheData();
   $("#1").on("click", function() {
     $("#1").addClass("active");
     $("#2").removeClass("active");
     $("#3").removeClass("active");
     $(".offline").removeClass("hidden");
     $(".online").removeClass("hidden");
     $(".no-user").removeClass("hidden")
   });
   $("#2").on("click", function() {
     $("#2").addClass("active");
     $("#1").removeClass("active");
     $("#3").removeClass("active");
     $(".online").removeClass("hidden");
     $(".offline").addClass("hidden");
     $(".no-user").addClass("hidden")
   });
   $("#3").on("click", function() {
     $("#3").addClass("active");
     $("#1").removeClass("active");
     $("#2").removeClass("active");
     $(".offline").removeClass("hidden");
     $(".online").addClass("hidden");
     $(".no-user").addClass("hidden")
   });
 });