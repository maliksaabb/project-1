$(document).on("click","button", function(){
    //alert("success");
    event.preventDefault();
    var input1 = $('#Input1').val();

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + input1,
        method: "GET"
    }).done(function(response){
        console.log(response);
        results = response.items;

        for (let i = 0; i < results.length - 5; i++){
            let bookImg = results[i].volumeInfo.imageLinks.smallThumbnail
            let bookTitle = results[i].volumeInfo.title + " - " + results[i].volumeInfo.subtitle;
            let bookPublisher = results[i].volumeInfo.publisher;
            let bookAuthor = results[i].volumeInfo.authors;
            let buyBook = results[i].saleInfo.buyLink;
            let available = results[i].saleInfo.saleability
            console.log("book "+ i + " - " + bookImg + bookTitle + bookPublisher + bookAuthor + buyBook);
            let mainDiv = $("<div>");
            let TitleH2 = $("<h2>");
            let publisherH3 = $("<h3>");
            let authorH4 = $("<h4>");
            let bookImgTag = $("<img>", {src: bookImg});
            let linkATag = $("<a>", {href: buyBook ? buyBook : "Unavailable for Purchase"});
            TitleH2.text(bookTitle);
            publisherH3.text(bookPublisher);
            authorH4.text(bookAuthor);
            linkATag.text(available === "FOR_SALE" ? "Link To Buy" : "Not For Sale");
            mainDiv.append(TitleH2, publisherH3, authorH4, bookImgTag, linkATag);
            $(mainDiv).appendTo("#bookshelf");
        }
    })
})