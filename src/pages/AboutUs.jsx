function AboutUs() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center">About Us</h2>
      <div className="mt-8 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold">About the Developer</h3>
        <p>
          Hi, I'm Jonathan George Blaize Purification, a passionate web developer with a love for creating user-friendly applications. I specialize in building responsive, modern web platforms using React, Node.js, and MongoDB.
        </p>
        <h3 className="text-xl font-bold mt-4">Projects</h3>
        <ul className="list-disc ml-6">
          <li>Tourism Management System - A travel platform for exploring Bangladesh</li>
          <li>E-commerce Platform - A full-stack online store</li>
          <li>Blog App - A blogging platform with user authentication</li>
        </ul>
        <h3 className="text-xl font-bold mt-4">Connect with Me</h3>
        <div className="flex space-x-4">
          <a href="https://github.com/GeorgeBlaize" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/jonathan-george-blaize-purification-5780341b2/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
          <a href="https://twitter.com/developer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;