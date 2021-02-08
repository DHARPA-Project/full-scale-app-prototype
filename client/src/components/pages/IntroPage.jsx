import React from 'react'

import PageWrapper from '../common/PageWrapper'
import WorkflowCard from '../WorkflowCard'

import TopicModellingIcon from '../../assets/nlp.svg'
import NetworkAnalysisIcon from '../../assets/network.svg'
import GeolocationIcon from '../../assets/geolocation.svg'

import './IntroPage.scss'

const workflows = [
    {
        name: 'Topic Modelling',
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur beatae
                        possimus porro quas esse numquam architecto vel. Quos, vel incidunt.`,
        icon: TopicModellingIcon
    },
    {
        name: 'Geolocation',
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur beatae
                        possimus porro quas esse numquam architecto vel. Quos, vel incidunt.`,
        icon: GeolocationIcon
    },
    {
        name: 'Network Analysis',
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur beatae
                        possimus porro quas esse numquam architecto vel. Quos, vel incidunt.`,
        icon: NetworkAnalysisIcon
    }
]

const IntroPage = () => {
    return (
        <PageWrapper>
            {workflows.map((workflow, index) => (
                <WorkflowCard {...workflow} key={index} />
            ))}
        </PageWrapper>
    )
}

export default IntroPage
