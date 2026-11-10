const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const iniciarSesion = document.getElementById("inicioSesion")

if (iniciarSesion) {
iniciarSesion.addEventListener("submit", e=>{
        e.preventDefault()
        if(usuario.value.trim().includes(" ")){
                document.getElementById("warnings").innerHTML="Usuario inválido"
        } else if (contrasena.value.length < 8) {
        document.getElementById("warnings").innerHTML = "La contraseña debe tener mínimo 8 caracteres"
    } else {
        document.getElementById("warnings").innerHTML = "Datos válidos"
    }

});
}
const formulario = document.getElementById("registro");
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const correo = document.getElementById("correo")
const contrasenaRegistro = document.getElementById("contrasena")
const confirmarContrasena = document.getElementById("confirmarContrasena")
const registro = document.getElementById("registro")

formulario.addEventListener("submit", e=>{
        e.preventDefault()
        if(nombre.value.trim().includes(" ")){
                document.getElementById("warnings").innerHTML="Nombre inválido"
        } else if (apellido.value.trim().includes(" ")){
                document.getElementById("warnings").innerHTML="Apellido inválido"
        } else if (correo.value.trim().includes(" ")){
                document.getElementById("warnings").innerHTML="Correo inválido"
        } else if (contrasenaRegistro.value.length < 8) {
                document.getElementById("warnings").innerHTML = "La contraseña debe tener mínimo 8 caracteres"
        } else if (contrasenaRegistro.value.trim().includes(" ")){
                document.getElementById("warnings").innerHTML = "La contraseña no puede contener espacios"
        } else if (!/[A-Z]/.test(contrasenaRegistro.value)) {
                document.getElementById("warnings").innerHTML = "La contraseña debe contener al menos una letra mayúscula"
        } else if (!/[0-9]/.test(contrasenaRegistro.value)) {
                document.getElementById("warnings").innerHTML = "La contraseña debe contener al menos un número"
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasenaRegistro.value)) {
                document.getElementById("warnings").innerHTML = "La contraseña debe contener al menos un carácter especial"
        } else if (confirmarContrasena.value.trim() === "") {
                document.getElementById("warnings").innerHTML = "Por favor, confirme su contraseña"
        } else if (contrasenaRegistro.value !== confirmarContrasena.value) {
                document.getElementById("warnings").innerHTML = "Las contraseñas no coinciden"
        }
    });
    function agregarAlCarrito(nombreProducto, precioProducto, idInput) {
        // Obtener la cantidad del producto desde el input correspondiente
        let inputCantidad = document.getElementById(idInput);
        let cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

        // Obtener el carrito del almacenamiento local o inicializarlo como un array vacío
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Crear un objeto con los detalles del producto
        const producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: cantidad
        };
        carrito.push(producto);
        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem("carrito", JSON.stringify(carrito));

        let verbo = cantidad === 1 ? "Se ha agregado" : "Se ha agregado";
        let mensaje = `${verbo} ${cantidad} ${nombreProducto} al carrito.`;
        
        // Mostrar notificación de que el producto se ha agregado al carrito
        const notificacion = document.getElementById("notificacion");
        if (notificacion) {
            notificacion.textContent = mensaje;
            notificacion.classList.add("mostrar");
            setTimeout(() => {
                notificacion.classList.remove("mostrar");
            }, 3000);
        } else {
            alert(mensaje);
        }
}