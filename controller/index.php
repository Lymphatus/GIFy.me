<?php
require('UploadHandler.php');

//No thumbnails generation
$options = array(
    'image_versions' => array()
);
$upload_handler = new UploadHandler($options);
