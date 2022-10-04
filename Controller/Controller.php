<?php
namespace Controller;

class Controller
{
    private $homePage;
    private $presentationPage;
    private $homeLayout = 'views/layouts/home_layout.php';
    private $presentationLayout = 'views/layouts/presentation_layout.php';

    private function websiteHome()
    {
        $this->homePage = ('views/pages/home.php');
        require_once($this->homeLayout);
    }

    public function displayWebsiteHome()
    {
        return $this->websiteHome();
    }

    private function sitePresentation()
    {
        $this->presentationPage = ('views/pages/presentation.php');
        require_once($this->presentationLayout);
    }

    public function displaySitePresentation()
    {
        return $this->sitePresentation();
    }
}
?>