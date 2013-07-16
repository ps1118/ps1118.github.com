$(function(){
	window.prettyPrint && prettyPrint();
	if(document.documentElement.clientHeight < document.body.offsetHeight){
		$('#autoscroll').show();
	}else{
		$('#autoscroll').hide();
	}
});