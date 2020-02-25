$(function () {
	var socket = io();
	$('form').submit(function(e) {
		e.preventDefault();
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	})
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));
		console.log('\n');
		console.log('\n');
		console.log('\n');
		console.log('here!!!!!!');
	})
})