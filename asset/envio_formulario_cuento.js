async function enviarFormulario(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const respuesta = await fetch('../php/conect.php', {
            method: 'POST',
            body: formData
        });
        const resultado = await respuesta.json();
        if (resultado.status === "ok") {
            Swal.fire({
                title: 'Éxitoso',
                text: resultado.mensaje,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                e.target.reset();

                // Aqui llamar a la funcion para buscar el usuario y generar el cuento



            });
        } else {
            Swal.fire({
                title: 'Error',
                text: resultado.mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }

        
    } catch (error) {
        Swal.fire({
            title: 'Error de conexión',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}
