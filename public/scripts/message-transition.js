window.addEventListener('load', () => {
	const time = 4000;

	document.querySelectorAll('.message').forEach(message => {
		message.classList.add('slide-in-out');

		setTimeout(() => {
			message.classList.add('hidden');
		}, time - 100);
	})
});