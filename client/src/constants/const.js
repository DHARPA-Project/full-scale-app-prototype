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
    string: 'string'
}

export const availableModules = [
    {
        name: 'square',
        code: 'square',
        category: moduleCategories.number,
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'double',
        code: 'double',
        category: moduleCategories.number,
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'halve',
        code: 'halve',
        category: moduleCategories.number,
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'increase by one',
        code: 'increase',
        category: moduleCategories.number,
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'decrease by one',
        code: 'decrease',
        category: moduleCategories.number,
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'uppercase',
        code: 'uppercase',
        category: moduleCategories.string,
        color: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string
    },
    {
        name: 'lowercase',
        code: 'lowercase',
        category: moduleCategories.string,
        color: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string
    },
    {
        name: 'remove digits',
        code: 'nodigits',
        category: moduleCategories.string,
        color: 'cornflowerblue',
        inputType: ioTypes.string,
        outputType: ioTypes.string
    }
]
