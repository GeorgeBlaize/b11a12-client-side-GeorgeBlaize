import { Link } from 'react-router-dom';

function TourGuideCard({ guide }) {
  const shortBio = guide?.bio ? guide.bio.slice(0, 50) : 'No bio available';
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={guide?.photoURL || '/default-avatar.png'}
        alt={guide?.name || 'Tour Guide'}
        className="w-16 h-16 rounded-full mx-auto"
      />
      <h3 className="text-xl font-bold mt-2 text-center">
        {guide?.name || 'Unknown Guide'}
      </h3>
      <p className="text-gray-600 text-center">{shortBio}...</p>
      {guide?._id && (
        <Link
          to={`/tour-guide/${guide._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 block text-center"
        >
          Details
        </Link>
      )}
    </div>
  );
}

export default TourGuideCard;
