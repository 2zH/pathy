const fs = require('fs-extra')
const path = require('path')

class Pathy {
  constructor(storePath) {
    this.storePath = storePath
  }

  and(...combiners) {
    this.chain = combiners
      .map(combiner => {
        const combineInfo = [{
          operationPath: path.join(this.storePath, combiner.storePath),
          action: combiner.action
        }]
        if (combiner.chain) {
          return combineInfo.concat(combiner.chain.map(
            ({ operationPath, action }) => ({
              operationPath: path.join(this.storePath, operationPath),
              action
            })
          ))
        }
        return combineInfo
      })
      .reduce((a, b) => a.concat(b))
    return this
  }

  do() {
    if (this.action) {
      this.action(this.storePath)
    }
    if (this.chain) {
      this.chain.map(
        ({ operationPath, action }) => action(operationPath)
      )
    }
  }

  if(bool) {
    if (!bool) {
      this.action = () => { /* clear action */ }
      this.chain = []
    }
    return this
  }
}

class Mkdir extends Pathy {
  constructor(storePath) {
    super(storePath)
    this.action = dirPath => {
      // logger.log(`mkdir ${dirPath}`)
      fs.mkdirSync(`${dirPath}`)
    }
  }
}

class Echo extends Pathy {
  constructor(msg, storePath) {
    super(storePath)
    this.action = filePath => {
      // logger.log(`echo ${msg} > ${filePath}`)
      fs.writeFileSync(`${filePath}`, msg)
    }
  }
}

const createCombiner = action => {
  const Combiner = class extends Pathy {
    constructor(storePath, ...args) {
      super(storePath)
      this.action = filePath => {
        action(filePath, ...args)
      }
    }
  }
  return (...args) => new Combiner(...args)
}

exports.from = resolvePath => new Pathy(resolvePath)
exports.mkdir = resolvePath => new Mkdir(resolvePath)
exports.echo = (msg, resolvePath) => new Echo(msg, resolvePath)
exports.createCombiner = createCombiner
module.exports = Pathy
