/**
 * Execute command
 */
export default class ExecuteCommand
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
        return "kindlegen:execute";
    }

    /**
     * Get command description
     *
     * @return  {string}    Command description
     */
    getDescription()
    {
        return "Execute kindlegen";
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Command parameters
     */
    *execute(parameters)
    {
        let targetPath = parameters[0];
        let options = {};

        yield this.kindlegen.execute(targetPath, options);
    }
}
