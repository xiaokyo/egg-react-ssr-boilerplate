const fs = require('fs')
const path = require('path')
const less = require('less')
const cssnano = require('cssnano')
const { generateTheme } = require('antd-theme-generator');

const cwd = process.cwd()
const themeConfigPath = path.resolve(cwd, 'config/config.theme')
const env = process.env.NODE_ENV
const isDev = !env || env === "development"

// 获取color.less生成需要的变量option
const getOptions = (themeVariables) => {
  const options = {
    antDir: path.join(cwd, './node_modules/antd'),
    stylesDir: [], // all files with .less extension will be processed
    // varFile: path.join(cwd, './web/themes/variables.less'), // default path is Ant Design default.less file
    themeVariables,
    // outputFilePath: path.join(cwd, './src/app/public/themes/color.less') // if provided, file will be created with generated less/styles
    // customColorRegexArray: [/^fade\(.*\)$/], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
  }
  return options
}

const antdTheme = fs.readFileSync('./node_modules/antd/dist/antd.less', 'utf-8')

const renderLess = (content, modifyVars, name) => {
  less.render(content, {
    paths: ['.', './node_modules/antd/dist'], // import 的目录
    modifyVars,
    javascriptEnabled: true
  })
    // 如果需要压缩，再打开压缩功能默认打开
    .then(out => {
      cssnano.process(out.css, { from: undefined }, {
        preset: 'default',
      }).then(result => {
        // console.log(result.css);
        fs.writeFileSync(path.join(cwd, `/src/app/public/themes/${name}.css`), result.css, {
          encoding: 'utf-8'
        })
        console.log('[theme generated successfully]:' + `/src/app/public/themes/${name}.css`)
      });
    })
    .catch(e => {
      console.log('less render error', e);
    })
}

/** 渲染antd样式表 */
renderLess(antdTheme, {}, "antd")

/**
 * 防抖函数
 * @param func 防抖的function
 * @param delay 防抖延迟
 */
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const startCompilation = (themeConfig) => {
  /** 生成antd需要的less变量样式表 */
  generateTheme(getOptions(Object.keys(themeConfig[0].modifyVars))).then(colorLess => {
    // const colorLess = fs.readFileSync(path.join(cwd, `/src/app/public/themes/color.less`), 'utf-8')
    themeConfig.forEach(({ modifyVars, name, root }) => {
      const rootWrap = `
        :root ${JSON.stringify(root).replace(/"/g, "").replace(/,/g, ';').replace('}', ";}")}
      `
      renderLess(colorLess + rootWrap, modifyVars, name)
    })
  })
    .catch(error => {
      console.log('generrated color.less error:', error);
    })
}

const run = debounce(startCompilation, 1000)
run(require(themeConfigPath))

if (!isDev) return process.exit(0)
fs.watchFile(path.resolve(cwd, "config/config.theme.js"), { interval: 2000 }, (cur, pre) => {
  if (cur.mtime != pre.mtime) {
    console.log('[watch config.theme.js changed]')
    delete require.cache[require.resolve(themeConfigPath)]
    run(require(themeConfigPath))
  }
})
