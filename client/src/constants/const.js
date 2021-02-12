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

export const availableModules = [
    {
        name: 'nullify',
        code: 'nullify',
        color: 'firebrick',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'square',
        code: 'square',
        color: 'cornflowerblue',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'double',
        code: 'double',
        color: 'goldenrod',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'halve',
        code: 'halve',
        color: 'maroon',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'increase by one',
        code: 'increase',
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'decrease by one',
        code: 'decrease',
        color: 'tomato',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    }
]
