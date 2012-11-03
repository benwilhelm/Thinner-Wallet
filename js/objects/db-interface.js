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
      var stamp = new Date().getTime().toString() ;
      var idx = 'cards.' + stamp ;
      var str = JSON.stringify(obj) ;
      localStorage.setItem(idx,str) ;
      return stamp ;
    },
    
    remove: function(idx) {
      var full_idx = "cards." + idx ;
      console.log(localStorage[full_idx]) ;
      localStorage.removeItem(full_idx) ;
    },
    
    all: function() {
      var ret = [] ;
      for (var idx in localStorage) {
        if (idx.substring(0,6) == 'cards.') {
          ret.push(db.cards.fetch(idx)) ;
        }
      }  
      
      ret.sort(function(a,b) {
        return a.name > b.name ;
      }) ;
          
      return ret ;
    }
    
  } 
}