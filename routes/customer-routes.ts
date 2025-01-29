import express from 'express'
import Customer from "../model/Customer";
import {CustomerAdd, CustomerDelete, CustomerUpdate, getAllCustomers} from "../database/prisma-data-store";

const router  = express.Router()

router.post('/add', async (req, res)=> {
    const customer:Customer = req.body;
    try{
        const addedCustomer = await CustomerAdd(customer);
        // res.send(req.body)
    }catch (err){
        console.log(err)
    }
})
router.put('/update/:id', async (req, res)=> {
    const id = req.params.id;
    const update = req.body;
    try{
        const updatedCustomer = await CustomerUpdate(id, update);
        res.send("Customer updated with Id " + id)
    }catch (err){
        console.log(err)
    }
})
router.delete('/delete/:id', async (req, res)=> {
    const id = req.params.id;
    try{
        await CustomerDelete(id)
        res.send("Customer Deleted with id "+id)
    }catch (err){
        console.log(err)
    }
})
router.get('/getAll', async (req, res)=> {
    try{
        const customers = await getAllCustomers();
        res.send(customers)

    }catch (err){
        console.log(err)
    }
})
export default router ;