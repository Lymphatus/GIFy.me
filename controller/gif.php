<?php

include('library/AnimGif.php');

//Validate $_POST parameters
$params_array = array(
    'loops' => $_POST["loops"],
    'delay' => $_POST["delay"],
    'base_folder' => $_POST['UUID']);
//TODO Better error handling on return
if (!validateParameters($params_array)) {
    return;
}

echo createGIF($params_array);

/* --- Functions --- */

function validateParameters($parameters)
{
    /*
     * Check if parameters are digits only
     * Also need to check if they stay in boundaries
     * because someone may run a POST request by his own
    */

    if (!(ctype_digit($parameters['loops']) || ctype_digit($parameters['loops']))) {
        return false;
    }

    if ($parameters['loops'] < 1 || $parameters['loops'] > 99) {
        return false;
    }

    if ($parameters['delay'] < 10 || $parameters['delay'] > 5000) {
        return false;
    }

    if (!preg_match('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i', $parameters['base_folder'])) {
        return false;
    }

    return true;
}

function createGIF($params)
{
    //Get the images
    $frames = $_SERVER['DOCUMENT_ROOT'] . "/storage/". $params['base_folder'] . "/";

    //Set the delay between frames
    /*
     * WARNING This is actually not accurate, since
     * the library accepts centisecond input and we ask user
     * for milliseconds (sounds better design wise <3).
     * Rounding will result in a small error
     */
    $durations = array(round($params['delay'] / 10));

    //Create the GIF with n loops
    $anim = new GifCreator\AnimGif();
    $anim->create($frames, $durations, $params['loops'] - 1);

    //Save it in the same folder for future download
    $anim->save($_SERVER['DOCUMENT_ROOT'] . "/storage/". $params['base_folder'] . "/anim.gif");

    //Return the GIF path
    return "/storage/". $params['base_folder'] . "/anim.gif";
}
