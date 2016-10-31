<?php
require('UploadHandler.php');

//Give a timestamp to the uploaded files, so we always respect the order
class InOrderUploadHandler extends UploadHandler {
    protected function trim_file_name($file_path, $name, $size, $type, $error, $index, $content_range) {
        $name = microtime(true);
        $name = str_replace('.', '', $name);
        return $name;
    }
}

//No thumbnails generation
$options = array(
    'image_versions' => array()
);
$upload_handler = new InOrderUploadHandler($options);
