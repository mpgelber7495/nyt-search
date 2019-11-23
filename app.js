$("#search").click(function() {
  event.preventDefault();
  console.log("yosdfd");
  var startDate = "";
  var endDate = "";
  var searchTerm = $("#search-term").val();
  var limit = $("#numberOfRecord").val();
  var callURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=kdjdawKhMdyUhJm90JcVk30M0ryADXkg`;
  if ($("#startYear").val() !== "") {
    startDate = $("#startYear").val() + "0101";
    callURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&begin_date=${startDate}&api-key=kdjdawKhMdyUhJm90JcVk30M0ryADXkg`;
    if ($("#endYear").val() !== "") {
      endDate = $("#endYear").val() + "0101";
      callURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&begin_date=${startDate}&end_date=${endDate}&api-key=kdjdawKhMdyUhJm90JcVk30M0ryADXkg`;
    }
  }
  if ($("#endYear").val() !== "" && $("#startYear").val() === "") {
    endDate = $("#endYear").val() + "0101";
    callURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&end_date=${endDate}&api-key=kdjdawKhMdyUhJm90JcVk30M0ryADXkg`;
  }

  console.log(callURL);
  $.ajax(callURL).then(function(response) {
    var responseArray = response.response.docs;
    console.log(responseArray);
    for (var i = 0; i < limit; i++) {
      var medialist = $("<li>");
      medialist.addClass("media");
      var articleDiv = $("<div>");
      articleDiv.addClass("media-body");
      var headline = $("<h5>");
      headline.addClass("mt-0");
      headline.addClass("headline");
      headline.text(responseArray[i]["headline"]["main"]);
      var author = $("<p>");
      author.text(responseArray[i]["byline"]["original"]);
      author.addClass("author");
      articleDiv.append(headline);
      articleDiv.append(author);
      medialist.append(articleDiv);
      $("#articles").append(medialist);
    }
  });
});

$("#clear").click(function() {
  $("#articles").html("");
});
