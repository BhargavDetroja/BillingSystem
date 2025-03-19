import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function FilterBar() {
  const { filters } = usePage().props;

  const [values, setValues] = useState({
    search: filters.search || '',
  });

  const debouncedSearch = debounce((query) => {
    router.get(route(route().current()), query, {
      replace: true,
      preserveState: true,
    });
  }, 500);

  useEffect(() => {
    debouncedSearch(values);
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setValues({
      search: '',
    });
  };

  return (
    <div className="flex items-center w-full max-w-md mr-4">
      <Input
        name="search"
        placeholder="Search categories..."
        value={values.search}
        onChange={handleChange}
        className="border  rounded-md shadow-sm "
      />
      <Button
        onClick={resetFilters}
        variant="outline"
        className="ml-3 text-sm focus:outline-none"
      >
        Reset
      </Button>
    </div>
  );
}
