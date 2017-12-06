
var animalArr = ['Cats', 'Dogs', 'Giraffe', 'Zebra', 'Elephant', 'Goat', 'Cow', 'Sheep', 'Tiger', 'Lion', 'Leopard', 'Falcon', 'Sparrow', 'Parrot',
'Wolf', 'Squirrel', 'Pig', 'Deer', 'Horse','Hippopatamus', 'Turtle', 'Rhinoceros','Crows', 'Otter', 'Camel'];

renderButtons();
  // Function for displaying animal data
  function renderButtons() {
   $("#buttons-view").empty();
        
    for (var i = 0; i < animalArr.length; i++) {
     
    var a = $("<button>");
    a.addClass("btn btn-primary animal");
    a.attr("data-name", animalArr[i]);
    a.text(animalArr[i]);
    $("#buttons-view").append(a);
    }
  }

//function to add new dynamic button


$("#addnewAnimal").on("click", function() {
  event.preventDefault();

          var newAnimal = $('#animal-input').val().trim();
          animalArr.push(newAnimal);
          console.log(animalArr);
          renderButtons();
        
  });


//button click function to add button, show rating & 10 giphy
//ajax call to get animals
$(document).on("click", ".animal", function() {

    var animal = $(this).attr("data-name");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        console.log('I was inside ajax');
        event.preventDefault();
        $("#animals").empty();
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          
          var gifDiv = $("<li class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.addClass('gif');
          animalImage.attr("data-state", 'still');
          animalImage.attr("data-still",results[i].images.fixed_height_still.url);
          console.log(results[i].images.fixed_height_still.url);
          
          animalImage.attr("data-animate", results[i].images.fixed_height.url);

          gifDiv.append(p);
          
          gifDiv.append(animalImage);
         
          $("#animals").prepend(gifDiv);
        }
        renderButtons();
      });
      
  });

  //button click to enable/disable still/animation
  $(document).on("click", ".gif", function() {
  
    
    var state = $(this).attr("data-state");
    console.log(state);
    if(state === 'still')
    {
      var linkst = $(this).attr("data-animate")
      $(this).attr("src", linkst);
      console.log(linkst);
      $(this).attr("data-state", 'animate');
      console.log($(this).attr("data-state"));
    }
    else if(state === 'animate')
    {
      var linkan = $(this).attr("data-still");
      $(this).attr("src", linkan);
      console.log(linkan);
      $(this).attr("data-state", 'still');
      console.log($(this).attr("data-state"));
    }
  }); 
  
