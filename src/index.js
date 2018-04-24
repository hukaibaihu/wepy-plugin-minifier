const pd = require('pretty-data').pd

export default class {
  constructor(config = {}) {
    const defaults = {
      filter: /\.(wxml)$/
    }

    this.options = Object.assign(defaults, config)
  }

  apply(op = {}) {
    const {filter, config = {}} = this.options

    if (op.code !== null && filter.test(op.file)) {
      op.output && op.output({
        action: '压缩',
        file: op.file
      })

      const type = op.file.match(/\.(wxml|xml|html|htm|json|css|wxss|sql)$/i)[0]

      switch (type.toLowerCase()) {
        case 'xml':
        case 'htm':
        case 'wxml':
        case 'html':
          op.code = pd.xmlmin(op.code, config.preserveComments)
          break
        case 'json':
          op.code = pd.jsonmin(op.code)
          break
        case 'css':
        case 'wxss':
          op.code = pd.cssmin(op.code, config.preserveComments)
          break
        case 'sql':
          op.code = pd.sqlmin(op.code)
      }
    }

    op.next()
  }
}
