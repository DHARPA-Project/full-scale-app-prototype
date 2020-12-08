import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'

import {Icon, Step} from 'semantic-ui-react'

import {topicModellingSteps} from '../constants/routes'

import './TopicModellingSteps.scss'

const Steps = () => {
    const history = useHistory()
    const location = useLocation()

    const activeStepHref = location.pathname
    const activeStepIndex = topicModellingSteps.reduce(
        (result, step, index) => (step.href === activeStepHref ? index : result),
        -1
    )

    return (
        <Step.Group widths={4} size="mini">
            {topicModellingSteps.map((step, index) => (
                <Step
                    link
                    active={activeStepHref === step.href}
                    disabled={index > activeStepIndex ? true : false}
                    key={index}
                    onClick={event => {
                        event.preventDefault()
                        history.push(step.href)
                    }}
                >
                    <Icon name={step.icon} />
                    <Step.Content>
                        <Step.Title>{step.title}</Step.Title>
                        <Step.Description>{step.description}</Step.Description>
                    </Step.Content>
                </Step>
            ))}
        </Step.Group>
    )
}

export default Steps
