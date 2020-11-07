declare module '*.mdx' {
  const meta: { [key: string]: unknown }
  const MDXComponent: (props: any) => JSX.Element
  export { meta }
  export default MDXComponent
}
