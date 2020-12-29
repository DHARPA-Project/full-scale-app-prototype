const allowedOperations = {
    html: 'html',
    alphanumerical: 'alphanumerical',
    alphabetical: 'alphabetical',
    numbers: 'numbers',
    punctuation: 'punctuation',
    special: 'special',
    short: 'short',
    lowercase: 'lowercase'
}

const regexFragments = {
    html: '<[^>]+>',
    numbers: `[0-9]`,
    // \w is any digit, letter, or underscore.
    // \s is any whitespace.
    // [^\w\s] is anything that's not a digit, letter, whitespace, or underscore.
    // [^\w\s]|_ removes the underscores from the above RegEx
    // backslashes must be escaped to prevent them from being eliminated when strings are parsed
    alphanumerical: '[^\\w\\s]|_',
    alphabetical: '[^a-zA-Z\\s]',
    punctuation: `[()'"’“”\\.!\\?,;:\\-]`,
    special: '[\\/#$%\\^&\\*{}=_\\`~@\\+><\\[\\]]',
    twoLetterWords: `\\b[a-zA-Z]{2}\\b`,
    threeLetterWords: `\\b[a-zA-Z]{3}\\b`
}

const getOnlyAlphanumerical = text =>
    text.replace(new RegExp(regexFragments.alphanumerical, 'g'), '')

const getOnlyAlphabetical = text => text.replace(new RegExp(regexFragments.alphabetical, 'g'), '')

const removeHtml = text => text.replace(new RegExp(regexFragments.html, 'g'), '')

const removeNumbers = text => text.replace(new RegExp(regexFragments.numbers, 'g'), '')

const removePunctuation = text => text.replace(new RegExp(regexFragments.punctuation, 'g'), '')

const removeSpecialChars = text => text.replace(new RegExp(regexFragments.special, 'g'), '')

const removeShortWords = text => text.replace(new RegExp(regexFragments.twoLetterWords, 'g'), '')

// text processing operations must be performed in a certain logical order
// give the order of operations careful consideration before changing it!
export const processText = (text, operations) => {
    const {
        html,
        alphabetical,
        alphanumerical,
        numbers,
        punctuation,
        special,
        short,
        lowercase
    } = allowedOperations
    let remainingOperations = [...operations]
    let output = text

    // TO DO: clean up HTML entities / handle text encoding
    // html tags must be removed before any other operation is performed
    if (remainingOperations.includes(html)) {
        output = removeHtml(output)
        remainingOperations = remainingOperations.filter(operation => operation !== 'html')
    }

    // if the user wants to keep only alphanumerical chars, then numbers and all special...
    // ... characters are elemminated by default
    if (remainingOperations.includes(alphanumerical)) {
        output = getOnlyAlphanumerical(output)
        remainingOperations = remainingOperations.filter(
            operation =>
                ![alphabetical, alphanumerical, numbers, punctuation, special].includes(operation)
        )
    }

    // if the user wants to keep only alphabetical chars, then numbers and all special...
    // ... characters are elemminated by default
    if (remainingOperations.includes(alphabetical)) {
        output = getOnlyAlphabetical(output)
        remainingOperations = remainingOperations.filter(
            operation =>
                ![alphabetical, alphanumerical, numbers, punctuation, special].includes(operation)
        )
    }

    // if the user did not choose to keep only alphabetical or alphanumerical characters...
    // ... but chose to eliminate a specific range of characters:
    const tier2 = remainingOperations.filter(operation =>
        [numbers, punctuation, special].includes(operation)
    )
    if (tier2.length) {
        const regex = new RegExp(
            tier2.map(operationType => regexFragments[operationType]).join('|'),
            'g'
        )
        output = output.replace(regex, '')
        remainingOperations = remainingOperations.filter(
            operation => ![numbers, punctuation, special].includes(operation)
        )
    }

    // short words should be dealt with only after eliminating all special character groups
    if (remainingOperations.includes(short)) {
        output = removeShortWords(output)
        remainingOperations = remainingOperations.filter(operation => operation !== short)
    }

    // replace all newline characters with a space...
    // ...and reduce multiple whitespace characters to a single blank space
    output = output.replace(/\s+/g, ' ')

    // lowercasing must be done only after all the char removal operations have been performed
    if (remainingOperations.includes(lowercase)) {
        output = output.toLowerCase()
    }

    return output
}
