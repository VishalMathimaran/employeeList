$(document).ready(function(){
$(".submit").click(function(){
  var $form = $('form');
if (!$form[0].checkValidity()) {
    $('#modal').modal('hide');

}
});
});
