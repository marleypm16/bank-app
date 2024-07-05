"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { formRegisterValidation, FormRegisterValidationType } from "@/app/_validations/formRegisterValidantion";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import { Button } from "@/app/_components/ui/button";
import { useEffect, useState } from "react";
import { cepApi } from "@/app/_lib/cepApi";
import SelectState from "./selectState";
import { createUser } from "@/app/_lib/createUser";
import { SignUpParams } from "@/app/_types/signUpParams";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import { Calendar } from "@/app/_components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { redirect } from "next/navigation";
const FormRegister = () => {
    const [loading, setLoading] = useState(false)
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
    const onSubmit = async (data: SignUpParams) => {
        console.log(data)
        setLoading(true)
        await createUser(data)
        setLoading(false)
        form.reset()
        redirect("/login")
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
                <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
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
        
          
          <Button type="submit">{
                loading ? (
                    <p>Loading <Loader2 className="spin"/></p>
                ) : "Submit"
            }</Button>
        </form>
      </Form>
    )
}

export default FormRegister;