<?php
namespace AscentCreative\Forms;

use AscentCreative\Forms\Structure\Fieldset;
use AscentCreative\Forms\Fields\Input;
use AscentCreative\Forms\Fields\Button;

class TestForm extends Form {

    public function __construct() {

        $this->children([

            Fieldset::make()
                ->children([

                ]),
            
            Fieldset::make()
                ->label('Test Fieldset')
                ->children([
                    Input::make('name')
                        ->type('text')
                        ->label('Name:')
                        ->required(true, 'message here')
                        ->wrapper('simple'),
                    Input::make('email')
                        ->type('text')
                        ->label('Email:')
                        ->required(true)
                        ->wrapper('simple'),
                ]),

            Fieldset::make()
                ->children([
                    Button::make('submit')
                        ->label('Submit')
                        ->wrapper('simple'),
                    
                ]),
        ]);

    }

}