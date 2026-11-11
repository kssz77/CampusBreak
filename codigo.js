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
function mostrarCarrito() {
        const contenedor = document.getElementById("contenedorProductos");
        const totalElemento = document.getElementById("totalaPagar");

        if(!contenedor) return; // Salir si el contenedor no existe

       let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
       let total = 0;

       // Limpiar el contenedor antes de mostrar los productos
       contenedor.innerHTML = "";

       if (carrito.length === 0) {
           contenedor.innerHTML = "<p>El carrito está vacío.</p>";
           if (totalElemento)totalElemento.textContent =  "0.00";
               return;
           }

       carrito.forEach(function(producto) {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        let p = document.createElement("p");
        p.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Unitario: $${producto.precio.toFixed(2)} - Subtotal: $${subtotal.toFixed(2)}`;
        contenedor.appendChild(p);
    });
    if (totalElemento) {
        totalElemento.textContent = `Total a Pagar: $${total.toFixed(2)}`;
    }

}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

const formCarrito=document.getElementById("carrito");
if(formCarrito){
        formCarrito.addEventListener("submit",function(e){
                e.preventDefault();

                const warnings =document.getElementById("warnings");
                const metodo = document.getElementById("metodoPago") ? document.getElementById("metodoPago").value : "";
                const tarjeta =document.getElementById("numeroTarjeta")?document.getElementById("numeroTarjeta").value.trim():"";
                const fecha =document.getElementById("fechaExpiracion")?document.getElementById("fechaExpiracion").value.trim():"";
                const codigoSeguridad =document.getElementById("codigoSeguridad")?document.getElementById("codigoSeguridad").value.trim():"";
                const carrito =JSON.parse(localStorage.getItem("carrito")) || [];


                //validar carrito
                if(carrito.length===0){
                   warnings.style.color="#b71c1"
                   warnings.innerHTML= "El carrito esta vacio. Agregue productos antes de comprar .";
                  return;
                }
                //validar un método de pago
                if(metodo === "") {
                        warnings.style.color = "#b71c1c";
                        warnings.innerHTML = "Por favor, selecciona un método de pago.";
                        return;
                }
                //Opción Efectivo
                if (metodo === "efectivo"){
                        warnings.style.color = "green";
                        warnings.innerHTML = "¡Pedido realizado con éxito! Pagará en efectivo al recibir el pedido ";
                        
                        localStorage.removeItem("carrito");
                        mostrarCarrito();
                        return;
                }

                //validar tarje tenga 16 digitos
                if (metodo === "tarjeta"){
                if (tarjeta.length !== 16 || isNaN(tarjeta)){
                        warnings.style.color = "#b71c1c";
                        warnings.innerHTML = "El número de tarjeta de contener exactamente 16 dígitos";
                        return;
                }

                if(fecha === "" || codigoSeguridad.length !== 3 || isNaN(codigoSeguridad)){
                   warnings.style.color = "#b71c1c";
                        warnings.innerHTML = "Ingrese la fecha de expiración y un código de seguridad válido (3 dígitos)";
                        return;      
                }
                 warnings.style.color = "green";
                 warnings.innerHTML = "¡Pago realizando con éxito! Gracias por su compra.";

                 localStorage.removeItem("carrito");
                 mostrarCarrito(); 
        }      

   });
}