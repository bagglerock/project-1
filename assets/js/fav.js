//function to populate the items in database to the fav page
function displayFavorites(arr) {

    for (var i = 0; i < arr.length; i++) {
        var favDiv = $("<div>");
        var titleDiv = $("<div>");
        var header = $("<h4>");
        var imgDiv = $("<div>")
        var imageTag = $("<img>");

        var title = arr[i].title;
        header.text(title);
        titleDiv.append(header);

        var image = arr[i].image;
        imageTag.attr("src", image).attr("alt", title);

        favDiv.attr("id", id)
            .addClass(result);

        favDiv.append(
            titleDiv,
            imageDiv
        )

        $("#results-view").append(favDiv);
    }

}
displayFavorites(arr);