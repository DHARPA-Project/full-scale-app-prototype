import React from 'react'

import {Header, Icon, Segment} from 'semantic-ui-react'

const FileListPlaceholder = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="pdf file outline" />
                No documents have been uploaded.
            </Header>
        </Segment>
    )
}

export default FileListPlaceholder
