<?php

namespace AscentCreative\Forms\Rules;

use Illuminate\Contracts\Validation\Rule;

class CharLimit implements Rule
{

    private $limit;
    private $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($limit)
    {
        //
        $this->limit = $limit;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {

        $raw = strip_tags($value);
        if (strlen($raw) > $this->limit) {
            $this->message = "Please use fewer than $this->limit characters";
            return false;
        }
        
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
