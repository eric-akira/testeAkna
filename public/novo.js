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
		method: 'POST',
		url: '/livros/',
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