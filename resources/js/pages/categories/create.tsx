import { FormEventHandler } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Categories',
        href: '/categories/create',
    },
];

type CategoryForm = {
    name: string;
};

export default function CreateCategory() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CategoryForm>>({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onFinish: () => reset('name'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex justify-end">
                <Link href={route('categories.index')} className='text text-indigo-400'> Back </Link>
            </div>
            <div className="flex justify-center items-center">
                <form className="flex flex-col gap-6 w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-300" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="Name"> Name </Label>
                            <Input
                                id="Name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Category Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>

        </AppLayout>
    );
}