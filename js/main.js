// Inicio de sesion - Registro
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        console.log("Intento de inicio de sesión:");
        console.log("Usuario:", username);
        console.log("Contraseña:", password);

        if (verificarCredenciales(username, password)) {
            Swal.fire({
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
                text: 'Redirigiendo a la página de productos...',
                confirmButtonColor: '#7D2FF6',
            }).then(() => {
                window.location.href = 'page/productos.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo o regístrese.',
            });
        }
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newUsername = event.target.newUsername.value;
        const newPassword = event.target.newPassword.value;

        console.log("Intento de registro:");
        console.log("Nuevo Usuario:", newUsername);
        console.log("Nueva Contraseña:", newPassword);

        registrarUsuario(newUsername, newPassword);

        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Redirigiendo a la página de productos...',
            confirmButtonColor: '#7D2FF6',
        }).then(() => {
            window.location.href = 'page/productos.html';
        });
    });

    function verificarCredenciales(username, password) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

        return usuariosRegistrados.some(user => user.username === username && user.password === password);
    }

    function registrarUsuario(username, password) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        if (usuariosRegistrados.some(user => user.username === username)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Este usuario ya está registrado. Por favor, elija otro nombre de usuario.',
                confirmButtonColor: '#7D2FF6',
            });
            return;
        }

        usuariosRegistrados.push({ username, password });

        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
    }
});

