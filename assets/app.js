$(document).ready(function () {

    var buttons = ["cat", "dog", "rabbit"];

    for (var i = 0; i < buttons.length; i++) {
        var giphyBtn = $("<button>");
        $(giphyBtn).addClass("btn");
        $(giphyBtn).attr("data-search", buttons[i]);
        $(giphyBtn).text(buttons[i]);
        $("#giphySearchButtons").append(giphyBtn);


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
                giphyDiv.attr("src",giphyData[i].images.fixed_height.url);
                $("#giphyImages").append(giphyDiv);
                
            }

        });

    }

    $(".btn").on("click", function () {

        displayGiphy($(this).attr("data-search"));
        console.log($(this).attr("data-search"));
    })


});


