import express from 'express'
const rootRouter = express.Router()

import product from './modules/product'

rootRouter.use('/products', product)

export default rootRouter
