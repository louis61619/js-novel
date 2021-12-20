import MarkdownIt from 'markdown-it'

export const mdPlugin = (md: MarkdownIt) => {
  const rawImageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    // // get the image link
    const link = token.attrGet('src')
    const newlink = './' + link?.replace(/^\.\//, '')

    if (newlink) {
      // replace the original link with resolved link
      token.attrSet('src', newlink)
    }
    return rawImageRule(tokens, idx, options, env, self)
  }
}
