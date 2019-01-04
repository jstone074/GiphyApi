var buttons = ["cat", "dog", "rabbit"];

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

function displayGiphy(data) {

    $("#giphyImages").empty()
    var dataButtonInfo = $(data).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9m05DnrzeH6yt3AWCKZi421Q74SoqIY9&q=" + data + "&limit=10&offset=1lang=en";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        giphyData = response.data;

        for (var i = 0; i < giphyData.length; i++) {

            var newDiv = $("<div>");
            var giphyDiv = $("<img>");
            giphyDiv.attr("src", giphyData[i].images.fixed_height.url);
            giphyDiv.addClass("btn mr-1 mb-2");
            $("#giphyImages").append(giphyDiv);

        }

    });

}

$(document).on("click", ".btn", function () {

    displayGiphy($(this).attr("data-search"));
    console.log($(this).attr("data-search"));
})

$("#giphy-button").on("click", function (event) {
    event.preventDefault();
    var newGiphy = $("#giphy-input").val().trim();
    buttons.push(newGiphy);
    console.log(buttons);
    createButton();
})


createButton();



