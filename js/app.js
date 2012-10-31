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
  var $page = $(this) ;
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
  
  $page.find("[data-role='back']").click(function(e){
    e.stopPropagation() ;
    navigator.app.exitApp() ;
  }) ;
}) ;

$('#new').live('pageinit',function(e) {
  var $page = $(this) ;
  $page.find(".scan").click(function(e){
    try {
      $page.find('.status').html('scanning...<br>') ;
      window.plugins.barcodeScanner.scan(function(args) {
        var card_format = filter_format(args.format) ;
        var card_code = args.text ;
        $("input#card_format").val(card_format) ;
        $("input#card_code").val(card_code) ;
        $page.find('.bc').barcode(card_code,card_format,{barWidth:2,barHeight:100}) ;
        $page.find('.status').html("Scanned!") ;
        
        if (card_format == 'qrcode') {
          $(".status").html("We do not handle QR Codes at this time.") ;
        }
      });
    } catch (ex) {
      console.log(ex.message) ;
      $page.find(".bc").append("Could not scan.<br>" + ex.message) ;
    }
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
  if (card_id) {
    var card = db.cards.fetch(card_id) ;
    $content.find("#card_name_heading").html(card.name) ;
    $content.find(".bc").barcode(card.code,card.format,{barWidth:2,barHeight:100}) ;
  } else {
    $content.find("#card_name_heading").html("Bad ID") ;
  }
}) ;

