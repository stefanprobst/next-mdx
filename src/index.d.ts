declare module '*.md' {
  import type { FC } from 'react'

  const metadata: { [key: string]: unknown }
  const MdxComponent: FC

  export { metadata }
  export default MdxComponent
}

declare module '*.mdx' {
  import type { FC } from 'react'

  const metadata: { [key: string]: unknown }
  const MdxComponent: FC

  export { metadata }
  export default MdxComponent
}
