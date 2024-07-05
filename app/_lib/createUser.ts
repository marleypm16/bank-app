"use server";
import { SignUpParams } from "../_types/signUpParams";
import { db } from "./prisma";

export const createUser = async (data: SignUpParams) => {
    try{
        await db.user.create({
            data:{
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                address: data.address,
                zipCode: data.zipCode,
                state: data.state,
            }
        })
    }catch(e){
        console.log(e)
    }
    

}