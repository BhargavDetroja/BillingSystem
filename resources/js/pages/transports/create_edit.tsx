import { FormEventHandler, useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

type Transport = {
    id: number;
    transport_id: string | null;
    name: string | null;
    address: string | null;
    mobile_number: string | null;
    gst_no: string | null;
    status: string | null;
};

type PageProps = {
    transport?: Transport;
    nextTransportId?: string;
};

type TransportForm = {
    transport_id: string;
    name: string;
    address: string;
    mobile_number: string;
    gst_no: string;
    status: string;
};

export default function CreateEditTransport() {
    // Get props from the page
    const { transport, nextTransportId } = usePage<PageProps>().props;
    
    // Determine if we're editing or creating
    const isEditing = !!transport;
    
    // Generate dynamic breadcrumbs based on mode
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Transports',
            href: '/transports',
        },
        {
            title: isEditing ? 'Edit Transport' : 'Add Transport',
            href: isEditing ? `/transports/${transport?.id}/edit` : '/transports/create',
        },
    ];

    // Initialize form with existing data if editing, or with next ID if creating
    const { data, setData, post, put, processing, errors, reset } = useForm<TransportForm>({
        transport_id: transport?.transport_id || nextTransportId || '',
        name: transport?.name || '',
        address: transport?.address || '',
        mobile_number: transport?.mobile_number || '',
        gst_no: transport?.gst_no || '',
        status: transport?.status || '1',
    });

    // Update form if transport prop changes
    useEffect(() => {
        if (transport) {
            setData({
                transport_id: transport.transport_id || '',
                name: transport.name || '',
                address: transport.address || '',
                mobile_number: transport.mobile_number || '',
                gst_no: transport.gst_no || '',
                status: transport.status || '1',
            });
        } else if (nextTransportId) {
            setData('transport_id', nextTransportId);
        }
    }, [transport, nextTransportId]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Update existing transport
            put(route('transports.update', transport?.id), {
                onSuccess: () => {
                    // Optionally handle success
                }
            });
        } else {
            // Create new transport
            post(route('transports.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Transport' : 'Add Transport'} />
            <div className="flex justify-end m-5">
                <Link href={route('transports.index')}>
                    <Button variant="outline">Back to Transports</Button>
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <form className="flex mt-5 flex-col gap-6 w-full max-w-2xl p-6 rounded-lg shadow-md border" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Transport ID */}
                        <div className="grid gap-2">
                            <Label htmlFor="transport_id">Transport ID</Label>
                            <Input
                                id="transport_id"
                                type="text"
                                value={data.transport_id}
                                onChange={(e) => setData('transport_id', e.target.value)}
                                placeholder="e.g. TR001"
                                disabled={isEditing} // Disable editing of ID if in edit mode
                            />
                            <InputError message={errors.transport_id} />
                        </div>

                        {/* Transport Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Transport Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Transport Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Address */}
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                rows={3}
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Full Address"
                            />
                            <InputError message={errors.address} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Mobile Number */}
                            <div className="grid gap-2">
                                <Label htmlFor="mobile_number">Mobile Number</Label>
                                <Input
                                    id="mobile_number"
                                    type="text"
                                    value={data.mobile_number}
                                    onChange={(e) => setData('mobile_number', e.target.value)}
                                    placeholder="Mobile Number"
                                />
                                <InputError message={errors.mobile_number} />
                            </div>

                            {/* GST Number */}
                            <div className="grid gap-2">
                                <Label htmlFor="gst_no">GST Number</Label>
                                <Input
                                    id="gst_no"
                                    type="text"
                                    value={data.gst_no}
                                    onChange={(e) => setData('gst_no', e.target.value)}
                                    placeholder="GST Number"
                                />
                                <InputError message={errors.gst_no} />
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
                            {isEditing ? 'Update Transport' : 'Add Transport'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}