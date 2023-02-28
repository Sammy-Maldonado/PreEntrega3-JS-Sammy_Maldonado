/* CHURULANDIA - CARRITO DE COMPRAS */

//1) Creando la clase producto

class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

//2) Creando los productos

const churuSalmon = new Producto(1, "Churu Salmón", 2390, "img/churu-salmon.png");
const churuPollo = new Producto(2, "Churu Pollo", 2390, "img/churu-pollo.png");
const churuAtun = new Producto(3, "Churu Atún", 2390, "img/churu-atun.jpg");
const churuAtunEscalopa = new Producto(4, "Churu Atún y Escalopa", 2390, "img/churu-atun-y-escalopa.png");
const churuPolloCamaron = new Producto(5, "Churu Pollo Camarón", 2390, "img/churu-pollo-camaron.png");
const churuBitesPolloAtun = new Producto(6, "Churu Bites Pollo Atún", 2390, "img/churu-bites-pollo-atun.jpg");
const churuPopsPollo = new Producto(7, "Churu Pops Pollo", 2790, "img/churu-pops-pollo.jpg");
const churuPopsAtun = new Producto(8, "Churu Pops Atún", 2790, "img/churu-pops-atun.png");
const churuVeinteUnidades = new Producto(9, "Churu 20 Unidades", 11900, "img/churu-20-unidades.jpg");
const churuCincuentaUnidades = new Producto(10, "Churu - 50 Un.", 24990, "img/churu-50-unidades.jpg");
const churuDietCincuentaUnidades = new Producto(11, "Churu Diet - 50 Un.", 34900, "img/churu-diet-pollo-atun-50-unidades.png");

//3) Creando el array con el catalogo de productos

const productos = [churuSalmon, churuPollo, churuAtun, churuAtunEscalopa, churuPolloCamaron, churuBitesPolloAtun, churuPopsPollo, churuPopsAtun, churuVeinteUnidades, churuCincuentaUnidades, churuDietCincuentaUnidades]

//4) Creando el array vacio para el carrito

let carrito = [];

/* Cargando Carrito desde el LocalStorage en caso de que haya información en él */
if(localStorage.getItem("carrito")){
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

//5) Modificando el DOM para mostrando los productos

const ProductosChurulandia = document.getElementById("ProductosChurulandia");

//6) Creando la función para mostrar los productos

const verProductos = () => {
  productos.forEach(Producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
    card.innerHTML =
      `
    <div class ="card rounded-4">
      <img src = "${Producto.img}" class = "card-img-top imgProductos" alt="${Producto.nombre}">
      <div class="contenedorDescripcion">
        <h2 class="text-center"> ${Producto.nombre} </h2>
        <p class="text-center"> $${Producto.precio} </p>
        <button class="btn botonCards" id="boton${Producto.id}"> Agregar al Carrito </button>
      </div>
    </div>
    `
    ProductosChurulandia.appendChild(card);

    //7) Pusheando los productos al array vacío
    const boton = document.getElementById(`boton${Producto.id}`);
    boton.addEventListener("click", () => {
      agregarProducto(Producto.id);
    })
  })
}

verProductos();

//8) Creando la funcion agregar producto

const agregarProducto = (id) => {
  const busquedaProducto = carrito.find(Producto => Producto.id === id);
  if (busquedaProducto) {
    busquedaProducto.cantidad++;
  } else {
    const producto = productos.find(Producto => Producto.id === id);
    carrito.push(producto);
  }
  calcularTotal();
  //Trabajamos con el localStorage:
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//9) Mostrando el carrito de compras

const carritoCointainer = document.getElementById("carritoCointainer");
const mostrarCarrito = document.getElementById("mostrarCarrito");

mostrarCarrito.addEventListener("click", () => {
  verCarrito();
})

const verCarrito = () => {
  carritoCointainer.innerHTML = "";
  carrito.forEach(Producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
    card.innerHTML =
      `
    <div class ="card rounded-4">
      <img src = "${Producto.img}" class = "card-img-top imgProductos" alt="${Producto.nombre}">
      <div class="contenedorDescripcion">
        <h2 class="text-center"> ${Producto.nombre} </h2>
        <p class="text-center"> $${Producto.precio} </p>
        <p class="text-center"> ${Producto.cantidad} </p>
        <button class="btn botonCards" id="eliminar${Producto.id}"> Eliminar </button>
      </div>
    </div>
    `
    carritoCointainer.appendChild(card);

    //10) Habilitando el botón eliminar productos desde el carrito
    const boton = document.getElementById(`eliminar${Producto.id}`);
    boton.addEventListener("click", () => {
      eliminarProducto(Producto.id);
    })
  })
  calcularTotal();
}

//11) Declarando función que elimina el producto del carrito

const eliminarProducto = (id) => {
  const producto = carrito.find(Producto => Producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  verCarrito();

  //Trabajamos con el localStorage:
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//12) Calculando el total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach(Producto => {
    totalCompra += Producto.precio * Producto.cantidad;
  })
  total.innerHTML = `$ ${totalCompra}`;
}

//13) Vaciando todo el carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  vaciarCarritoCompleto();
})

const vaciarCarritoCompleto = () => {
  carrito = [];
  verCarrito();

  //Limpiando el localStorage:
  localStorage.clear();
}

//14) Se trabajó en el localStorage en el punto 4, 8, 11 y 13.

