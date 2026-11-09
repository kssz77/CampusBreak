const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const iniciarSesion = document.getElementById("inicioSesion")

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