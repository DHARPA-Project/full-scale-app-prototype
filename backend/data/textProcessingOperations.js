// operations that can be performed on text in the topic modelling module
export const topicModellingOperations = [
    {
        description: 'remove HTML tags',
        name: 'html',
        enabled: false,
        mandatory: false
    },
    {
        description: 'keep only letters and numbers',
        name: 'alphanumerical',
        enabled: false,
        mandatory: false
    },
    {
        description: 'keep only letters',
        name: 'alphabetical',
        enabled: false,
        mandatory: false
    },
    {
        description: 'remove numbers',
        name: 'numbers',
        enabled: false,
        mandatory: false
    },
    {
        description: 'remove punctuation marks',
        name: 'punctuation',
        enabled: false,
        mandatory: false
    },
    {
        description: 'remove special characters',
        name: 'special',
        enabled: false,
        mandatory: false
    },
    {
        description: 'remove words shorter than 3 characters',
        name: 'short',
        enabled: false,
        mandatory: false
    },
    {
        description: 'lower-case all characters',
        name: 'lowercase',
        enabled: false,
        mandatory: false
    }
    // {
    //     description: 'tokenize',
    //     name: 'tokenize',
    //     enabled: true,
    //     mandatory: true
    // },
    // {
    //     description: 'remove stop words',
    //     name: 'no-stop-words',
    //     enabled: false,
    //     mandatory: false
    // },
    // {
    //     description: 'stem',
    //     name: 'stem',
    //     enabled: false,
    //     mandatory: false
    // },
    // {
    //     description: 'lemmatize',
    //     name: 'lemmatize',
    //     enabled: false,
    //     mandatory: false
    // },
]
