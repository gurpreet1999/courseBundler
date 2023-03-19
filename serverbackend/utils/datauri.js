import DataUriParser from "datauri/parser.js"
import path, { extname } from "path"

const getDataUri=(file)=>{



    const parser= new DataUriParser();
const extName=path.extname(file.originalname).toString()
console.log(extname
    )
    return  parser.format(extName,file.buffer)



}
export default getDataUri
