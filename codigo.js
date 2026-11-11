const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const iniciarSesion = document.getElementById("inicioSesion")

if (iniciarSesion) {
    iniciarSesion.addEventListener("submit", e => {
        e.preventDefault()

        if (usuario.value.trim().includes(" ")) {
            document.getElementById("warnings").innerHTML = "Usuario inválido"
        } else if (contrasena.value.length < 8) {
            document.getElementById("warnings").innerHTML = "La contraseña debe tener mínimo 8 caracteres"
        } else {
            document.getElementById("warnings").innerHTML = "Datos válidos"
        }
    })
}

const formulario = document.getElementById("registro")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const usuarioRegistro = document.getElementById("usuario")
const correo = document.getElementById("correo")
const contrasenaRegistro = document.getElementById("contrasena")
const confirmarContrasena = document.getElementById("confirmarContrasena")

if (formulario) {
    formulario.addEventListener("submit", e => {
        e.preventDefault()

        const warnings = document.getElementById("warnings")

        if (usuarioRegistro.value.trim().includes(" ")) {
            warnings.innerHTML = "El ususairo no puede tener espacios"
        } else if (correo.value.trim().includes(" ")) {
            warnings.innerHTML = "Correo inválido"
        } else if (contrasenaRegistro.value.length < 8) {
            warnings.innerHTML = "La contraseña debe tener mínimo 8 caracteres"
        } else if (contrasenaRegistro.value.trim().includes(" ")) {
            warnings.innerHTML = "La contraseña no puede contener espacios"
        } else if (!/[A-Z]/.test(contrasenaRegistro.value)) {
            warnings.innerHTML = "La contraseña debe contener al menos una letra mayúscula"
        } else if (!/[0-9]/.test(contrasenaRegistro.value)) {
            warnings.innerHTML = "La contraseña debe contener al menos un número"
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasenaRegistro.value)) {
            warnings.innerHTML = "La contraseña debe contener al menos un carácter especial"
        } else if (confirmarContrasena.value.trim() === "") {
            warnings.innerHTML = "Por favor, confirme su contraseña"
        } else if (contrasenaRegistro.value !== confirmarContrasena.value) {
            warnings.innerHTML = "Las contraseñas no coinciden"
        } else {
            warnings.innerHTML = "Registrado con éxito"
        }
    })
}

function agregarAlCarrito(nombreProducto, precioProducto, idInput) {

    let inputCantidad = document.getElementById(idInput)
    let cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1

    let carrito = JSON.parse(localStorage.getItem("carrito")) || []

    const producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: cantidad
    }

    carrito.push(producto)

    localStorage.setItem("carrito", JSON.stringify(carrito))

    let verbo = cantidad === 1 ? "Se ha agregado" : "Se ha agregado"
    let mensaje = `${verbo} ${cantidad} ${nombreProducto} al carrito.`

    const notificacion = document.getElementById("notificacion")

    if (notificacion) {
        notificacion.textContent = mensaje
        notificacion.classList.add("mostrar")

        setTimeout(() => {
            notificacion.classList.remove("mostrar")
        }, 3000)

    } else {
        alert(mensaje)
    }
}


function mostrarCarrito() {

    const contenedor = document.getElementById("contenedorProductos")
    const totalElemento = document.getElementById("totalaPagar")

    if (!contenedor) return

    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let total = 0

    contenedor.innerHTML = ""

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>"

        if (totalElemento) {
            totalElemento.textContent = "0.00"
        }

        return
    }

    carrito.forEach(function (producto) {

        let subtotal = producto.precio * producto.cantidad
        total += subtotal

        let p = document.createElement("p")

        p.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Unitario: $${producto.precio.toFixed(2)} - Subtotal: $${subtotal.toFixed(2)}`

        contenedor.appendChild(p)
    })

    if (totalElemento) {
        totalElemento.textContent = `Total a Pagar: $${total.toFixed(2)}`
    }
}





let formCarrito = document.getElementById("carrito");
let metodoPago = document.getElementById("metodoPago");
let warnings = document.getElementById("warnings");


if(formCarrito){
    document.addEventListener("DOMContentLoaded", mostrarCarrito)

    metodoPago.addEventListener("change", function () {

    if (metodoPago.value === "tarjeta") {

        warnings.innerHTML = `
            <label for="numeroTarjeta">Ingrese su Número de Tarjeta:</label>
            <input type="text" id="numeroTarjeta"
                placeholder="Ingrese su Número de Tarjeta"
                maxlength="16" required>
            <br>

            <label for="fechaExpiracion">Ingrese la Fecha de Expiración:</label>
            <input type="text" id="fechaExpiracion"
                placeholder="MM/AA" required>
            <br>

            <label for="codigoSeguridad">Ingrese el Código de Seguridad (CVV):</label>
            <input type="text" id="codigoSeguridad"
                placeholder="3 dígitos"
                maxlength="3" required>
        `;

    } else if (metodoPago.value === "efectivo") {

        warnings.innerHTML = `
            <p>Por favor, acérquese a caja para realizar
            el pago en efectivo.</p>
        `;

    } else {

        warnings.innerHTML = "";

    }

});

formCarrito.addEventListener("submit", function (e) {

    e.preventDefault();

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        warnings.innerHTML = "El carrito está vacío. Agregue productos antes de comprar.";
        return;
    }

    if (metodoPago.value === "") {
        warnings.innerHTML = "Por favor, seleccione un método de pago.";
        return;
    }

    if (metodoPago.value === "efectivo") {

        warnings.innerHTML = "¡Pedido realizado con éxito! Acérquese a caja para realizar el pago.";

    } else if (metodoPago.value === "tarjeta") {

        let tarjeta = document.getElementById("numeroTarjeta").value.trim();
        let fecha = document.getElementById("fechaExpiracion").value.trim();
        let codigo = document.getElementById("codigoSeguridad").value.trim();

        if (tarjeta.length !== 16 || isNaN(tarjeta)) {
            warnings.innerHTML = "El número de tarjeta debe contener exactamente 16 dígitos.";
            return;
        }

        if (fecha === "" || codigo.length !== 3 || isNaN(codigo)) {
            warnings.innerHTML = "Ingrese la fecha de expiración y un código de seguridad válido (3 dígitos).";
            return;
        }

        warnings.innerHTML = "¡Pago realizado con éxito! Gracias por su compra.";

    }

    localStorage.removeItem("carrito");
    mostrarCarrito();

});
}


let detalles = document.getElementById("detalles")

const pedido1 = document.getElementById("pedido1")
const pedido2 = document.getElementById("pedido2")
const pedido3 = document.getElementById("pedido3")

if (pedido1 && pedido2 && pedido3 && detalles) {

    pedido1.addEventListener("click", function () {

        pedido1.classList.add("activo");
        pedido2.classList.remove("activo");
        pedido3.classList.remove("activo");

        detalles.innerHTML = `
            <h2>Detalles del pedido #001</h2>
            <p>Fecha: 07/11/2026</p>

            <h4>Productos:</h4>
            <p>2 Empanadas de Queso - $2.00</p>
            <p>1 Empanada de Carne - $1.50</p>
            <p>1 Bolón de Queso - $2.50</p>

            <h4>Total: $6.00</h4>
            <p>Método de pago: Tarjeta de crédito</p>
            <p>Estado: Cancelado</p>
        `;
    });


    pedido2.addEventListener("click", function () {

        pedido2.classList.add("activo");
        pedido1.classList.remove("activo");
        pedido3.classList.remove("activo");

        detalles.innerHTML = `
            <h2>Detalles del pedido #002</h2>
            <p>Fecha: 08/11/2026</p>

            <h4>Productos:</h4>
            <p>2 Empanadas de Carne - $3.00</p>
            <p>2 Bolones de Queso - $5.00</p>
            <p>1 Empanada de Queso - $1.00</p>

            <h4>Total: $9.00</h4>
            <p>Método de pago: Efectivo</p>
            <p>Estado: Entregado</p>
        `;
    });


    pedido3.addEventListener("click", function () {

        pedido3.classList.add("activo");
        pedido1.classList.remove("activo");
        pedido2.classList.remove("activo");

        detalles.innerHTML = `
            <h2>Detalles del pedido #003</h2>
            <p>Fecha: 09/11/2026</p>

            <h4>Productos:</h4>
            <p>1 Bolón de Queso - $2.50</p>
            <p>3 Empanadas de Queso - $3.00</p>
            <p>2 Empanadas de Carne - $3.00</p>

            <h4>Total: $8.50</h4>
            <p>Método de pago: Tarjeta de débito</p>
            <p>Estado: Listo para retirar</p>
        `;
    });

}
