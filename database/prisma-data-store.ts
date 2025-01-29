import {PrismaClient} from '@prisma/client';
import Customer from "../model/Customer";
import Item from "../model/Item";
import bcrypt from 'bcrypt'
import {User} from "../model/User";

const prisma = new PrismaClient();

//Customer operations

export async function CustomerAdd(c: Customer){
    try{
        const newCustomer  = await prisma.customer.create({
            data:{
                customerId:Number(c.customerId),
                name: c.name,
                nic:c.nic,
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
            where: {customerId: Number(id)}
        });
        console.log('Customer deleted :',id);
    }catch(err){
        console.log("error deleting customer", err);
    }
}

export async function getAllCustomers(){
    try{
        const resp = await prisma.customer.findMany();
        console.log(resp)
        return resp
    }catch(err){
        console.log("error getting customers from prisma data",err);
    }
}

export async function CustomerUpdate(id: string, c: Customer){
    try{
        await prisma.customer.update({
            where:{customerId : Number(id)},
            data:{
                customerId:Number(c.customerId),
                name: c.name,
                nic :c.nic,
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
export async function ItemDelete(id:string){
    try{
        await prisma.item.delete({
            where:{itemId : id},
        });
        console.log('Customer deleted :',id);
    }catch(err){
        console.log("error deleting item", err);
    }
}
export async function ItemUpdate(id:string,i:Item){
    try{
        await prisma.item.update({
            where:{itemId : id},
            data:{
                itemId:id,
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
// For authentication
export async function verifyUserCredentials(verifyUser: User) {
    const user : User | null = await prisma.user.findUnique({
        where: { username: verifyUser.username },
    });
    if (!user) {
        return false;
    }

    return await bcrypt.compare(verifyUser.password, user.password);
}

export async function createUser(user : User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const addedUser = await prisma.user.create({
        data: {
            username : user.username,
            password : hashedPassword,
        },
    });
    console.log("User created:", addedUser);
}