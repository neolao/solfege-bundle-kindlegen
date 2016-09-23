import EpubMangaBundle from "solfegejs-epub-manga";

/**
 * Kindlegen wrapper
 */
export default class Bundle
{
    /**
     * Constructor
     */
    constructor()
    {
    }

    /**
     * Get bundle path
     *
     * @return  {String}        The bundle path
     */
    getPath()
    {
        return __dirname;
    }

    /**
     * Install dependencies
     *
     * @param   {Application}   application     Solfege application
     */
    installDependencies(application)
    {
        application.addBundle(new EpubMangaBundle);
    }
}
