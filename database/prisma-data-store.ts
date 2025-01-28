import {PrismaClient} from '@prisma/client';
import Customer from "../model/Customer";
import Item from "../model/Item";

const prisma = new PrismaClient();

//Customer operations

export async function CustomerAdd(c: Customer){
    try{
        const newCustomer  = await prisma.customer.create({
            data:{
                id:c.id,
                name: c.name,
                email: c.email,
                phone: c.phone,
            }
        })
        console.log('Customer Added :',newCustomer)
    }catch(err) {
        console.log("error adding customer", err);
    }
}

export async function CustomerDelete(id:string) {
    try{
        await prisma.customer.delete({
            where: {id: id}
        });
        console.log('Customer deleted :',id);
    }catch(err){
        console.log("error deleting customer", err);
    }
}

export async function getAllCustomers(){
    try{
        return await prisma.customer.findMany();
    }catch(err){
        console.log("error getting customers from prisma data",err);
    }
}

export async function CustomerUpdate(id: String, c: Customer){
    try{
        await prisma.customer.update({
            where:{id : id},
            data:{
                id:c.id,
                name: c.name,
                email: c.email,
                phone:c.phone
            }
        })
    }catch(err){
        console.log("error updating customer", err);
    }
}
//Item operations

export async function ItemAdd(i:Item){
    try{
        await prisma.item.create({
            data:{
                itemId:i.itemId,
                name:i.name,
                quantity:i.quantity,
                price:i.price,

            }
        })
    }catch(err){
        console.log("error adding item", err);
    }
}
export async function ItemDelete(id:String){
    try{
        await prisma.item.delete({
            where:{id : id},
        });
        console.log('Customer deleted :',id);
    }catch(err){
        console.log("error deleting item", err);
    }
}
export async function ItemUpdate(id:String,i:Item){
    try{
        await prisma.item.update({
            where:{id : id},
            data:{
                id:id,
                name:i.name,
                quantity:i.quantity,
                price:i.price,
            }
        })
    }catch(err){
        console.log("error updating item", err);
    }
}
export async function getAllItems(){
    try{
        await prisma.item.findMany()
    }catch(err){
        console.log("error loading items",err);
    }
}