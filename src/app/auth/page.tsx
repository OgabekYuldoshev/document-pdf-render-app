import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { $test } from './actions'
import SignIn from './sign-in'

export default async function Page() {
    const value = await $test({
        name: ""
    })
    if (value.success) {
        console.log(value.data)
    }

    return (
        <main className='flex w-full min-h-screen flex-col justify-center items-center'>
            <Card className='max-w-[380px] w-full'>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignIn />
                </CardContent>
            </Card>
        </main>
    )
}
