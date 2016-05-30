$('#leftTab a').click(function (e) {
	 e.preventDefault();
	 $(this).tab('show');
});

$('#rightTab a').click(function (e) {
	 e.preventDefault();
	 $(this).tab('show');
});

document.getElementById('get_file').onclick = function() {
    document.getElementById('my_file').click();
};

