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
