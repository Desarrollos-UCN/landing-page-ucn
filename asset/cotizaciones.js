document.addEventListener("DOMContentLoaded", () => { 

  const form = document.getElementById("formCotizacion");
  form.addEventListener("submit", enviarCotizacion);

});
cargarCiudades();
cargarProductos();

async function cargarCiudades() {
  const res = await fetch("../php/get_ciudades.php");
  const ciudades = await res.json();

  const select = document.getElementById("ciudad");
  ciudades.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.nombre;
    select.appendChild(option);
  });
}

async function cargarProductos() {
  const res = await fetch("../php/get_productos.php");
  const productos = await res.json();

  const tabla = document.getElementById("tablaProductos");
  productos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" name="producto" value="${p.id}"></td>
      <td>${p.nombre}</td>
      <td><input type="number" min="1" value="1" class="form-control cantidad" data-id="${p.id}"></td>
      <td style="display: none;"><input type="text" value="${p.precio}" class="form-control precio"></td>
    `;
    tabla.appendChild(tr);
  });
}


async function enviarCotizacion(e) {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    ciudad: document.getElementById("ciudad").value,
    direccion: document.getElementById("direccion").value,
    celular: document.getElementById("celular").value,
    productos: []
  };
  

    document.querySelectorAll("#tablaProductos tr").forEach(tr => {
        const chk = tr.querySelector('input[type="checkbox"]');
        const cantidadInput = tr.querySelector('.cantidad');
        const precioInput = tr.querySelector('.precio');

        if (chk && chk.checked) {
            data.productos.push({
            id: chk.value,
            cantidad: cantidadInput.value,
            precio: precioInput.value
            });
        }
    });

    const res = await fetch("/php/cotizaciones.php", {
        method: "POST",
        body: JSON.stringify(data)
    });

    const resultado = await res.json();
    if (resultado.status === "error" || resultado.status === undefined || resultado.status === null) {
        Swal.fire({
            title: 'Error',
            text: resultado.mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        
    } else {
        Swal.fire({
            title: 'Éxitoso',
            text: resultado.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(function () {
            modal.style.display = "none";
        });

    }
}

const modal = document.getElementById("myModal");
const openModal = document.getElementById("openModalBtn");
const closeModal = document.getElementById("closeModalBtn");
const closeModal2 = document.getElementById("closeModalBtn2");

openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
closeModal2.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
