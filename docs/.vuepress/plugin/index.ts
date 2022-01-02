import MarkdownIt from 'markdown-it'

function jugeUrl(url: string | null) {
  const str = url || ''
  const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
  const objExp = new RegExp(Expression)
  if (objExp.test(str) == true) {
    return true
  } else {
    return false
  }
}

export const mdPlugin = (md: MarkdownIt) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const rawImageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    // get the image link
    const link = token.attrGet('src')
    const newlink = jugeUrl(link) ? link : './' + link?.replace(/^\.\//, '')

    if (newlink) {
      token.attrSet('src', newlink)
    }
    return rawImageRule(tokens, idx, options, env, self)
  }
}
