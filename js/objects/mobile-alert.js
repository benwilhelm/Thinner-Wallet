mobile_alert = {
  alert: function(msg) {
    mobile_alert.destroy() ;
    var $alert = mobile_alert.create(msg,'alert') ;
    $alert.show() ;
  
    $("#alert_ok").on("click",function(e){
      e.preventDefault() ;
      mobile_alert.destroy() ;
    })
  
    $alert.show() ;
  },
  
  confirm: function(msg,callback_yes,callback_no) {
    mobile_alert.destroy() ;
    var $alert = mobile_alert.create(msg,'confirm') ;
    $alert.show() ;
  
    $("#confirm_yes").on("click",function(e){
      e.preventDefault() ;
      mobile_alert.destroy() ;
      if (callback_yes) { callback_yes(); }
    })
    $('#confirm_no').on('click',function(e){
      e.preventDefault() ;
      mobile_alert.destroy() ;
      if (callback_no) { callback_no() ; } 
    }) ;
  
    $alert.show() ;
  },

  create: function(msg,type) {
    var $pg = $('.ui-page-active').first() ;
    var $window = $("<div id='alert'></div>") ;
    var $container = $("<div id='alert_container'></div>") ;
    var $message = $("<div id='alert_message'>" + msg + "</div>") ;
    var $buttons = $("<div id='alert_buttons'></div>") ;
    $window.append($container) ;
    $container.append($message) ;
    $container.append($buttons) ;

    if (type == 'confirm') {    
      var $yes = $("<div id='confirm_yes' href='#home' data-role='button' data-icon='check' data-inline='true' data-mini='true' >Yes</div>") ;
      var $no = $("<div id='confirm_no' href='#home' data-role='button' data-icon='delete' data-inline='true' data-mini='true' >No</div>") ;      
      $buttons.append($no) ;
      $buttons.append($yes) ;
    } else if (type == 'alert') {
      var $ok = $("<div id='alert_ok' href='#home' data-role='button' data-icon='check' data-inline='true' data-mini='true' >OK</div>") ;
      $buttons.append($ok) ;
    }

    $pg.append($window).trigger("create") ;
    $window.hide() ;
    return $window ;
  },

  destroy: function() {
    $('#alert').remove() ;
  }
}

