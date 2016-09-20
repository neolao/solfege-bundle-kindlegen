import { exec } from "child-process-promise";
import fs from "fs";
import { copy, remove, readdir, writeFile, move } from "co-fs-extra";
import os from "os";

/**
 * Kindlegen service
 */
export default class Kindlegen
{
    /**
     * Constructor
     *
     * @param   {string}    path                Binary path
     * @param   {object}    epubMangaBuilder    EPUB Manga builder
     */
    constructor(path:string, epubMangaBuilder)
    {
        this.path = path;
        this.epubMangaBuilder = epubMangaBuilder;
    }

    /**
     * Execute kindlegen
     *
     * @param   {string}    targetPath  File or dierctory path to convert
     * @param   {object}    options     Options
     */
    *execute(targetPath:string, options = {})
    {
        let command = `${this.path} ${targetPath}`;

        if (options.fileName) {
            command += ` -o "${options.fileName}"`;
        }

        try {
            let result = yield exec(command);
            console.log(result);
        } catch (error) {
            console.error(error.stdout);
        }
    }

    /**
     * Convert a manga directory containing images
     *
     * @param   {string}    directoryPath       Manga directory path
     * @param   {string}    generatedFilePath   Generated file path
     * @param   {string}    title               Title
     */
    *convertManga(directoryPath:string, generatedFilePath:string, title:string)
    {
        // Build temporary directory
        const tempDirectory = fs.mkdtempSync(`${os.tmpdir()}/kindlegen-`);
        const epubFilePath = `${tempDirectory}/manga.epub`;

        // Build EPUB file
        yield this.epubMangaBuilder.build(directoryPath, epubFilePath, title);

        // Convert
        let options = { fileName: "manga.mobi" };
        yield this.execute(epubFilePath, options);

        // Move generated file
        const convertedFilePath = `${tempDirectory}/manga.mobi`;
        yield move(convertedFilePath, generatedFilePath, {clobber: true});

        // Delete temporary directory
        yield remove(tempDirectory);

        console.log(`Generated file: ${generatedFilePath}`);
    }
}
