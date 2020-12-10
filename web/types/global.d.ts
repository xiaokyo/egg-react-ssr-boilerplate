interface Window {
  __USE_SSR__?: string;
  __LNG__?: string;
  __INITIAL_DATA__?: any;
  __LAYOUT_DATA__?: any;
  less: TModifyVars;
}

type TModifyVars = {
  modifyVars: (themes: { [n: string]: string }) => Promise<any>
}
interface NodeModule {
  hot?: Hot;
}
interface Hot {
  accept(path?: string): void;
}
declare const __isBrowser__: boolean;
declare const __ENV__: 'development' | 'test' | 'production';

interface SFC<P> extends React.FC<P> {
  getInitialProps?(object): Promise<any>;
}

enum COMPONENT_STATUS {
  NORMAL = 0b0,
  MINI = 0b01,
  NONINTERACTIVE = 0b010,
}

declare module 'less'
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
