# next-mdx

This plugin includes the
[official Next.js mdx plugin](https://github.com/vercel/next.js/tree/canary/packages/next-env)
with added YAML frontmatter support and typescript declarations for importing
`.mdx` files with webpack.

## YAML Frontmatter

The mdx webpack loader supports exporting metadata as a named export from an
`.mdx` file: `export const metadata { title: 'Home Page' }`. One common
convention in plain markdown files has been to export metadata in a YAML section
at the top of an `.md` file. This plugin adds that (following the
[official example](https://mdxjs.com/guides/custom-loader#custom-loader)).

## How to use

```js
// next.config.js
const withMdx = require('@stefanprobst/next-mdx')()

const nextConfig = {
  /** ... */
}

module.exports = withMdx(nextConfig)
```

## Configuration

- `extension`: regex of file extensions to handle, defaults to `/\.(md|mdx)$`
- `options`: options for `@mdx-js/loader`

## Add Typescript

To add support for importing `.mdx` files in Next.js, add the following to
`next-env.d.ts` in your project:

```ts
/// <reference types="@stefanprobst/next-mdx" />
```

This will add support for the mdx content as the default export, and a
`metadata` named export for metadata.
