var id = '';

$(document).ready(function() {
	carregar();
});

function carregar() {
	let qParams = new URLSearchParams(window.location.search);
	let param = qParams.get('id');

	$.ajax({
		method: 'GET',
		url: '/livros/'+param,
		dataType: 'json'
	}).done(data => {
		$('#loading').toggle();
		$('#formulario').toggle();
		id = data.id;
		$('#livroNome').val(data.nome);
		$('#livroAutor').val(data.autor);
		$('#livroPreco').val(data.preco);
	});
}

function salvar(e) {
	e.preventDefault();
	let preco = $('#livroPreco').val();
	let nome = $('#livroNome').val();
	let autor = $('#livroAutor').val();

	if(!$.isNumeric(preco) || preco < 0)
		alert('Preço do livro é inválido');

	if(!nome)
		alert('Nome do livro é inválido');

	if(!autor)
		alert('Autor do livro é inválido')

	$.ajax({
		method: 'PATCH',
		url: '/livros/'+id,
		dataType: 'json',
		data: {
			nome: nome,
			autor: autor,
			preco: preco
		}
	}).done(data => {
		$('#modalSalvo').modal();
	});
}

function concluir() {
	$('#modalSalvo').modal('toggle');
	window.location = '/index.html';
}