import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Landmark, Sparkles } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ProfileFormProps {
    company_name: string;
    owner_name: string;
    mobile_number: string;
    gst_no: string;
    address: string;
    state_id: string;
    city_id: string;
    business_category: string;
    account_number: string;
    ifsc_code: string;
    account_person_name: string;
    branch_name: string;
    logo: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile',
        href: '/dashboard',
    },
];

export default function ProfileForm({ businessProfile }: { businessProfile: ProfileFormProps }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileFormProps>>({
        company_name: businessProfile?.company_name,
        owner_name: businessProfile?.owner_name,
        mobile_number: businessProfile?.mobile_number,
        gst_no: businessProfile?.gst_no,
        address: businessProfile?.address,
        state_id: businessProfile?.state_id,
        city_id: businessProfile?.city_id,
        business_category: businessProfile?.business_category,
        account_number: businessProfile?.account_number,
        ifsc_code: businessProfile?.ifsc_code,
        account_person_name: businessProfile?.account_person_name,
        branch_name: businessProfile?.branch_name,
        logo: businessProfile?.logo,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('business.store'), {
            preserveScroll: true,

        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />
            <form onSubmit={submit} className="space-y-6">
                <div className="mx-auto mt-5 mb-5 w-full max-w-2xl space-y-8 rounded-xl border p-6 shadow-xs backdrop-blur-xs">

                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6" />
                        <h2 className="text-xl font-semibold">Edit Profile</h2>
                    </div>
                    {/* <div className="flex items-center justify-center gap-6">
                        <Avatar className="h-24 w-24 rounded-full border-2 shadow-xs">
                            <AvatarImage src={data?.logo} className="rounded-full object-cover" />
                            <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="h-24 w-24 rounded-full border-2 border-dashed shadow-sm transition-colors">
                            <Sparkles className="h-6 w-6" />
                        </Button>
                    </div>
                    <p className="w-full text-center text-sm hover:cursor-pointer">Upload a new Logo</p> */}

                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input
                                id="name"
                                placeholder="Company name"
                                defaultValue={data?.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.company_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="owner_name">Owner Name</Label>
                            <Input
                                id="owner_name"
                                placeholder="Owner name"
                                defaultValue={data?.owner_name}
                                onChange={(e) => setData('owner_name', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.owner_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="mobile_number">Mobile Number</Label>
                            <Input
                                id="mobile_number"
                                placeholder="Mobile number"
                                defaultValue={data?.mobile_number}
                                onChange={(e) => setData('mobile_number', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.mobile_number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="gst_no">GST Number</Label>
                            <Input
                                id="gst_no"
                                placeholder="GST number"
                                defaultValue={data?.gst_no}
                                onChange={(e) => setData('gst_no', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.gst_no} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                placeholder="Address"
                                defaultValue={data?.address}
                                onChange={(e) => setData('address', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Business Category</Label>
                            <Input
                                id="business_category"
                                placeholder="Business Category"
                                defaultValue={data?.business_category}
                                onChange={(e) => setData('business_category', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Landmark className="h-6 w-6" />
                            <h2 className="text-xl font-semibold">Bank Details</h2>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="account_number">Account Number</Label>
                            <Input
                                id="account_number"
                                placeholder="Account number"
                                defaultValue={data?.account_number}
                                onChange={(e) => setData('account_number', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.account_number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ifsc_code">IFSC Code</Label>
                            <Input
                                id="ifsc_code"
                                placeholder="IFSC code"
                                defaultValue={data?.ifsc_code}
                                onChange={(e) => setData('ifsc_code', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.ifsc_code} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="account_person_name">Account Person Name</Label>
                            <Input
                                id="account_person_name"
                                placeholder="Account person name"
                                defaultValue={data?.account_person_name}
                                onChange={(e) => setData('account_person_name', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.account_person_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="branch_name">Branch Name</Label>
                            <Input
                                id="branch_name"
                                placeholder="Branch name"
                                defaultValue={data?.branch_name}
                                onChange={(e) => setData('branch_name', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.branch_name} />
                        </div>


                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
