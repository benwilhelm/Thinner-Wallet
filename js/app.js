$('[data-role="page"]').live('pagebeforecreate',function(e){
  var headerHtml = $('#header_html').html() ;
  $(this).find('[data-role="header"]').html(headerHtml) ;
  var footerHtml = $('#footer_html').html() ;
  $(this).find('[data-role="footer"]').html(footerHtml) ;
}) ;

$('[data-role="page"]').live('pageinit',function(e){
  $(".quit").click(function(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    navigator.app.exitApp() ;
  }) ;
});

$('#home').live('pageinit',function(e) {
  var $page = $(this) ;  
  var $homeBtn = $page.find(".home-button") ;
  $homeBtn.attr('data-icon','delete') ;
  $page.trigger('create') ;
}) ;

$('#new').live('pageinit',function(e) {
  var $page = $(this) ;
  var $bc = $page.find('.bc') ;
  var $status = $page.find('.status') ;
  $page.find(".scan").click(function(e){
    $status.html("Scanning...<br>") ;
    scanner.scan(function(rslt){
      $("input#card_format").val(rslt.format) ;
      $("input#card_code").val(rslt.text) ;
      scanner.print(rslt.text,rslt.format,$bc) ;
      $status.append("Format: " + rslt.format + "<br>Code: " + rslt.text ) ;
    }) ;
  }) ;
  
  $page.find(".save").click(function(e){
    console.log("click") ;
    var card_name = $page.find("input#card_name").val() ;
    var card_code = $page.find("input#card_code").val() ;
    var card_format = $page.find("input#card_format").val() ;
    if ( card_name && card_code && card_format ) {
      var obj = {
        name: card_name,
        code: card_code,
        format: card_format
      }
      
      var card_idx = db.cards.add(obj) ;
      console.log(card_idx) ;
      if (card_idx) {
        $('#card').attr('data-card-id',card_idx) ;
        $.mobile.changePage("#card") ;
      } else {
        console.log("error saving card.") ;
        $page.find(".status").html("Error saving card.") ;
      }
    } else {
      $page.find(".status").html("Missing Information") ;
    }
  }) ;
}) ;

$('#card').live('pageinit',function(e){
  var $page = $(this);
  $page.find('.delete').click(function(e){
    var card_idx = $page.attr('data-card-id') ;
    console.log(card_idx) ;
    db.cards.remove(card_idx) ;
    $.mobile.changePage("#home") ;
  }) ;
}) ;



$('#home').live('pagebeforeshow',function(e){
  $page = $(this) ;
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

$('#new').live('pagebeforeshow',function(e){
  var $page = $(this) ;
  $page.find('input').val('') ;
  $page.find('.bc').html('') ;
  $page.find('.status').html('') ;
}) ;

$('#card').live('pagebeforeshow',function(e){
  var card_id = $(this).attr('data-card-id') ;
  var $content = $(this).find("[data-role='content']") ;
  var $status = $(this).find('.status') ;
  var $bc = $(this).find('.bc') ;
  if (card_id) {
    var card = db.cards.fetch(card_id) ;
    $content.find("#card_name_heading").html(card.name) ;
    scanner.print(card.code, card.format, $bc) ;
    $status.html("Format: " + card.format + "<br>Code: " + card.code )
  } else {
    $content.find("#card_name_heading").html("Bad ID") ;
  }
}) ;

