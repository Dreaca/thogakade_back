import express from "express";
import {getAllItems, ItemAdd, ItemDelete, ItemUpdate} from "../database/prisma-data-store";
import Item from "../model/Item";
const router = express.Router();

router.get("/getAll",async (req,res)=>{
    try {
        const items = await getAllItems();
        res.send(items);
    }
    catch(err){
        console.log("Items could not be loaded "+err)
    }
})
router.post("/add",async (req,res)=>{
    const add : Item  = req.body
    try{
        await ItemAdd(add);
        res.send(req.body)
    }catch (err){
        console.log(err)
    }
})
router.put("/update/:id",async (req,res)=>{
    const id = req.params.id
    const update:Item = req.body
    try {
        await ItemUpdate(id,update)
        res.send("Item updated with Id " + id)
    }catch (err){
        console.log(err)
    }
})
router.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    try{
        await ItemDelete(id)
        res.send("Item deleted with Id " + id)
    }catch (err){
        console.log(err)
    }
})
export default router;