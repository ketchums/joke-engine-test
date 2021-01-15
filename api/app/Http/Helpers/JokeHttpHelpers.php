<?php declare(strict_types = 1);

namespace App\Http\Helpers;

use Illuminate\Support\Facades\Http;

class JokeHttpHelpers {
    public function getRandomJokes(int $amount) : array {
        $apiEndpoint = str_replace('%amount%', (string) $amount, config('jokes.api'));
        return Http::get($apiEndpoint)->json();
    }
}