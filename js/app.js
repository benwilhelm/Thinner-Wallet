seed_data() ;

$('[data-role="page"]').live('pagebeforecreate',function(e){
  var headerHtml = $('#header_html').html() ;
  $(this).find('[data-role="header"]').html(headerHtml) ;
  //var footerHtml = $('#include_footer').html() ;
  //$(this).find('[data-role="footer"]').html(footerHtml) ;
}) ;

$('[data-role="page"]').live('pageinit',function(e){

});

$('#home').live('pageinit',function(e) {
  $list = $("<ul data-role='listview' data-inset='true'></ul>") ;
  var cards = db.cards.all() ;
  for (var j=0; j<=cards.length-1; j++) {
    var card = cards[j] ;
    $list.append("<li><a href='#card' data-idx='" + card.index + "'>" + card.name + "</a></li>") ;
  }
  $(this).find("[data-role='content']").html($list) ;
  $(this).trigger("create") ;
  $links = $list.find('a') ;
  $links.click(function(e){
    e.stopPropagation() ;
    e.preventDefault() ;
    var card_id = $(this).attr('data-idx') ;
    $('#card').attr('data-card-id',card_id) ;
    $.mobile.changePage("#card") ;
  }) ;
}) ;

$('#new').live('pageinit',function(e) {
  $("#new .scan").click(function(e){
    console.log('click') ;
    e.preventDefault() ;
    try {
      window.plugins.barcodeScanner.scan(function(args) {
        $("input#card_format").val(args.format) ;
        $("input#card_code").val(args.text) ;
        $('#new .bc').barcode(args.text,args.format) ;
        $('#new .status').html("Scanned!<br>Text:" + args.text + "<br>Format:" + args.format) ;
      });
    } catch (ex) {
      console.log(ex.message) ;
      $("#new .bc").html("could not scan<br>" + ex.message) ;
    }
  }) ;
}) ;




$('#card').live('pageshow',function(e){
  var card_id = $(this).attr('data-card-id') ;
  var $content = $(this).find("[data-role='content']") ;
  if (card_id) {
    var card = db.cards.fetch(card_id) ;
    $content.find("#card_name_heading").html(card.name) ;
    console.log(card.code) ;
    console.log(card.format) ;
    $content.find(".bc").barcode(card.code,card.format) ;
  } else {
    $content.find("#card_name_heading").html("Bad ID") ;
  }
}) ;

