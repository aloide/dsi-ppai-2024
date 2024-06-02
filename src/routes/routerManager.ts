import { Router } from "express";

const router: Router = Router()

import home from './homeRoutes'
router.use("/", home)

import vinos from './vinosRoutes'
router.use(vinos)

import version from './versionRoutes'
router.use(version)

export default router