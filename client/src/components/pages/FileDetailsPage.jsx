import React from 'react'
import PageWrapper from '../common/PageWrapper'
import {useRouteMatch} from 'react-router-dom'

import './FileDetailsPage.scss'

const FileDetailsPage = () => {
    const match = useRouteMatch()
    const {id} = match.params

    return (
        <PageWrapper>
            <div className="file-details-page">
                <h1 className="file-details-heading">File batch {id}</h1>
                <p>details here</p>
            </div>
        </PageWrapper>
    )
}

export default FileDetailsPage
