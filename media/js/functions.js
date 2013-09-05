// Google Analytics 
_uacct = "UA-149173-1";
urchinTracker();

$(function () {
    function flicker(){
  
        var $img=$('img');
          
        
        $img.animate({'opacity':0}, 1)
            .animate({'opacity':1}, 10)
            .animate({'opacity':.1}, 1)
            .animate({'opacity':1}, 10)
            .animate({'opacity':.3}, 1)        
            .animate({'opacity':1}, 10);
        
        $img.delay(getRandom(1000, 2000))
            .animate({'opacity':.2}, 1)
            .animate({'opacity':1}, 10)
            .animate({'opacity':.5}, 1)
            .animate({'opacity':1}, 10);
    
        $img.delay(getRandom(500, 2000))
            .animate({'opacity':.1}, 1)
            .animate({'opacity':1}, 1); 
        console.log('animate');
        
        setTimeout(flicker, getRandom(5000, 8000));
    }
    
    function getRandom (min, max) {
        return Math.random() * (max - min) + min;
    }
    
    flicker();

})