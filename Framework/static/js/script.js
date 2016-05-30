$('#leftTab a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
});

$('#rightTab a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
});

$('div.btn-group ul.dropdown-menu li a').click(function (e) {
	var $div = $(this).parent().parent().parent(); 
	var $btn = $div.find('button');
	$btn.html($(this).text() + ' <span class="caret"></span>');
	$div.removeClass('open');
	
	var tableName = this.text;
	var url = "table/"+tableName;
	$.post(url, null, function(response){
			$("#explore").append(response);
        },'html');

	e.preventDefault();
	return false;
});