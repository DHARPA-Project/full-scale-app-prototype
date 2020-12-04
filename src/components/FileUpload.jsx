import React, {useRef, useState} from 'react'

import {Button, Divider, Grid, Header, Icon, Label, Segment} from 'semantic-ui-react'

import HelpIcon from './common/HelpIcon'

const FileUpload = () => {
    const fileInputRef = useRef(null)

    const [dropAreaHovered, setDropAreaHovered] = useState(false)

    const handleFileSelect = () => {}

    const handleHover = event => {
        event.preventDefault()
        if (event.type === 'dragover') setDropAreaHovered(true)
        if (event.type === 'dragleave') setDropAreaHovered(false)
        if (event.type === 'mouseleave') setDropAreaHovered(false)
    }

    return (
        <React.Fragment>
            <Header size="huge" attached="top" textAlign="center" style={{position: 'relative'}}>
                <span>Upload your text files for topic modelling</span>
                <Label color="grey" floating>
                    ?
                </Label>
                <HelpIcon size={'small'} />
            </Header>
            <Segment placeholder attached>
                <form action="#" method="get" className="file-upload" id="upload">
                    <input
                        ref={fileInputRef}
                        className="file-upload-input"
                        type="file"
                        onChange={handleFileSelect}
                        style={{display: 'none'}}
                    />

                    <Grid columns={2} stackable textAlign="center">
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign="middle">
                            <Grid.Column>
                                <Header icon color="grey">
                                    <Icon name="folder open" />
                                    Find files by browsing
                                </Header>
                                <Button>Browse</Button>
                            </Grid.Column>

                            <Grid.Column>
                                <div
                                    className={`file-upload-drop-area${
                                        dropAreaHovered ? ' hovered' : ''
                                    }`}
                                    onDrop={handleFileSelect}
                                    onDragOver={handleHover}
                                    onDragLeave={handleHover}
                                >
                                    <Header icon color="grey">
                                        <Icon name="grab" />
                                        Drag and drop files here
                                    </Header>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </form>
            </Segment>
        </React.Fragment>
    )
}

export default FileUpload
