import express from 'express'
const router = express.Router()

import { index, show, create, product_by_category } from '../../api/ProductControllers'

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.get('/category/:category', product_by_category)

export default router
