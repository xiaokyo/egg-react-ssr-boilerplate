/**
 * @description 异步处理
 * @author zhengwenjian
 */

/**
 * Promise 异步错误处理
 * @param promise Promise对象
 */
const To = (promise: Promise<any>) => {
    return promise.then(res => [null, res]).catch(err => [err]);
};

export default To;
