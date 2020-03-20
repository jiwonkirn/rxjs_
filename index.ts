import path from 'path'
import { readdir } from 'fs'
import { promisify } from 'util'

const readDir = promisify(readdir)

const getPath = (filePath: string = '') => path.resolve(__dirname, filePath)

const arg = process.argv[2]
const reg = /\d+\-\d+/

function handleError(message: string) {
  console.log(message)
  process.exit(1)
}

async function main() {
  if (!reg.test(arg)) {
    return handleError(`Argument should be 'number-number' form like '1-2'.`)
  }

  const [dirNum, fileNum] = arg.split('-')
  const dirReg = new RegExp(`^${dirNum}\\..+`)
  const fileReg = new RegExp(`^${fileNum}\\..+`)

  const dirs = await readDir(getPath(), 'utf-8')
  const dir = dirs.find((d) => dirReg.test(d))

  if (!dir) {
    return handleError(`Directory is not exist.`)
  }

  const files = await readDir(getPath(dir), 'utf-8')
  const file = files.find((d) => fileReg.test(d))
  
  if (!file) {
    return handleError(`File is not exist.`)
  }

  import(getPath(`${dir}/${file}`))
}

main().catch(({message}) => handleError(message))
