var buttons = ["Detroit Lions", "Minnesota Vikings", "Chicago Bears", "Greenbay Packers", "Kansas City Chiefs", "Oakland Raiders", "Denver Broncos","Los Angeles Chargers"];
var limit = 20;
$("#giphy-add-btn").hide();

function createButton() {

    $("#giphySearchButtons").empty();



    for (var i = 0; i < buttons.length; i++) {
        var giphyBtn = $("<button>");
        giphyBtn.addClass("btn mr-2 mb-2");
        giphyBtn.attr("data-search", buttons[i]);
        giphyBtn.text(buttons[i]);
        $("#giphySearchButtons").append(giphyBtn);


    }
}

//Function to call the giphy API passing in two variables
//one for the gif and the other for the limit
//default when the button is selected is 10, there is a get more button that will populate 10 more at a time
function displayGiphy(data,limit) {

    $("#giphyImages").empty()
    $("#giphy-add-btn").show();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9m05DnrzeH6yt3AWCKZi421Q74SoqIY9&q=" + data + "&limit="+ limit +"&offset=1lang=en";
    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        giphyData = response.data;

        for (var i = 0; i < giphyData.length; i++) {

            
            var newDiv = $("<div>");
            var giphyRating = $("<div>");
            giphyRating.addClass("flex-column ml-2 mr-2");
            var giphyDiv = $("<img>");
            giphyDiv.attr("src", giphyData[i].images.fixed_height_still.url);
            giphyDiv.attr("data-still",giphyData[i].images.fixed_height_still.url);
            giphyDiv.attr("data-animate",giphyData[i].images.fixed_height.url);
            giphyDiv.attr("data-state","still");
            giphyDiv.addClass("gif mr-1 mb-2");
            giphyRating.html("Rating " + giphyData[i].rating);
            $("#giphyImages").append(giphyRating);
            $(giphyRating).append(newDiv);
            $(newDiv).append(giphyDiv);
           
            console.log(giphyDiv);

        }

    });

}

$(document).on("click", ".btn", function () {

    //resets limit back to 20 when a new button is selected
    limit = 20;
    displayGiphy($(this).attr("data-search"),10);
    currentSelectedGif = $(this).attr("data-search");

    
})

$(document).on("click","#giphy-add-btn", function(){
    displayGiphy(currentSelectedGif,limit);
    limit = limit + 10;
    console.log("This is the new Limit " + limit);
    
})


$(document).on("click",".gif", function(){
    var state = $(this).attr("data-state");
    console.log(state);

    if (state ==="still"){
        $(this).attr( "src", $(this).attr("data-animate"));
        $(this).attr( "data-state","animate");
    } else {
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
    }
})





$("#giphy-button").on("click", function (event) {
    event.preventDefault();
    var newGiphy = $("#giphy-input").val().trim();
    buttons.push(newGiphy);
    console.log(buttons);
    createButton();
})


createButton();



