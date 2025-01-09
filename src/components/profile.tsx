'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { $revokeSession } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from 'react'
import { toast } from "sonner";
import { Avatar, AvatarFallback } from './ui/avatar'

interface ProfileProps {
    name: string,
    username: string
}
export default function Profile({ username, name }: ProfileProps) {
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        async mutationFn() {
            const result = await $revokeSession()
            if (!result.success) {
                throw result.error
            }

            return result.data
        },
        onError(error: string) {
            toast.error(error)
        },
        onSuccess() {
            router.refresh()
            toast.success("Logged out successfully!")
        }
    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex'>
                    <Avatar className='size-9'>
                        <AvatarFallback>
                            {name.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className='grid ml-2'>
                        <h2 className='text-sm'>{name}</h2>
                        <p className='text-xs text-foreground/80'>{username}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => mutate()}>
                    {
                        isPending && <Loader2 className="animate-spin" />
                    }
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
