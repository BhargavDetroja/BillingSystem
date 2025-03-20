import { FormEventHandler, useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Product = {
    id: number;
    code: string | null;
    name: string | null;
    unit: string | null;
    rate: string | null;
    hsn_code: string | null;
    category_id: string | null;
    status: string | null;
};

type Category = {
    id: number;
    name: string;
};

type PageProps = {
    product?: Product;
    categories: Category[];
};

type ProductForm = {
    code: string;
    name: string;
    unit: string;
    rate: string;
    hsn_code: string;
    category_id: string;
    status: string;
};

export default function CreateEditProduct() {
    // Get props from the page
    const { product, categories } = usePage<PageProps>().props;
    
    // Determine if we're editing or creating
    const isEditing = !!product;
    
    // Generate dynamic breadcrumbs based on mode
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: isEditing ? 'Edit Product' : 'Create Product',
            href: isEditing ? `/products/${product?.id}/edit` : '/products/create',
        },
    ];

    // Initialize form with existing data if editing
    const { data, setData, post, put, processing, errors, reset } = useForm<ProductForm>({
        code: product?.code || '',
        name: product?.name || '',
        unit: product?.unit || '',
        rate: product?.rate || '',
        hsn_code: product?.hsn_code || '',
        category_id: product?.category_id?.toString() || '',
        status: product?.status || '1',
    });

    // Update form if product prop changes
    useEffect(() => {
        if (product) {
            setData({
                code: product.code || '',
                name: product.name || '',
                unit: product.unit || '',
                rate: product.rate || '',
                hsn_code: product.hsn_code || '',
                category_id: product.category_id?.toString() || '',
                status: product.status || '1',
            });
        }
    }, [product]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Update existing product
            put(route('products.update', product?.id), {
                onSuccess: () => {
                    // Optionally handle success
                }
            });
        } else {
            // Create new product
            post(route('products.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    // Common unit options
    const unitOptions = [
        { value: 'piece', label: 'Piece' },
        { value: 'kg', label: 'Kilogram (kg)' },
        { value: 'g', label: 'Gram (g)' },
        { value: 'l', label: 'Liter (l)' },
        { value: 'ml', label: 'Milliliter (ml)' },
        { value: 'box', label: 'Box' },
        { value: 'carton', label: 'Carton' },
        { value: 'pack', label: 'Pack' },
        { value: 'set', label: 'Set' },
        { value: 'pair', label: 'Pair' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Product' : 'Create Product'} />
            <div className="flex justify-end m-5">
                <Link href={route('products.index')}>
                    <Button variant="outline">Back to Products</Button>
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <form className="flex mt-5 flex-col gap-6 w-full max-w-2xl p-6 rounded-lg shadow-md border" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Product Code */}
                        <div className="grid gap-2">
                            <Label htmlFor="code">Product Code</Label>
                            <Input
                                id="code"
                                type="text"
                                autoFocus
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="e.g. PRD001"
                            />
                            <InputError message={errors.code} />
                        </div>

                        {/* Product Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Product Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Unit */}
                            <div className="grid gap-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select
                                    value={data.unit}
                                    onValueChange={(value) => setData('unit', value)}
                                >
                                    <SelectTrigger id="unit">
                                        <SelectValue placeholder="Select Unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {unitOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.unit} />
                            </div>

                            {/* Rate */}
                            <div className="grid gap-2">
                                <Label htmlFor="rate">Rate</Label>
                                <Input
                                    id="rate"
                                    type="text"
                                    value={data.rate}
                                    onChange={(e) => setData('rate', e.target.value)}
                                    placeholder="0.00"
                                />
                                <InputError message={errors.rate} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* HSN Code */}
                            <div className="grid gap-2">
                                <Label htmlFor="hsn_code">HSN Code</Label>
                                <Input
                                    id="hsn_code"
                                    type="text"
                                    value={data.hsn_code}
                                    onChange={(e) => setData('hsn_code', e.target.value)}
                                    placeholder="HSN Code"
                                />
                                <InputError message={errors.hsn_code} />
                            </div>

                            {/* Category */}
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Category</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger id="category_id">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value)}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>

                        <Button type="submit" className="mt-4" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
                            {isEditing ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}