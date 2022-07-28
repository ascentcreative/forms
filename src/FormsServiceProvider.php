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

    $this->bootPublishes();


    Blade::directive('form', function ($form) {
        return "<?php echo view('forms::form', ['form' => $form]); ?>";
     });
    
    Blade::directive('formstart', function ($form) {
       return "<?php echo view('forms::formstart', ['form' => $form]); ?>";
    });

    Blade::directive('formbody', function ($form) {
        return "<?php echo view('forms::formbody', ['form' => $form]); ?>";
     });

     Blade::directive('formend', function ($form) {
        return "<?php echo view('forms::formend', ['form' => $form]); ?>";
     });


  }

  

  // register the components
  public function bootComponents() {
    // new aliases
    Blade::component('forms-fields-input', 'AscentCreative\Forms\Components\Fields\Input');
    Blade::component('forms-fields-hidden', 'AscentCreative\Forms\Components\Fields\Hidden');
    Blade::component('forms-fields-compound-date', 'AscentCreative\Forms\Components\Fields\CompoundDate');
    Blade::component('forms-fields-button', 'AscentCreative\Forms\Components\Fields\Button');
    Blade::component('forms-fields-checkbox', 'AscentCreative\Forms\Components\Fields\Checkbox');
    Blade::component('forms-fields-wysiwyg', 'AscentCreative\Forms\Components\Fields\Wysiwyg');
    Blade::component('forms-fields-options', 'AscentCreative\Forms\Components\Fields\Options');
    Blade::component('forms-fields-textarea', 'AscentCreative\Forms\Components\Fields\Textarea');
    Blade::component('forms-fields-fileupload', 'AscentCreative\Forms\Components\Fields\FileUpload');
    

    Blade::component('forms-fields-blockselect', 'AscentCreative\Forms\Components\Fields\BlockSelect');
    Blade::component('forms-fields-foreignkeyselect', 'AscentCreative\Forms\Components\Fields\ForeignKeySelect');
    Blade::component('forms-fields-hasmany', 'AscentCreative\Forms\Components\Fields\HasMany');
    Blade::component('forms-fields-relationautocomplete', 'AscentCreative\Forms\Components\Fields\RelationAutocomplete');
    Blade::component('forms-fields-pivotlist', 'AscentCreative\Forms\Components\Fields\PivotList');

    Blade::component('forms-structure-fieldset', 'AscentCreative\Forms\Components\Structure\Fieldset');
    Blade::component('forms-structure-subform', 'AscentCreative\Forms\Components\Structure\Subform');
    Blade::component('forms-structure-subformloader', 'AscentCreative\Forms\Components\Structure\SubformLoader');
    Blade::component('forms-structure-hr', 'AscentCreative\Forms\Components\Structure\HR');
    Blade::component('forms-structure-html', 'AscentCreative\Forms\Components\Structure\HTML');

    Blade::component('forms-structure-tab', 'AscentCreative\Forms\Components\Structure\Tab');
    Blade::component('forms-structure-tabs', 'AscentCreative\Forms\Components\Structure\Tabs');

    Blade::component('forms-display-blade', 'AscentCreative\Forms\Components\Display\Blade');


    Blade::component('forms-modal', 'AscentCreative\Forms\Components\FormModal');



    // old CMS aliases for backwards compat:
    Blade::component('cms-form-input', 'AscentCreative\Forms\Components\Fields\Input');
    Blade::component('cms-form-hidden', 'AscentCreative\Forms\Components\Fields\Hidden');
    Blade::component('cms-form-button', 'AscentCreative\Forms\Components\Fields\Button');
    Blade::component('cms-form-compound-date', 'AscentCreative\Forms\Components\Fields\CompoundDate');
    Blade::component('cms-form-checkbox', 'AscentCreative\Forms\Components\Fields\Checkbox');
    Blade::component('cms-form-wysiwyg', 'AscentCreative\Forms\Components\Fields\Wysiwyg');
    Blade::component('cms-form-options', 'AscentCreative\Forms\Components\Fields\Options');
    Blade::component('cms-form-textarea', 'AscentCreative\Forms\Components\Fields\Textarea');
    
    Blade::component('cms-form-blockselect', 'AscentCreative\Forms\Components\Fields\BlockSelect');
    Blade::component('cms-form-foreignkeyselect', 'AscentCreative\Forms\Components\Fields\ForeignKeySelect');
    Blade::component('cms-form-hasmany', 'AscentCreative\Forms\Components\Fields\HasMany');
    Blade::component('cms-form-relationautocomplete', 'AscentCreative\Forms\Components\Fields\RelationAutocomplete');
    Blade::component('cms-form-pivotlist', 'AscentCreative\Forms\Components\Fields\PivotList');
    Blade::component('cms-form-fileupload', 'AscentCreative\Forms\Components\Fields\FileUpload');

  }




  

    public function bootPublishes() {

      $this->publishes([
        __DIR__.'/../assets' => public_path('vendor/ascent/forms'),
    
      ], 'public');

      $this->publishes([
        __DIR__.'/config/forms.php' => config_path('forms.php'),
      ]);

    }



}