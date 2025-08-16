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
            }).then(async () => {
                e.target.reset();

                // Consultar la información del usuario usando el id 
                const resultadoCuento = await fetch('../php/generarCuento.php?id=' + resultado.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const datosUsuario = await resultadoCuento.json();
                const div = document.getElementById('cuentoGenerado');
                //Info del usuario
                const cuento = `
                    Había una vez una persona llamada <strong>${datosUsuario.nombres}</strong> <strong>${datosUsuario.apellidos}</strong>, de <strong>${datosUsuario.edad}</strong> años, que vivía en un pequeño pueblo rodeado de montañas y ríos cristalinos. 
                    <strong>${datosUsuario.nombres}</strong> era conocido por su inconfundible cabello <strong>${datosUsuario.colorCabello}</strong> y sus brillantes ojos color <strong>${datosUsuario.colorOjos}</strong>, que parecían reflejar la luz de los colores del alba.
                    Desde pequeñ@, <strong>${datosUsuario.nombres}</strong> sentía una gran pasión por su hobby favorito: <strong>${datosUsuario.Hobby}</strong>. 
                    Cada tarde, después de terminar sus tareas, se dedicaba a <strong>${datosUsuario.Hobby}</strong>, perdiéndose en su mundo de ficción y alegría.
                    Un día, mientras practicaba <strong>${datosUsuario.Hobby}</strong> cerca del lago, <strong>${datosUsuario.nombres}</strong> encontró una misteriosa caja enterrada bajo un árbol. 
                    Al abrirla, descubrió un antiguo mapa que prometía llevar a un tesoro escondido. 
                    Sin pensarlo dos veces, <strong>${datosUsuario.nombres}</strong> decidió embarcarse en la aventura, confiando en su curiosidad y en la chispa de sus ojos color <strong>${datosUsuario.colorOjos}</strong>.
                    Durante el viaje, su cabello <strong>${datosUsuario.colorCabello}</strong> ondeaba al viento y su entusiasmo por <strong>${datosUsuario.Hobby}</strong> le ayudó a resolver los acertijos del mapa usando su ingenio en cada desafio.
                    Finalmente, tras superar varios desafíos, <strong>${datosUsuario.nombres}</strong> encontró el tesoro: no era oro ni joyas, sino un libro mágico que le permitía vivir nuevas historias cada vez que practicaba <strong>${datosUsuario.Hobby}</strong>.
                    Desde entonces, <strong>${datosUsuario.nombres}</strong> <strong>${datosUsuario.apellidos}</strong> siguió explorando el mundo, llevando consigo la magia de sus ojos, su cabello y su pasión por la vida.
                `;

                div.innerHTML = cuento;


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
