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
    scanner.scan(function(rslt){
      $("input#card_format").val(rslt.format) ;
      $("input#card_code").val(rslt.text) ;
      scanner.print(rslt.text,rslt.format,$bc) ;
      $status.append("Format: " + rslt.format + "<br>Code: " + rslt.text ) ;
    }) ;
  }) ;
  
  $page.find(".save").click(function(e){
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
      if (card_idx) {
        $('#card').attr('data-card-id',card_idx) ;
        $.mobile.changePage("#card") ;
      } else {
        mobile_alert.alert("Error saving card") ;
      }
    } else {
      mobile_alert.alert("You are missing some information.  Please make sure you have included a title for the card and scanned a bar code.")
    }
  }) ;
}) ;

$('#card').live('pageinit',function(e){
  var $page = $(this);
  $page.find('.delete').click(function(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    mobile_alert.confirm("Are you sure you want to delete this card?",function(){
      var card_idx = $page.attr('data-card-id') ;
      db.cards.remove(card_idx) ;
      $.mobile.changePage("#home") ;
    }) ;
  }) ;
}) ;



$('#home').live('pagebeforeshow',function(e){
  $page = $(this) ;
  $list = $("<ul data-role='listview' data-inset='true'></ul>") ;
  $content = $page.find('.content') ;
  var cards = db.cards.all() ;
  if (cards.length > 0) {
    for (var j=0; j<=cards.length-1; j++) {
      var card = cards[j] ;
      $list.append("<li><a href='#card' data-idx='" + card.index + "'>" + card.name + "</a></li>") ;
    }
    $content.html($list) ;
    $page.trigger("create") ;
    $links = $list.find('a') ;
    $links.click(function(e){
      e.stopPropagation() ;
      e.preventDefault() ;
      var card_id = $(this).attr('data-idx') ;
      $('#card').attr('data-card-id',card_id) ;
      $.mobile.changePage("#card") ;
    }) ;
  } else {
    $content.html("<p>You have no saved cards.</p>") ;
    $content.append("<a data-role='button' href='#new'>Add a Card</a>") ;
    $page.trigger('create') ;
  }
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

