// todo: variebles

const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

cargarEvents();

function cargarEvents(){
    //todo: agregar curso cuando presionas agregar curso.
    listaCursos.addEventListener('click',agregarCurso)

    //todo: eliminar curso del carrito
    carrito.addEventListener('click',eliminarCurso) 

    //todo: limpiar carrito de compras
    vaciarCarritoBtn.addEventListener('click', () =>{
        // console.log('vaciando carrito');
        articulosCarrito = [];
        limpiarHtml();
    })
};

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        // console.log(e.target.getAttribute('data-id'));
        const cursoId= e.target.getAttribute('data-id')
        
        //! elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(( curso ) => curso.id !== cursoId)
        // console.log(articulosCarrito);

        carritoHtml();
    }
    // console.log('desde eliminar curso');
};


function agregarCurso(e){
    e.preventDefault();
    // console.log(e.target.classList);
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

//todo: leer el contenido del html al cual se le dio click y extraer datos.

function leerDatosCurso(curso){
    // console.log(curso)
    const infoCurso = {
        img: curso.querySelector('img').src,
        titulo : curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.info-card .precio span').textContent,
        id: curso.querySelector('.info-card a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso)
    //todo: revisa si ya existe un elemento
    const existe = articulosCarrito.some( (curso) => curso.id === infoCurso.id);
    // console.log(existe)
    if(existe){
        const cursos = articulosCarrito.map((curso) => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso //!retorna objetos actualizados en la cantidad
            }else{
                return curso //! retorna el objeto tal cual
            }
        } );
        articulosCarrito = [...cursos]
    }else{
        //todo: agrega articulos al carrito
        articulosCarrito = [...articulosCarrito,infoCurso]
    }

    // console.log(articulosCarrito);
    carritoHtml()
}

//todo: muestra el carrito en el html

function carritoHtml(){
    //* limpia el html
    limpiarHtml()
    //*recorre carrito y genera html
    articulosCarrito.forEach((curso) =>{
        const {img,titulo,precio,cantidad,id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td><img src ="${img}" width="120"></td>
            <td> ${titulo} </td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class= "borrar-curso" data-id="${id}"> X </a> </td>
        `

        contenidoCarrito.appendChild(row)
    });

}

//* elimina html del tbody
function limpiarHtml(){
    //* forma rapida
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild)
    }
    //!forma lenta
    // contenidoCarrito.innerHTML = '';
}