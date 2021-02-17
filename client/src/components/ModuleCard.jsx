import React, {useEffect, useState} from 'react'
import {AiOutlineSave} from 'react-icons/ai'

import {VscTriangleDown} from 'react-icons/vsc'
import CustomButton from './common/CustomButton'

import './ModuleCard.scss'
import ModuleDetailsModal from './ModuleDetailsModal'

const ModuleCard = ({classes, background, children}) => {
    const [outputVisible, setOutputVisible] = useState(false)
    const [outputModalVisible, setOutputModalVisible] = useState(false)
    const [moduleClasses, setModuleClasses] = useState('')

    useEffect(() => {
        setModuleClasses(getModuleCardClasses())
        //eslint-disable-next-line
    }, [outputVisible])

    const getModuleCardClasses = () => {
        let classList = 'module-card-wrapper'

        if (outputVisible) classList += ' output-visible'
        if (classes && classes.includes('extensible')) classList += ' extensible'

        return classList
    }

    const handleOutputSettingsSave = () => {
        console.log('saving module output settings')
        setOutputModalVisible(false)
    }

    return (
        <div className={moduleClasses}>
            <div
                className={`module-card${classes ? ` ${classes}` : ''}`}
                style={{background: background}}
            >
                <div className="module-card-input">
                    <VscTriangleDown />
                </div>
                <div className="module-card-status" />
                {children}
                <div
                    className="module-card-output"
                    onClick={() => setOutputVisible(prevOutputState => !prevOutputState)}
                >
                    <VscTriangleDown />
                </div>
            </div>

            <div className="module-card-mirror">
                <div
                    className="module-card-mirror-button"
                    onClick={() => setOutputModalVisible(true)}
                >
                    &#43;
                </div>
            </div>

            <ModuleDetailsModal
                isVisible={outputModalVisible}
                setIsVisible={setOutputModalVisible}
                showCross={false}
            >
                <div className="module-output-settings">
                    <CustomButton onClick={handleOutputSettingsSave}>
                        <AiOutlineSave />
                        &nbsp;&nbsp;Save
                    </CustomButton>
                </div>
            </ModuleDetailsModal>
        </div>
    )
}

export default ModuleCard
