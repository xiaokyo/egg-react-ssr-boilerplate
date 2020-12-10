interface Window {
    __USE_SSR__?: string
    __LNG__?: string
}
interface NodeModule {
    hot?: Hot
}
interface Hot {
    accept(path?: string): void
}
declare const __isBrowser__: boolean
declare const __ENV__: 'development' | 'test' | 'production'

interface SFC<P> extends React.SFC<P> {
    getInitialProps?(object): Promise<any>,
}
