import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js (done) {
    src('src/js/app.js')
        .pipe( dest('build/js') ) 

    done()
}

export function css ( done ) {
    src('src/scss/app.scss', { sourcemaps: true}) //Sourcemaps para localizar en la consola donde estan todos los elementos de css
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: true}) )

    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css); //Patron para buscar todos lo archivos .scss
    watch('src/js/**/*.js', js);
}

export default series(js, css, dev) //Inicializa todos funciones sin necesitar llamarlas una por una en el package.json

/*La diferencia entre series y parallel es que series ejecuta una funcion tras otra, mientras que parallel las ejecuta todas a la vez*/

