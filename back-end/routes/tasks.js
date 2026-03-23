import { Router } from "express";
import {createtasks, deletetask, gettasks,updatetask,searchTasks} from '../controllers/taskscontroller.js'
const router=Router();
router.get('/:userid',gettasks);
router.post('/',createtasks);
router.delete('/:userid/:taskid',deletetask);
router.patch('/:userid/:taskid',updatetask);
router.get("/search", searchTasks);
export default router;