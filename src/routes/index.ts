import express from 'express'
const rootRouter = express.Router()

import product from './modules/product'
import user from './modules/user'

rootRouter.use('/products', product)
rootRouter.use('/users', user)

export default rootRouter
