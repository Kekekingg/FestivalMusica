document.addEventListener('DOMContentLoaded', function() { 
    navegacionFIja();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
})

function navegacionFIja() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function() {
        if (sobreFestival.getBoundingClientRect().bottom < 1) { //Permite revisar si ya pasaste algun elemento
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;    
    
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galeria'

        //Event Handler
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galeria'

    //Generar modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    //Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)

    //Agregar al html
    const body =  document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}
 function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove() //Es un operador ternario, un if pero simplificado

        const body =  document.querySelector('body')
        body.classList.remove('overflow-hidden')//Recupera el scroll del body
    }, 500);
    
 }

 function resaltarEnlace () {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight //Cuantos pixeles mide ese section

            //Entre 3 para resaltar la seccion actual
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
               actual = section.id
            }
        })

        //Resaltar el enlace activo
        navLinks.forEach(link => {
            link.classList.remove('active') //Remueve la clase active de todos los enlaces
            if (link.getAttribute('href') === '#' + actual){
                link.classList.add('active')
            } 
        })
    })
 }

 function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();//Evita que se recargue la pagina al hacer click en el enlace
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({
                behavior: 'smooth' //Desplazamiento suave hacia la seccion
            })            
        })
    })
 }