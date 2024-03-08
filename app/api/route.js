import { NextResponse } from "next/server"
import mongoose from "mongoose"
import ConnectDB from "../database/connection"
import itemSchema from "../database/schema"

const GET = async () => {
    try {
        await ConnectDB();
        const items = await itemSchema.find();
        return NextResponse.json({ msg: 'fetched', items })
    } catch (error) {
        console.log(error);
        return NextResponse.json('msg:failed to fetch data')
    }
}
const POST = async (req) => {
    try {
        const { name, price } = await req.json()
        console.log(name, price);
        await ConnectDB()
        await itemSchema.create({ name, price })
        return NextResponse.json({ msg: 'item added successfully' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'item not added, error occured' })
    }
}


const PUT = async (req) => {
    try {
        await ConnectDB()
        const {name,price}=await req.json();
        const id=req.nextUrl.searchParams.get('id');
        console.log('id',id);
        console.log({name,price});
        const updatedItem = await itemSchema.findByIdAndUpdate(id, { name, price }, { new: true });
        console.log(updatedItem);
        return NextResponse.json({msg:'updated'})
    } catch (error) {
        return NextResponse.json({msg:'error occured'})
    }
}
const DELETE = async (req) => {
    try {
        await ConnectDB()
        const id=req.nextUrl.searchParams.get('id');
        console.log(id);
        const deletedItem=await itemSchema.findByIdAndDelete(id);
        console.log(deletedItem);
        return NextResponse.json({ msg: 'deleted' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "error occured" })
    }
}
export { GET, POST, PUT, DELETE }