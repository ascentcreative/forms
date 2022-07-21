const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
                'assets/components/*.js',
                'assets/components/croppie/*.js',
                'assets/components/charlimit/*.js',
                // 'assets/multistepform/*.js',
                // 'assets/jquery/*.js'
            ], 
            'assets/dist/js/ascent-forms-bundle.js', 
            'assets/dist/js'
            )

    .styles([
                'assets/components/*.css',
                'assets/components/croppie/*.css',
                'assets/components/charlimit/*.css',
                // 'assets/multistepform/*.css'
            ], 
                'assets/dist/css/ascent-forms-bundle.css', 
                'assets/dist/css'
                );
   
   
   
   
    // .minify(['assets/js/ascent-cms-bundle.js', 'assets/css/ascent-cms-bundle.css']);
    // .postCss('resources/css/app.css', 'public/css', [
    //     //
    // ]);
