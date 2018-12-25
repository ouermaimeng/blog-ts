const hljs = require("highlight.js"); // https://highlightjs.org/
import "../style/github-markdown.css";
import "../style/atom-one-dark.css";

const md = require("markdown-it")({
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled, and
    // smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German, and ['«\xA0',
    // '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",

    // Highlighter function. Should return escaped HTML, or '' if the source string
    // is not changed and should be escaped externally. If result starts with
    // <pre... internal wrapper is skipped.
    highlight: function(str, lang) {
        const esc = md.utils.escapeHtml;
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs language-${esc(lang)}"><code>${
        hljs
          .highlight(lang, str, true)
          .value}</code></pre>`;
            } catch (__) {}
        }

        return `<pre class="hljs"><code>${esc(str)}</code></pre>`;
    }
});

// Beautify output of parser for html content
md.renderer.rules.table_open = function() {
    return '<table class="table table-striped table-bordered">\n';
};

// Replace emoji codes with images
md.renderer.rules.emoji = function(token, idx) {
    return window
        .twemoji
        .parse(token[idx].content);
};
//
// Inject line numbers for sync scroll. Notes:
//
// - We track only headings and paragraphs on first level. That's enough.
// - Footnotes content causes jumps. Level limit filter it automatically.
function injectLineNumbers(tokens, idx, options, env, slf) {
    var line;
    if (tokens[idx].map && tokens[idx].level === 0) {
        line = tokens[idx].map[0];
        tokens[idx].attrJoin("class", "line");
        tokens[idx].attrSet("data-line", String(line));
    }
    return slf.renderToken(tokens, idx, options, env, slf);
}

md.renderer.rules.paragraph_open = md.renderer.rules.heading_open = injectLineNumbers;
export const markdown = md;