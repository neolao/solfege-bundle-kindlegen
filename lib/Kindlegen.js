"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _childProcessPromise = require("child-process-promise");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _coFsExtra = require("co-fs-extra");

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Kindlegen service
 */
class Kindlegen {
    /**
     * Constructor
     *
     * @param   {string}    path                Binary path
     * @param   {object}    epubMangaBuilder    EPUB Manga builder
     */
    constructor(path, epubMangaBuilder) {
        if (!(typeof path === 'string')) {
            throw new TypeError("Value of argument \"path\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(path));
        }

        this.path = path;
        this.epubMangaBuilder = epubMangaBuilder;
    }

    /**
     * Execute kindlegen
     *
     * @param   {string}    targetPath  File or dierctory path to convert
     * @param   {object}    options     Options
     */
    *execute(targetPath) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (!(typeof targetPath === 'string')) {
            throw new TypeError("Value of argument \"targetPath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(targetPath));
        }

        var command = this.path + " " + targetPath;

        if (options.fileName) {
            command += " -o \"" + options.fileName + "\"";
        }

        try {
            var result = yield (0, _childProcessPromise.exec)(command);
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
    *convertManga(directoryPath, generatedFilePath, title) {
        if (!(typeof directoryPath === 'string')) {
            throw new TypeError("Value of argument \"directoryPath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(directoryPath));
        }

        if (!(typeof generatedFilePath === 'string')) {
            throw new TypeError("Value of argument \"generatedFilePath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(generatedFilePath));
        }

        if (!(typeof title === 'string')) {
            throw new TypeError("Value of argument \"title\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(title));
        }

        // Build temporary directory
        var tempDirectory = _fs2.default.mkdtempSync(_os2.default.tmpdir() + "/kindlegen-");
        var epubFilePath = tempDirectory + "/manga.epub";

        // Build EPUB file
        yield this.epubMangaBuilder.build(directoryPath, epubFilePath, title);

        // Convert
        var options = { fileName: "manga.mobi" };
        yield this.execute(epubFilePath, options);

        // Move generated file
        var convertedFilePath = tempDirectory + "/manga.mobi";
        yield (0, _coFsExtra.move)(convertedFilePath, generatedFilePath, { clobber: true });

        // Delete temporary directory
        yield (0, _coFsExtra.remove)(tempDirectory);

        console.log("Generated file: " + generatedFilePath);
    }
}
exports.default = Kindlegen;

function _inspect(input) {
    function _ref2(key) {
        return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key]) + ';';
    }

    function _ref(item) {
        return _inspect(item) === first;
    }

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input === "undefined" ? "undefined" : _typeof(input);
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            var first = _inspect(input[0]);

            if (input.every(_ref)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.map(_inspect).join(', ') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        var keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        var entries = keys.map(_ref2).join('\n  ');

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + entries + '\n}';
        } else {
            return '{ ' + entries + '\n}';
        }
    }
}

module.exports = exports['default'];