var toDelId = '';
var toDelNome = '';

$(document).ready(function() {
	carregar();
});

function carregar() {
	$.ajax({
		method: 'GET',
		url: '/livros',
		dataType: 'json'
	}).done(data => {
		$('#loading').toggle();
		
		var rows = $.map(data, (value, index) => {
			console.log(value, index);
			return '<tr><th scope="row">'+value.id+'</th><td>'+value.nome+'</td><td>'+value.autor+'</td><td>R$ '+value.preco+'</td><td><div class="dropdown"><a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Escolha uma opção</a><div class="dropdown-menu" aria-labelledby="dropdownMenuLink"><a class="dropdown-item" href="/editar.html?id='+value.id+'">Editar</a><a class="dropdown-item" href="#" onclick="excluirModal('+value.id+',\''+value.nome+'\')">Excluir</a></div></div></td></tr>';
		});

		$('#tabela-div').toggle();
		$('#tabela-items tbody').html(rows.join(''));
	});
}

function excluirModal(id, nome) {
	console.log(id);
	toDelId = id;
	toDelNome = nome;
	$('#modalExcluir').modal();
	$('#livroExcluir').html(toDelNome);
}

function excluir() {
	$.ajax({
		method: 'DELETE',
		url: '/livros/' + toDelId
	}).done(data => {
		$('#loading').toggle();
		$('#tabela-div').toggle();
		$('#modalExcluir').modal('toggle');
		carregar();
	});
}