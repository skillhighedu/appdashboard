import { useState } from "react";
import { Button } from "@components/ui/button";
export default function Blogs() {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "Mastering Modern Web Development",
      excerpt: "Explore cutting-edge trends and techniques in web development.",
      date: "April 5, 2025",
      author: "John Doe",
      category: "Development",
      image: "https://via.placeholder.com/600x400",
      featured: true,
    },
    {
      id: 2,
      title: "Designing with Tailwind CSS",
      excerpt: "Create stunning UIs with Tailwind’s utility-first approach.",
      date: "April 3, 2025",
      author: "Jane Smith",
      category: "Design",
      image: "https://via.placeholder.com/400x250",
      featured: false,
    },
    {
      id: 3,
      title: "JavaScript Performance Tips",
      excerpt: "Boost your JS code efficiency with these pro tips.",
      date: "April 1, 2025",
      author: "Alex Johnson",
      category: "Development",
      image: "https://via.placeholder.com/400x250",
      featured: false,
    },
    {
      id: 4,
      title: "UI/UX Trends in 2025",
      excerpt: "Discover what’s shaping the future of design.",
      date: "March 28, 2025",
      author: "Emily Brown",
      category: "Design",
      image: "https://via.placeholder.com/400x250",
      featured: false,
    },
  ];

  // State for category filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Development", "Design"];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen font ">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-primary md:text-5xl font-extrabold tracking-tight mb-4">
            SkillHigh Blogs
          </h1>
          <p className="text-lg  text-darkPrimary md:text-xl max-w-2xl mx-auto opacity-90">
            Dive into expert insights, tutorials, and the latest industry trends.
          </p>

          <div className="mt-8">
            <Button className="cursor-pointer"> Explore Latest Posts</Button>
          </div>
        </div>
        {/* Optional decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 "></div>
      </section>

      {/* Featured Post Section */}
      {blogPosts.filter((post) => post.featured).length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured blogs
          </h2>
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transform hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover"
                />
                <div className="p-8 flex-1">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="mt-8">
                    <Button className="cursor-pointer text-white">Read</Button>
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-300 ${selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts
            .filter((post) => !post.featured)
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-5">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="mt-8">
                    <Button className="cursor-pointer text-primary" variant="secondary" >Read More</Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}