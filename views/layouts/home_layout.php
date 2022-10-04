<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/ce80081662.js" crossorigin="anonymous" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="css/style.min.css?v=<?php echo htmlspecialchars(time()); ?>">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <title>Accueil | Prêt pour la vie active</title>
</head>

<body>
    <header>
        <p><a href="#"><img src="medias/img/logo_transparent.png" class="logo__img" alt="prêt pour la vie active logo" /></a></p>
    </header>

    <?php require_once $this->homePage; ?>

    <footer>
        <nav>
            <ul class="footer__navs">
                <li><a href="https://www.instagram.com/pret_pour_la_vie_active/" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="mailto:contact@pretpourlavieactive.fr"><i class="fa-solid fa-at"></i></a></li>
                <li><a href="index.php?page=presentation"><i class="fa-solid fa-circle-info"></i></a></li>
            </ul>
        </nav>
        <p>Prêt pour la vie active &copy;</p>
    </footer>
    <script src="js/app.min.js"></script>
</body>

</html>