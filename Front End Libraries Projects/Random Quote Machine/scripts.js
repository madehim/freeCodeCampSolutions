let quotesData;
let curQuote = "", curAuthor = "";
let colors = ["#ebc0ee", "#e59dea", "#9495db", "#95abe5", "#abb4ae", "#ffa98c", "#ffcc8e", "#fbe898", "#cfb1ee", "#89aeee", "#19bfbf", "#e7078c", "#f4ed23", "#f68934", "#ae53a0"];

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuotes() {
   return $.ajax({
     headers: {
       Accept: "application/json"
     },
     url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
     success: function(jsonQuotes){
       if (typeof jsonQuotes === 'string') {
          quotesData = JSON.parse(jsonQuotes);
       }
     }
   });
};

function getRandQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
};

function getSetQuote() {
  let rndQuote = getRandQuote();

  curQuote = rndQuote.quote;
  curAuthor = rndQuote.author;
  
  
   if(inIframe()) {
  $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodingURIComponent('"' + curQuote + ' ""' + curAuthor));
  
  $("#tumbler-quote").attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
   }
     
  $(".change-text-color").animate(
    {opacity: 0},
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $("#text > span").text(curQuote);
      $("#author > p").text("- " + curAuthor);
    }
  );
  

  
  
  let color = Math.floor(Math.random() * colors.length);
  
  $("body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $(".btn").animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
};


$(document).ready(function() {
  getQuotes().then(() => {
    getSetQuote();
  });

  $('#new-quote').on('click', getSetQuote);
  
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + curQuote + '" ' + curAuthor));
    }
  });

  $('#tumbler-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(curAuthor)+'&content=' + encodeURIComponent(curQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  });
});