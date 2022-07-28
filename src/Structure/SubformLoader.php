<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use Illuminate\View\ComponentAttributeBag;

use AscentCreative\Forms\Structure\HTML;
use AscentCreative\Forms\Fields\Textarea;

class SubformLoader extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-subformloader';

    public function __construct($name, $source, $resolver) {

        $this->name = $name;
        $this->source = $source;
        $this->resolver = $resolver;

        $this->children([
            // HTML::make('here')
        ]);

    }

    public function populate($data=null) {

        // resolve the value of the source field into the relevant subform:
        dump($data->rule_class);

        $subform = 'AscentCreative\Offer\Forms\Admin\Rules\BuyABCForY';

        dump($subform::make(''));

        // instantiate the necessary subform based on the value
        $this->children([
            $subform::make('dynamic'),
            // Textarea::make('config', "Config"),
        ]);


        // and then call populate on the parent:
        parent::populate($data);

    }


}