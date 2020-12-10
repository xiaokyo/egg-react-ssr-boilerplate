import { controller, provide, inject, Context, get } from 'midway';
import { Config } from 'ykfe-utils';
import renderToStream from 'ykfe-utils/lib/renderToStream';
import { IApiService } from '../../interface';

const ssrConfig: Config = require('../../../config/config.ssr');

@provide()
@controller('/')
export class Page {
  @inject()
  ctx: Context;

  @inject('ApiService')
  service: IApiService;

  async index() {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html'
      this.ctx.status = 200
      this.ctx.apiService = this.service.index // 将service挂载到上下文对象
      const config = Object.assign(this.ctx.app.config, ssrConfig)
      // console.log("config", this.ctx.app.config.apiHost,this.ctx.app.config.env)
      const stream = await renderToStream(this.ctx, config)
      this.ctx.body = stream
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error`, error);
    }
  }

  @get('/ischeck')
  async ischeck() {
    this.ctx.body = "okk"
  }
}
