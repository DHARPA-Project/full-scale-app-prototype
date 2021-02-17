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
        name: 'increase by one',
        code: 'increase',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'decrease by one',
        code: 'decrease',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'double',
        code: 'double',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'halve',
        code: 'halve',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'square',
        code: 'square',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'to power of ...',
        code: 'power',
        category: moduleCategories.number,
        background: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number,
        additionalInputRequired: true,
        additionalInput: '',
        expectedOutput: []
    },
    {
        name: 'uppercase',
        code: 'uppercase',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'lowercase',
        code: 'lowercase',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'remove digits',
        code: 'removeDigits',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'remove letters',
        code: 'removeLetters',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'concatenate with ...',
        code: 'concatenateWith',
        category: moduleCategories.string,
        background: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string,
        additionalInputRequired: true,
        additionalInput: '',
        expectedOutput: []
    },
    {
        name: 'number to string',
        code: 'stringifyNumber',
        category: moduleCategories.conversion,
        background: 'linear-gradient(to right, teal 50%, cornflowerblue 0)',
        inputType: ioTypes.number,
        outputType: ioTypes.string,
        additionalInputRequired: false,
        expectedOutput: []
    },
    {
        name: 'string to integer',
        code: 'stringToInteger',
        category: moduleCategories.conversion,
        background: 'linear-gradient(to right, cornflowerblue  50%, teal 0)',
        inputType: ioTypes.string,
        outputType: ioTypes.number,
        additionalInputRequired: false,
        expectedOutput: []
    }
]

export const operationMap = {
    square: x => x * x,
    power: (x, y) => {
        const int = parseInt(y)
        if (isNaN(int)) throw new Error('The provided power input is not a valid number!')
        return Math.pow(x, int)
    },
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
