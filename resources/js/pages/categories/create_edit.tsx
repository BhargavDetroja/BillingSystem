import { FormEventHandler, useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Category = {
    id: number;
    name: string;
};

type PageProps = {
    category?: Category;
};

type CategoryForm = {
    name: string;
};

export default function CreateEditCategory() {
    // Get props from the page
    const { category } = usePage<PageProps>().props;
    
    // Determine if we're editing or creating
    const isEditing = !!category;
    
    // Generate dynamic breadcrumbs based on mode
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categories',
            href: '/categories',
        },
        {
            title: isEditing ? 'Edit Category' : 'Create Category',
            href: isEditing ? `/categories/${category?.id}/edit` : '/categories/create',
        },
    ];

    // Initialize form with existing data if editing
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<CategoryForm>>({
        name: category?.name || '',
    });

    // Update form if category prop changes
    useEffect(() => {
        if (category) {
            setData('name', category.name);
        }
    }, [category]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Update existing category
            put(route('categories.update', category?.id), {
                onSuccess: () => {
                    // Optionally handle success
                }
            });
        } else {
            // Create new category
            post(route('categories.store'), {
                onFinish: () => reset('name'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Category' : 'Create Category'} />
            <div className="flex justify-end m-5">
                <Link href={route('categories.index')}>
                    <Button variant="outline">Back to Categories</Button>
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <form className="flex mt-5 flex-col gap-6 w-full max-w-md p-6 rounded-lg shadow-md border" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
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
                            {isEditing ? 'Update Category' : 'Create Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}