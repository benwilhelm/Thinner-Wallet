scanner = {
  scan: function(callback) {
    try {
      window.plugins.barcodeScanner.scan(function(args) {
        args.success = true ;
        callback(args) ;
      }) ;
    } catch (ex) {
      mobile_alert.alert("<strong>Error scanning your card</strong><br>" + ex.message) ;
    }
  },
  
  print: function(txt,fmt,$obj) {
    $obj.html('This application cannot currently print ' + fmt + ' bar codes.') ;
    var format = filter_format(fmt) ;
    var opts = {
      barWidth:2,
      barHeight:100,
      bgColor:"#FFFFFF"
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