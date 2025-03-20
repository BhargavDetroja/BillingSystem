import { FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Party = {
  id: number;
  name: string | null;
  gst_no: string | null;
  address: string | null;
  mobile_number: string | null;
  email: string | null;
  state_id: number | null;
  city_id: number | null;
  pin_code: string | null;
  account_number: string | null;
  account_person_name: string | null;
  ifsc_code: string | null;
  branch_name: string | null;
  status: string | null;
};

type State = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
  state_id: number;
};

type PageProps = {
  party?: Party;
  states: State[];
  cities: City[];
};

type PartyForm = {
  name: string;
  gst_no: string;
  address: string;
  mobile_number: string;
  email: string;
  state_id: string;
  city_id: string;
  pin_code: string;
  account_number: string;
  account_person_name: string;
  ifsc_code: string;
  branch_name: string;
  status: string;
};

export default function CreateEditParty() {
  // Get props from the page
  const { party, states, cities: initialCities } = usePage<PageProps>().props;

  // Determine if we're editing or creating
  const isEditing = !!party;

  // State for location selectors
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>(initialCities);
  const [loading, setLoading] = useState(false);

  // Generate dynamic breadcrumbs based on mode
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Parties',
      href: '/parties',
    },
    {
      title: isEditing ? 'Edit Party' : 'Add Party',
      href: isEditing ? `/parties/${party?.id}/edit` : '/parties/create',
    },
  ];

  // Initialize form with existing data if editing
  const { data, setData, post, put, processing, errors, reset } = useForm<PartyForm>({
    name: party?.name || '',
    gst_no: party?.gst_no || '',
    address: party?.address || '',
    mobile_number: party?.mobile_number || '',
    email: party?.email || '',
    state_id: party?.state_id?.toString() || '',
    city_id: party?.city_id?.toString() || '',
    pin_code: party?.pin_code || '',
    account_number: party?.account_number || '',
    account_person_name: party?.account_person_name || '',
    ifsc_code: party?.ifsc_code || '',
    branch_name: party?.branch_name || '',
    status: party?.status || '1',
  });

  // Initialize state and city selectors from form data
  useEffect(() => {
    if (party) {
      if (party.state_id) {
        const stateObj = states.find(s => s.id === party.state_id);
        if (stateObj) {
          setSelectedState(stateObj);

          // Fetch cities for the state when editing
          fetchCitiesByStateId(stateObj.id);
        }
      }

      if (party.city_id) {
        const cityObj = cities.find(c => c.id === party.city_id);
        if (cityObj) setSelectedCity(cityObj);
      }
    }
  }, [party, states]);

  // Fetch cities by state ID
  const fetchCitiesByStateId = async (stateId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`/cities-by-state/${stateId}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle state selection
  const handleStateChange = (stateId: string) => {
    const state = states.find(s => s.id.toString() === stateId) || null;
    setSelectedState(state);
    setSelectedCity(null); // Reset city when state changes

    // Fetch cities for the selected state
    if (state) {
      fetchCitiesByStateId(state.id);
    } else {
      setCities([]);
    }

    setData({
      ...data,
      state_id: stateId,
      city_id: '', // Reset city_id when state changes
    });
  };

  // Handle city selection
  const handleCityChange = (cityId: string) => {
    const city = cities.find(c => c.id.toString() === cityId) || null;
    setSelectedCity(city);

    setData({
      ...data,
      city_id: cityId,
    });
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing party
      put(route('parties.update', party?.id), {
        onSuccess: () => {
          // Optionally handle success
        }
      });
    } else {
      // Create new party
      post(route('parties.store'), {
        onSuccess: () => reset(),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={isEditing ? 'Edit Party' : 'Add Party'} />
      <div className="flex justify-end m-5">
        <Link href={route('parties.index')}>
          <Button variant="outline">Back to Parties</Button>
        </Link>
      </div>
      <div className="m-5">
        <form onSubmit={submit}>
          <div className="grid gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company/Person Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="name">Company/Person Name</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      autoFocus
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter name"
                    />
                    <InputError message={errors.name} />
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="Email Address"
                    />
                    <InputError message={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* State */}
                  <div className="grid gap-2">
                    <Label htmlFor="state_id">State</Label>
                    <Select
                      value={data.state_id}
                      onValueChange={handleStateChange}
                    >
                      <SelectTrigger id="state_id">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.id} value={state.id.toString()}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <InputError message={errors.state_id} />
                  </div>

                  {/* City */}
                  <div className="grid gap-2">
                    <Label htmlFor="city_id">City</Label>
                    <Select
                      value={data.city_id}
                      onValueChange={handleCityChange}
                      disabled={!data.state_id || loading}
                    >
                      <SelectTrigger id="city_id">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {loading ? (
                          <SelectItem value="loading" disabled>
                            Loading cities...
                          </SelectItem>
                        ) :  cities.length > 0 ? (
                          cities.map((city) => (
                            <SelectItem key={city.id} value={city.id.toString()}>
                              {city.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-cities" disabled>
                            No cities found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <InputError message={errors.city_id} />
                  </div>

                  {/* Pin Code */}
                  <div className="grid gap-2">
                    <Label htmlFor="pin_code">PIN Code</Label>
                    <Input
                      id="pin_code"
                      type="text"
                      value={data.pin_code}
                      onChange={(e) => setData('pin_code', e.target.value)}
                      placeholder="PIN Code"
                    />
                    <InputError message={errors.pin_code} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details Card - Unchanged */}
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Account Number */}
                  <div className="grid gap-2">
                    <Label htmlFor="account_number">Account Number</Label>
                    <Input
                      id="account_number"
                      type="text"
                      value={data.account_number}
                      onChange={(e) => setData('account_number', e.target.value)}
                      placeholder="Account Number"
                    />
                    <InputError message={errors.account_number} />
                  </div>

                  {/* Account Person Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="account_person_name">Account Holder Name</Label>
                    <Input
                      id="account_person_name"
                      type="text"
                      value={data.account_person_name}
                      onChange={(e) => setData('account_person_name', e.target.value)}
                      placeholder="Account Holder Name"
                    />
                    <InputError message={errors.account_person_name} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* IFSC Code */}
                  <div className="grid gap-2">
                    <Label htmlFor="ifsc_code">IFSC Code</Label>
                    <Input
                      id="ifsc_code"
                      type="text"
                      value={data.ifsc_code}
                      onChange={(e) => setData('ifsc_code', e.target.value)}
                      placeholder="IFSC Code"
                    />
                    <InputError message={errors.ifsc_code} />
                  </div>

                  {/* Branch Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="branch_name">Branch Name</Label>
                    <Input
                      id="branch_name"
                      type="text"
                      value={data.branch_name}
                      onChange={(e) => setData('branch_name', e.target.value)}
                      placeholder="Branch Name"
                    />
                    <InputError message={errors.branch_name} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
                {isEditing ? 'Update Party' : 'Add Party'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}