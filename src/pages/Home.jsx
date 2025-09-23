import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PackageCard from '../components/common/PackageCard';
import TourGuideCard from '../components/common/TourGuideCard';
import StoryCard from '../components/common/StoryCard';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: packages = [] } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages/random`);
      return res.data;
    },
  });

  const { data: tourGuides = [] } = useQuery({
    queryKey: ['tourGuides'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tour-guides/random`);
      return res.data;
    },
  });

  const { data: stories = [] } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories/random`);
      return res.data;
    },
  });

  const handleShare = (storyId) => {
    if (!user) {
      toast.error('Please login to share a story!');
      navigate('/login');
    } else {
      toast.success('Story shared successfully!');
    }
  };

  return (
    <div className="container mx-auto py-8">
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Swiper pagination={true} modules={[Pagination]} className="h-96">
          <SwiperSlide>
            <div
              className="h-96 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('https://i.ibb.co/3m8vpxKY/yourImageName.png')" }}
              
            >
              <h1 className="text-4xl text-white font-bold bg-black bg-opacity-50 p-4">
                Discover Bangladesh
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-96 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: 'url(/assets/images/banner2.jpg)' }}
            >
              <h1 className="text-4xl text-white font-bold bg-black bg-opacity-50 p-4">
                Adventure Awaits
              </h1>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>

      
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center">Welcome to Tourism Guide</h2>
        <p className="text-center mt-4 max-w-2xl mx-auto">
          Explore the vibrant culture, stunning landscapes, and rich history of Bangladesh with our curated travel packages and expert guides.
        </p>
        <div className="mt-4">
          <video controls className="w-full max-w-2xl mx-auto rounded">
            <source src="/path-to-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      
      <Tabs>
        <TabList className="flex space-x-4 justify-center mb-4">
          <Tab className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded">Our Packages</Tab>
          <Tab className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded">Meet Our Tour Guides</Tab>
        </TabList>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tourGuides.map((guide) => (
              <TourGuideCard key={guide._id} guide={guide} />
            ))}
          </div>
        </TabPanel>
      </Tabs>

      
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center">Tourist Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} onShare={handleShare} />
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/community" className="bg-blue-600 text-white px-4 py-2 rounded">
            All Stories
          </Link>
        </div>
      </section>

      
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <p className="text-center mt-4 max-w-2xl mx-auto">
          We offer personalized travel experiences, expert guides, and affordable packages to make your journey unforgettable.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center">Local Culture</h2>
        <p className="text-center mt-4 max-w-2xl mx-auto">
          Immerse yourself in the vibrant traditions, cuisine, and festivals of Bangladesh.
        </p>
      </section>
    </div>
  );
}

export default Home;