import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { createTask, updateTask, deleteTask, getTask, getTasks } from '../controllers/task.controller.js'

const router = new Router()

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTask)
router.post('/tasks', createTask)
router.delete('/tasks/:id', deleteTask)
router.put('/tasks/:id', updateTask)