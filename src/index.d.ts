declare module '*.md' {
  import type { FC } from 'react'
  const metadata: { [key: string]: unknown }
  const MDXComponent: FC
  export { metadata }
  export default MDXComponent
}

declare module '*.mdx' {
  import type { FC } from 'react'
  const metadata: { [key: string]: unknown }
  const MDXComponent: FC
  export { metadata }
  export default MDXComponent
}
