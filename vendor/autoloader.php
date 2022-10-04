<?php
spl_autoload_register(function ($class) {
    $currentFile = str_replace('\\', DIRECTORY_SEPARATOR, ($class)) . '.php';
    if (file_exists($currentFile)) {
        require_once $currentFile;
    } else {
        exit("Le fichier {$class}.php n'a pas pu être trouvé !");
    }
});
?>