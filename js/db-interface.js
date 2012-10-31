db = {

  cards: {    
    fetch: function(idx) {
      var full_idx = idx.substring(0,6) == "cards." ? idx : "cards." + idx ;
      var str = localStorage[full_idx] ;
      var obj = JSON.parse(str) ;
      obj.index = idx.replace('cards.','') ;
      return obj ;
    },
    
    add: function(obj) {
      var idx = 'cards.' + new Date().getTime().toString() ;
      var str = JSON.stringify(obj) ;
      localStorage.setItem(idx,str) ;
    },
    
    all: function() {
      var ret = [] ;
      for (var idx in localStorage) {
        if (idx.substring(0,6) == 'cards.') {
          ret.push(db.cards.fetch(idx)) ;
        }
      }      
      return ret ;
    }
    
  },
  
  slugify: function(str) {
    var ret = str.toLowerCase().replaceAll(' ','-') ;
    ret = ret.replace(/[^a-zA-Z 0-9 -]+/g,'');
    return ret ;
  }
}