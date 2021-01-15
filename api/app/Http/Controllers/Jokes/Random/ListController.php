<?php

namespace App\Http\Controllers\Jokes\Random;

use App\Http\Controllers\Controller;
use App\Http\Helpers\JokeHttpHelpers;

class ListController extends Controller
{
    private JokeHttpHelpers $jokeHttpHelpers;

    public function __construct(JokeHttpHelpers $jokeHttpHelpers) {
        $this->jokeHttpHelpers = $jokeHttpHelpers;
    }

    public function __invoke(int $amount) {
        return response()->json(['response_text' => 
            $this->jokeHttpHelpers->getRandomJokes($amount) 
        ], 200);
    }
}