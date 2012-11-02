function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null ;
  } catch (e) {
    console.log('LocalStorge not supported') ;
    console.log(e.message) ;
    return false ;
  }
}


function seed_data() {
  if (supports_html5_storage()) {
    localStorage.clear() ;
    var cvs = {
      name: 'CVS',
      format: 'ean8',
      code: "9876543"
    } ;
    var dom = {
      name: 'Dominick\'s',
      format: 'ean8',
      code: "3456789"
    } ;    
    
    db.cards.add(cvs) ;
    pausecomp(100) ;
    db.cards.add(dom) ;

  } else {
    alert ("Could not seed data. No HTML5 Storage") ;
  }
}

function filter_format(str) {
  str = str.toLowerCase() ;
  str = str.replace('_','') ;
  return str ;
}

function pausecomp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}


