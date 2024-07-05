"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { formRegisterValidation, FormRegisterValidationType } from "@/app/_validations/formRegisterValidantion";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import { Button } from "@/app/_components/ui/button";
import { useEffect } from "react";
import { cepApi } from "@/app/_lib/cepApi";
import SelectState from "./selectState";
const FormRegister = () => {
    const form = useForm<FormRegisterValidationType>({
        resolver: zodResolver(formRegisterValidation),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            zipCode: "",
            dateOfBirth: "",
        }
    })
    const {getValues,setValue} = form
    useEffect(() => {
        async function fetchData() {
            const data = await cepApi(getValues('zipCode'))
            setValue('state',data.state)
            setValue('address',data.street)
        }
        fetchData()
    }, [getValues('zipCode')])
    const handleSelect = (value: string) => {
        setValue('state',value)
    }
    const onSubmit = (data: FormRegisterValidationType) => {
        console.log(data);
    }
    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex items-center gap-4">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>FirstName</FormLabel>
                    <FormControl>
                    <Input placeholder="Ex:Joe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>LastName</FormLabel>
                    <FormControl>
                    <Input placeholder="Ex:Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                    <Input placeholder="Ex:street" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className='flex items-center gap-4'>
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <SelectState state={field.value} handleSelect={handleSelect}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>ZipCode</FormLabel>
                        <FormControl>
                        <Input placeholder="Ex:12345" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                    <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="Ex:" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        
          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}

export default FormRegister;