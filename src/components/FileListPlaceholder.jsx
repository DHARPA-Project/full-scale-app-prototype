import React from 'react'

import {Button, Header, Icon, Segment} from 'semantic-ui-react'

const FileListPlaceholder = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="pdf file outline" />
                No documents have been uploaded.
            </Header>
            <Button primary>Add Document</Button>
        </Segment>
    )
}

export default FileListPlaceholder
