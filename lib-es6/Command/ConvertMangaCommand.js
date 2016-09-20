/**
 * Command to convert a manga directory
 */
export default class ConvertMangaCommand
{
    /**
     * Constructor
     *
     * @param   {Kindlegen}     kindlegen   Kindlegen service
     */
    constructor(kindlegen)
    {
        this.kindlegen = kindlegen;
    }

    /**
     * Get command name
     *
     * @return  {string}    Command name
     */
    getName()
    {
        return "kindlegen:convert-manga";
    }

    /**
     * Get command description
     *
     * @return  {string}    Command description
     */
    getDescription()
    {
        return "Convert manga directory";
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Command parameters
     */
    *execute(parameters)
    {
        let targetPath = parameters[0];
        let newFilePath = parameters[1];
        let title = parameters[2];

        yield this.kindlegen.convertManga(targetPath, newFilePath, title);
    }
}
