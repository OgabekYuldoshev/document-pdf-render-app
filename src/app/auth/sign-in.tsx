'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from "zod"

const loginSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6)
})

type FormValue = z.infer<typeof loginSchema>
export default function SignIn() {
    const form = useForm<FormValue>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: zodResolver(loginSchema)
    })
    function onSubmit(values: FormValue) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className='grid grid-cols-1 gap-2 w-full'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
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
                                    <Input type='password' placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex justify-end mt-3'>
                    <Button disabled={form.formState.isSubmitting} type="submit">
                        {
                            form.formState.isSubmitting && (
                                <Loader2 className='animate-spin' />
                            )
                        }
                        Login
                    </Button>
                </div>
            </form>
        </Form>
    )
}
