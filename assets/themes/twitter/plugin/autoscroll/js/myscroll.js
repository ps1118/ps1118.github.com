window.onload=function(){
	var max_height;
	if(document.documentElement.clientHeight < document.body.offsetHeight){
		window.scroll(0,document.body.offsetHeight);
		max_height = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
        window.scroll(0,0);
	}
	var topscroll  = document.getElementById('autoscrolltop');
		downscroll = document.getElementById('autoscrolldown');
	var upClickable   = true,
		downClickable = true;
    downscroll.onclick = function(){
        if(downClickable && upClickable){
            var down=setInterval(function(){
                downClickable = false;
                var s=max_height-(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0)-1;
                if(s<=0){
                    clearInterval(down);
                    downClickable = true;
                }
                window.scrollTo(0,max_height-s+Math.ceil(s/8));
            },30);
        }else{}
    };
    topscroll.onclick = function(){
    	if(upClickable && downClickable){
            var top=setInterval(function(){
            	upClickable = false;
                var s=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
	            if(s<=0){
	                clearInterval(top);  
	                upClickable = true;         
	            }
	            window.scrollTo(0,s-Math.ceil(s/8));
            },30);
    	}else{}
    };
    var downhover;
    downscroll.onmouseover = function(){
    	if(downClickable && upClickable){
    		downhover = setInterval(function(){
    			var s = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
    			if(s >= max_height){
    				clearInterval(downhover);
    			}
    			window.scrollTo(0,s+2);
    		},20);
    	}else{}
    };
    downscroll.onmouseout = function(){
    	clearInterval(downhover);
    };
    var tophover;
    topscroll.onmouseover = function(){
    	if(upClickable && downClickable){
    		tophover = setInterval(function(){
    			var s = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
    			if(s <= 0){
    				clearInterval(tophover);
    			}
    			window.scrollTo(0,s-2);
    		},20);
    	}
    };
    topscroll.onmouseout = function(){
    	clearInterval(tophover);
    };
}