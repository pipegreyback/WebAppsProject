(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
// $('#login-button').click(function(){
// 	Materialize.toast('')
// });

$('#password').click(function(){
	Materialize.toast('Acerque tarjeta de acceso.');
	setTimeout(function(){
		$('#password').val('asdadasdasdasdasdasdascascasc');
	},1000);
});
