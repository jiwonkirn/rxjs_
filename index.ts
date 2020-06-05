import path from 'path'
import { readdir } from 'fs'
import { promisify } from 'util'

const readDir = promisify(readdir)

const getPath = (filePath: string = '') => path.resolve(__dirname, filePath)

const arg = process.argv[2]
const reg = /\d+\-\d+/

async function findPath(relativePath: string, regExp: RegExp, errorMessage: string) {
  const paths = await readDir(getPath(relativePath), 'utf-8')
  const path = paths.find(d => regExp.test(d))

  if (!path) {
    throw new Error(errorMessage)
  }

  return path
}

async function main() {
  if (!reg.test(arg)) {
    throw new Error(`Argument should be 'number-number' form like '1-2'.`)
  }

  const [dirNum, fileNum] = arg.split('-')
  const dirReg = new RegExp(`^${dirNum}\\..+`)
  const fileReg = new RegExp(`^${fileNum}\\..+`)

  const dir = await findPath('', dirReg, 'Directory is not exist.')
  const file = await findPath(dir, fileReg, 'File is not exist.')

  import(getPath(`${dir}/${file}`))
}

main().catch(({ message }) => {
  console.error(message)
  process.exit(1)
})
