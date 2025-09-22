import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PackageCard from '../components/common/PackageCard';

function AllTrips() {
  const { data: packages = [] } = useQuery({
    queryKey: ['allPackages'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center">All Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

export default AllTrips;