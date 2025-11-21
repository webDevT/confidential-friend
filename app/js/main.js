document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById('button-clear');
    const textarea = document.getElementById('textarea');

    clearBtn.addEventListener('click', () => {
        textarea.value = '';
    });


	
});


document.querySelector('.copy-button').addEventListener('click', () => {
    const text = document.querySelector('.message-card__text p').innerText;

    navigator.clipboard.writeText(text)
        
});
