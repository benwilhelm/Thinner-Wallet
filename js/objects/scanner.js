scanner = {
  scan: function(callback) {
    try {
      window.plugins.barcodeScanner.scan(function(args) {
        args.success = true ;
        callback(args) ;
      }) ;
    } catch (ex) {
      $('.status').html("Could not scan<br>" + ex.message) ;
    }
  },
  
  print: function(txt,fmt,$obj) {
    var format = filter_format(fmt) ;
    var opts = {
      barWidth:2,
      barHeight:100,
      bgColor:"#F3F3F3"
    } ;
    $obj.barcode(txt,format,opts) ;
    
    var bcWidth = $obj.width() ;
    var wWidth = $(window).width() ;
    var bcHeight = $obj.height() ;
    var wHeight = $(window).height() ;

    if (bcWidth > wWidth || bcHeight > wHeight) {
      opts.barWidth = 1 ;
      opts.moduleSize = 3 ;
      $obj.barcode(txt,format,opts) ;
    }
  }
}