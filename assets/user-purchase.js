// Only runs after page is loaded
$(document).ready(function() {
	// Makes sure all the user information is hidden to begin
  $(".user-purchase").hide().fadeIn(3000).fadeOut(3000);
  //// Only runs after element is loaded
  $(".user-purchase").ready(function() {
		//function to capitalize first letter of each word as the API sends everything lowercase 
    $.fn.capitalize = function() {

      return this.each(function() {
        var $this = $(this),
          text = $this.text(),
          tokens = text.split(" ").filter(function(t) {
            return t != "";
          }),
          res = [],
          i,
          len,
          component;
        for (i = 0, len = tokens.length; i < len; i++) {
          component = tokens[i];
          res.push(component.substring(0, 1).toUpperCase());
          res.push(component.substring(1));
          res.push(" "); // put space back in
        }
        $this.text(res.join(""));
      });
    };
		// Calls the API and data
    $.ajax({
    	// You can customize nationality, gender and do much more
      // Check out the documentation for more info here
      // https://randomuser.me/documentation
      
      // Calling API and specifying nationalities US, AU & NZ to be generated
      url: 'https://randomuser.me/api/?nat=us,au,nz,gb&gender=female',
      dataType: 'json',
      success: function(data) {
				
        //just to shorten code when calling each variable
        var api = data.results["0"];
				
        // You can call mutiple variables like first name, last name, city, state and post code
        // For more info check out the Results section https://randomuser.me/
        // Below are are few examples of what has been added in so far
        
        //Requests first name and adds it to the ID fName
        $('#fName').html(api.name.first);
        //Requests city and adds it to the ID city
        $('#city').html(api.location.city);
         //Requests state and adds it to the ID state
        $('#state').html(api.location.state);
         //Requests user image and adds it to the link to the img tag with the class user-pic 
        $('#user-pic').attr("src", api.picture.medium);

				// Capitalizes variables first name, city and state
        $('#fName,#city,#state').capitalize();
      }

    });
		// Function to generate a date between 2 dates
    function randomDate(start, end) {
      var genDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      var formattedDate = dateFormat(genDate, "dddd, mmmm dS yyyy 'at' h:MMTT");
      $('#user-date').append(formattedDate);

    }
		
    // creating old date
    var daysAgo = new Date();
    // Amount of days ago - you can change this to however many days you would like 
    var days = 3;
    daysAgo.setDate(daysAgo.getDate() - days);
		
    //calls the randomDate function to call a date between the daysAgo you set and today
    randomDate(daysAgo, new Date());
		
    // fades in all the information 3 seconds (3000 miliseconds) after the page and element has loaded
    $(".user-purchase").hide().fadeIn(3000); //animating
  });
});