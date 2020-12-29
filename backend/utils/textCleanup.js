const regexFragments = {
    html: '<[^>]+>',
    numbers: `0-9`,
    punctuation: `\.!\?,;:\-'"()`,
    special: `\/#$%\^&\*{}=_\`~@\+><\[\]`,
    twoLetterWords: `[a-zA-Z]{2}`,
    threeLetterWords: `[a-zA-Z]{3}`
}

// \w is any digit, letter, or underscore.
// \s is any whitespace.
// [^\w\s] is anything that's not a digit, letter, whitespace, or underscore.
// [^\w\s]|_ removes the underscores from the above RegEx
const extractOnlyAlphabetical = text => text.replace(/[^\w\s]|_/g, '')

// replace all newline characters with a space...
// ...and reduce multiple whitespace characters to a single blank space
export const trimWhitespaces = text => text.replace(/\s+/g, ' ')

export const removeHtml = text => text.replace(new RegExp(regexFragments.html, 'g'), '')

export const removeNumbers = text => text.replace(/[0-9]/g, '')

export const removePunctuation = text =>
    text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')

export const removeSpecialChars = text => text.replace(/[0-9]/g, '')

export const removeShortWords = text => text.replace(/[0-9]/g, '')
