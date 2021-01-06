import {fileTypes} from '../constants/const'

export const generateId = () =>
    Date.now() + Number.parseInt(Math.random() + Math.random() * 10 ** 10).toString()

export const isValidUploadedFile = file => file.fileObj.type === fileTypes.text
