import { program } from 'commander'
import shell from 'shelljs'

function push() {
  program.action(optionArgs => {
    const [message] = optionArgs.args
    if (message?.length > 0) {
      shell.exec(`git add .`)
      shell.exec(`git commit -m '${message}'`)
      shell.exec(`git push origin master`)
      return
    }

    return console.log("plz input: yarn push '{message}'")
  })

  program.parse(process.argv)
}

push()
