
/**
    1. FE dispatches list of modules for the workflow to be executed
    2. BE checks workflow:
        - if invalid, BE sends error > FE displays error, etc
        - if valid:
            * BE instantiates workflow object and notifies FE that workflow execution started, attaching workflow ID
            * web socket connection established; FE listens for events about workflow execution; when execution completed, BE sends success notification with all output; WS connection closed when FE confirms receipt of output
*/


// array of all available modules:
const modules = [
    {
        name: 'Topic Modelling 02',
        code: 'TM002',
        id: '43bdcc6f-c6cf-4488-b778-8dd72995f910',
        category: 'TM',
        inputSchema: {},
        outputSchema: {},
        eligiblePrecursor: ['TM01'],
        eligibleSuccessors: ['TM03'],
        functionValidateInput: () => {},
        functionValidateOutput: () => {},
        input: {
            input01: '',
            input02: '',
            parameter01: '',
            parameter02: '',
            options: ['lemmatize', 'stem', 'stopWords']
        },
        notes: '',
        tags: [],
        labels: ['nlp', 'topic modelling'],
        output: ['wordcloud', 'txtFile'] // ['gcMap', 'csvFile']
    },
    {},
    {},
    {...}
]

// workflow
const workflow = {
    workflowID: 132498762398476,
    modules: [{}, {}, {}],
    output: {},
    timestamps
}