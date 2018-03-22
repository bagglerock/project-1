



/**
 * This function searches for videos that are associated with a particular Freebase
 * topic, logging their video IDs and titles to the Apps Script log. This example uses
 * the topic ID for Google Apps Script.
 *
 * Note that this sample limits the results to 25. To return more results, pass
 * additional parameters as documented here:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByTopic() {
    var mid = '/m/0gjf126';
    var results = YouTube.Search.list('id,snippet', {
        topicId: mid,
        maxResults: 25
    });
    for (var i in results.items) {
        var item = results.items[i];
        Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }

    var queryURL = "https://developers.google.com/youtube/v3/code_samples/apps-script#search_by_keyword"


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            clearResults();
            var results = response.hits;
            for (var i = 0; i < results.length; i++) {
                var recipe = results[i].recipe;
                var
                    link = YouTube.url,
                    image = YouTube.image,
                    title = YouTube.label,
                    div = $("<div>"),
                    br = $("<br>"),
                    linkTag = $("<a>"),
                    titleTag = $("<h3>");


                linkTag
                    .attr("href", image)
                    .text("image-link");

                titleTag
                    .text(title);

                div
                    .addClass("search-result");

                div.append(br, linkTag, titleTag);
                $("#results-view").append(div);

            }



        });

    }

/**
 * This function searches for videos that are associated with a particular Freebase
 * topic, logging their video IDs and titles to the Apps Script log. This example uses
 * the topic ID for Google Apps Script.
 *
 * Note that this sample limits the results to 25. To return more results, pass
 * additional parameters as documented here:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByTopic() {
    var mid = '/m/0gjf126';
    var results = YouTube.Search.list('id,snippet', {
        topicId: mid,
        maxResults: 25
    });
    for (var i in results.items) {
        var item = results.items[i];
        Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }


    // Sample js code for search.list

    // See full sample for buildApiRequest() code, which is not 
    // specific to a particular API or API method.

    buildApiRequest('GET',
        '/youtube/v3/search', {
            'maxResults': '25',
            'part': 'snippet',
            'q': 'surfing',
            'type': ''
        });




        

    var queryURL = "https://developers.google.com/youtube/v3/code_samples/apps-script#search_by_keyword"


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            clearResults();
            var results = response.hits;
            for (var i = 0; i < results.length; i++) {
                var recipe = results[i].recipe;
                var
                    link = YouTube.url,
                    image = YouTube.image,
                    title = YouTube.label,
                    div = $("<div>"),
                    br = $("<br>"),
                    linkTag = $("<a>"),
                    titleTag = $("<h3>");


                linkTag
                    .attr("href", image)
                    .text("image-link");

                titleTag
                    .text(title);

                div
                    .addClass("search-result");

                div.append(br, linkTag, titleTag);
                $("#results-view").append(div);

            }



        });


    // Sample js code for search.list

    // See full sample for buildApiRequest() code, which is not 
    // specific to a particular API or API method.

    buildApiRequest('GET',
        '/youtube/v3/search', {
            'maxResults': '25',
            'part': 'snippet',
            'q': 'surfing',
            'type': ''
        });


}


