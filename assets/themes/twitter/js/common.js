$(function(){
	window.prettyPrint && prettyPrint();
	if(document.documentElement.clientHeight < document.body.offsetHeight){
		$('#autoscrolltop').show();
	}else{
		$('#autoscrolldown').hide();
	}
});