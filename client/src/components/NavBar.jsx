import React from 'react'
import {Link} from 'react-router-dom'

import {GoCloudUpload} from 'react-icons/go'
import {AiFillFolderOpen} from 'react-icons/ai'
import {AiOutlineDatabase} from 'react-icons/ai'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import {FcWorkflow} from 'react-icons/fc'

import './NavBar.scss'

const NavBar = () => {
    return (
        <nav className="nav nav-bar">
            <div className="nav-headline">
                <div className="nav-logo">DHARPA</div>
                <AiOutlineDoubleRight className="nav-icon" />
            </div>
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/upload" className="nav-link">
                        <GoCloudUpload className="nav-icon" />{' '}
                        <span className="nav-item-text">File Upload</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/files" className="nav-link">
                        <AiFillFolderOpen className="nav-icon" />{' '}
                        <span className="nav-item-text">File Management</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/processing" className="nav-link">
                        <AiOutlineDatabase className="nav-icon" />{' '}
                        <span className="nav-item-text">Data Processing</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/composition" className="nav-link">
                        <FcWorkflow className="nav-icon" />{' '}
                        <span className="nav-item-text">Workflow Builder</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
