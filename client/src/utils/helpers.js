import {v4 as uuidv4} from 'uuid'

import {fileTypes} from '../constants/const'

export const generateId = () => uuidv4()

export const isValidUploadedFile = file => file.type === fileTypes.text
