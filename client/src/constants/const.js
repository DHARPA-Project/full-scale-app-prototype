// type of data files that can be uploaded
export const mimeTypes = {
    text: 'text/plain',
    csv: 'text/csv',
    img: ['image/jpeg', 'image/png']
}

export const fileTypeNames = ['text', 'csv', 'img']

export const topicModellingAnalysisOptions = [
    {
        title: 'Gensim',
        description: ''
    },
    {
        title: 'Bigrams',
        description: ''
    },
    {
        title: 'Mallet',
        description: ''
    },
    {
        title: 'TFIDF',
        description: ''
    }
]

export const textPreviewPlaceholder =
    'Here, you will be able to see the impact of the chosen processing operations on a text fragment extracted from the pool of text you select.'

export const ioTypes = {
    number: 'number',
    string: 'string'
}

export const moduleCategories = {
    number: 'number',
    string: 'string',
    conversion: 'conversion'
}

export const availableModules = [
    {
        name: 'square',
        code: 'square',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false
    },
    {
        name: 'double',
        code: 'double',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false
    },
    {
        name: 'halve',
        code: 'halve',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false
    },
    {
        name: 'increase by one',
        code: 'increase',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false
    },
    {
        name: 'decrease by one',
        code: 'decrease',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false
    },
    {
        name: 'uppercase',
        code: 'uppercase',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false
    },
    {
        name: 'lowercase',
        code: 'lowercase',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false
    },
    {
        name: 'remove digits',
        code: 'removeDigits',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false
    },
    {
        name: 'remove letters',
        code: 'removeLetters',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false
    },
    {
        name: 'concatenate with',
        code: 'concatenateWith',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: true,
        additionalInput: ''
    },
    {
        name: 'number to string',
        code: 'stringifyNumber',
        category: moduleCategories.conversion,
        background: 'linear-gradient(to right, teal 50%, cornflowerblue 0)',
        inputType: ioTypes.number,
        outputType: ioTypes.string,
        additionalInputRequired: false
    },
    {
        name: 'string to integer',
        code: 'stringToInteger',
        category: moduleCategories.conversion,
        background: 'linear-gradient(to right, cornflowerblue  50%, teal 0)',
        inputType: ioTypes.string,
        outputType: ioTypes.number,
        additionalInputRequired: false
    }
]

export const operationMap = {
    square: x => x * x,
    double: x => x * 2,
    halve: x => x / 2,
    increase: x => ++x,
    decrease: x => --x,
    uppercase: x => x.toUpperCase(),
    lowercase: x => x.toLowerCase(),
    removeDigits: x => x.replace(/\d/g, ''),
    removeLetters: x => x.replace(/[A-Za-z]/g, ''),
    concatenateWith: (x, y) => x + y,
    stringifyNumber: x => String(x),
    stringToInteger: x => {
        const int = parseInt(x)
        if (isNaN(int)) throw new Error('The input cannot be converted to a number!')
        return int
    }
}
