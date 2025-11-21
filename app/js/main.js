document.addEventListener('DOMContentLoaded', () => {
	const textarea = document.querySelector('.textarea-wrapper textarea');
	const clearButton = document.querySelector('.clear-button');
	const shareButton = document.querySelector('.share-button');

	const syncInputState = () => {
		if (!textarea) {
			return;
		}

		const hasValue = textarea.value.trim().length > 0;

		if (clearButton) {
			clearButton.classList.toggle('is-visible', hasValue);
		}

		if (shareButton) {
			shareButton.disabled = !hasValue;
			shareButton.classList.toggle('is-disabled', !hasValue);
		}
	};

	if (textarea) {
		textarea.addEventListener('input', syncInputState);
		syncInputState();
	}

	if (clearButton && textarea) {
		clearButton.addEventListener('click', () => {
			textarea.value = '';
			textarea.focus();
			syncInputState();
		});
	}

	if (shareButton) {
		shareButton.addEventListener('click', () => {
			if (!shareButton.disabled) {
				window.location.href = 'response.html';
			}
		});
	}

	const copyButton = document.querySelector('.message-card__copy .icon-button');
	const messageText = document.querySelector('.message-card__text p');
	const copyFeedback = document.querySelector('.copy-feedback');
	let copyTimeoutId = null;

	if (copyButton && messageText) {
		copyButton.addEventListener('click', async () => {
			const textToCopy = messageText.textContent.trim();

			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(textToCopy);
				} else {
					const tempArea = document.createElement('textarea');
					tempArea.value = textToCopy;
					document.body.appendChild(tempArea);
					tempArea.select();
					document.execCommand('copy');
					document.body.removeChild(tempArea);
				}

				if (copyFeedback) {
					copyFeedback.classList.add('is-visible');

					if (copyTimeoutId) {
						clearTimeout(copyTimeoutId);
					}

					copyTimeoutId = setTimeout(() => {
						copyFeedback.classList.remove('is-visible');
					}, 2000);
				}
			} catch (error) {
				console.error('Copy failed', error);
			}
		});
	}
});