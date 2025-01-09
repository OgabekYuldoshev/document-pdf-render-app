import { Button } from '@/components/ui/button'
import React from 'react'
import CreateTemplateDialog from './create-template-dialog'

export default function Page() {
    return (
        <div className='w-full p-6 h-full'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Templates</h1>
                <CreateTemplateDialog>
                    <Button>Create template</Button>
                </CreateTemplateDialog>
            </div>
        </div>
    )
}
