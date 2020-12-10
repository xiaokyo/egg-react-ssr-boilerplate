import localp from './dev'
import testp from './test'
import prodp from './prod'

export const proxys: any = {
    development: {
        keys: Object.keys(localp),
        proxy: localp
    },
    test: {
        keys: Object.keys(testp),
        proxy: testp
    },
    production: {
        keys: Object.keys(prodp),
        proxy: prodp
    }
}