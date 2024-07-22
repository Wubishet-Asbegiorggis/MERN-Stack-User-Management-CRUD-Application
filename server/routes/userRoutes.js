import express from 'express';
import { create, deleteUser, getAllUsers, getUserById, updateUser } from '../controller/userController.js';

const router = express.Router();

// Use plural for the creation endpoint to match the other routes
router.post('/user', create);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/update/user/:id', updateUser);
router.delete('/delete/user/:id', deleteUser);


export default router;


