<?php

namespace AscentCreative\Forms;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Routing\Router;

class FormsServiceProvider extends ServiceProvider
{
  public function register()
  {
    //   
    $this->mergeConfigFrom(
        __DIR__.'/../config/forms.php', 'forms'
    );

  }

  public function boot()
  {

    $this->loadViewsFrom(__DIR__.'/../resources/views', 'forms');

    $this->loadRoutesFrom(__DIR__.'/../routes/forms-web.php');

    $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

    $this->bootComponents();


  }

  

  // register the components
  public function bootComponents() {

       
       
  }




  

    public function bootPublishes() {

      $this->publishes([
        __DIR__.'/Assets' => public_path('vendor/ascentcreative/forms'),
    
      ], 'public');

      $this->publishes([
        __DIR__.'/config/forms.php' => config_path('forms.php'),
      ]);

    }



}