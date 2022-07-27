const btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', () => {
    const name = document.getElementById('usuario').value;
    if (name === '') {
        window.location.href = '/error';
    } else {
        const options = {
            method: 'POST',
        };
        fetch(`/api/login/${name}`, options)
        .then(response => response.json())
        .then(data => {
            if (data.logged) {
                window.location.href = '/';
            } else {
                alert('Usuario no Valido');
            }
        })
        .catch(error => console.log(error));
    }
});