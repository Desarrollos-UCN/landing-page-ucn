// Lógica de productos y modal para mas-vendidos.html
const productos = [
    {
        nombre: 'Casual Jet Blanco',
        descripcion: 'Zapato casual que te hara lucir bien en cualquier momento.',
        precio: '$129.990',
        imagenes: [
            '../imagenes/SNIKER1.png',
            '../imagenes/sniker2.png',
            '../imagenes/sniker3.png',
            '../imagenes/sniker4.png'
        ],
        tallas: ['7', '8', '9', '10', '11']
    },
    {
        nombre: 'Flux Jet Red',
        descripcion: 'Zapatilla deportiva de alto rendimiento, perfecta para entrenamientos intensos.',
        precio: '$199.990',
        imagenes: [
            '../imagenes/flux_jet.png',
            '../imagenes/flux_jet2.png',
            '../imagenes/flux_jet3.png',
            '../imagenes/flux_jet4.png'
        ],
        tallas: ['7', '8', '9', '10', '11']
    },
    {
        nombre: 'Casual Jet',
        descripcion: 'Zapatilla casual con diseño moderno, ideal para el día a día.',
        precio: '$109.990',
        imagenes: [
            '../imagenes/casual_jet.png',
            '../imagenes/casual_jet2.png',
            '../imagenes/Flux_Dev_Disea_un_tenis_de_casual_de_la_marca_Jet_crea_4_imgen_2.jpg',
            '../imagenes/Flux_Dev_Disea_un_tenis_de_casual_de_la_marca_Jet_crea_4_imgen_2.jpg'
        ],
        tallas: ['7', '8', '9', '10', '11']
    },
    {
        nombre: 'Bota Carrusel',
        descripcion: 'Bota elegante y cómoda, perfecta para cualquier ocasión.',
        precio: '$239.990',
        imagenes: [
            '../imagenes/Botacarrusel.png',
            '../imagenes/botacarrusel2.png',
            '../imagenes/botacarrusel3.png',
            '../imagenes/botacarrusel4.png'
        ],
        tallas: ['7', '8', '9', '10', '11']
    }
];

const modal = document.getElementById('bestSellerModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const thumbsContainer = document.querySelector('.modal-images');
const mainImage = document.getElementById('modalMainImage');
const modalTitle = document.querySelector('.modal-title');
const modalDesc = document.querySelector('.modal-desc');
const modalPrice = document.querySelector('.modal-price');
const modalSizes = document.querySelector('.modal-sizes');

document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.product);
        const prod = productos[idx];
        // Actualizar imágenes
        thumbsContainer.innerHTML = prod.imagenes.map((img, i) =>
            `<img src="${img}" alt="thumb" class="thumb${i===0?' selected':''}" data-img="${img}">`
        ).join('');
        mainImage.src = prod.imagenes[0];
        // Actualizar info
        modalTitle.textContent = prod.nombre;
        modalDesc.textContent = prod.descripcion;
        modalPrice.textContent = prod.precio;
        // Actualizar tallas
        modalSizes.innerHTML = '<span>Talla:</span>' + prod.tallas.map(t =>
            `<label><input type="radio" name="size" value="${t}"> ${t}</label>`
        ).join(' ');
        // Listeners para thumbs
        thumbsContainer.querySelectorAll('.thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbsContainer.querySelectorAll('.thumb').forEach(t => t.classList.remove('selected'));
                this.classList.add('selected');
                mainImage.src = this.dataset.img;
            });
        });
        modal.style.display = 'flex';
    });
});
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
