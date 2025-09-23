import { Link } from 'react-router-dom';

function PackageCard({ pkg }) {
  console.log(pkg);
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img src={pkg.images[0]} alt={pkg.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{pkg.title}</h3>
      <p>{pkg.tourType}</p>
      <p className="text-green-600 font-bold">${pkg.price}</p>
      <Link to={`/package/${pkg._id}`} className="bg-blue-600 text-white px-4 py-2 rounded mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}

export default PackageCard;