var animalArr = ['Cats', 'Dogs', 'Giraffe'];

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
$(".animal").on("click", function() {
    var animal = $(this).attr("data-name");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        console.log('I was inside ajax');
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalImage.addClass('gif');
          animalImage.attr("data-state", 'still');

          gifDiv.append(p);
          gifDiv.append(animalImage);

          $("#animals").prepend(gifDiv);
        }
        renderButtons();
      });
  });

  $(".gif").on("click", function() {
    
    var state = $(this).attr("data-state");
    console.log(state);
    if(state === 'still')
    {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", 'animate');
      console.log($(this).attr("data-state"));
    }
    else if(state === 'animate')
    {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", 'still');
      console.log($(this).attr("data-state"));
    }
  }); 
  
