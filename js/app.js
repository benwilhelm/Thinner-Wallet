$('[data-role="page"]').live('pagebeforecreate',function(e){
  var headerHtml = $('#header_html').html() ;
  $(this).find('[data-role="header"]').html(headerHtml) ;
  //var footerHtml = $('#include_footer').html() ;
  //$(this).find('[data-role="footer"]').html(footerHtml) ;
}) ;

$('[data-role="page"]').live('pageinit',function(e){
  console.log('page load') ;
});