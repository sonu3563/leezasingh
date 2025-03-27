const Recentpost = () => {
  const posts = [
    {
      id: 1,
      img: "https://picsum.photos/400/300?random=1",
      date: "December 12",
      title: "Eum ad dolor et. Autem aut fugiat debitis",
      author: "Julia Parker",
      category: "Politics",
      link: "blog-details.html",
    },
    {
      id: 2,
      img: "https://picsum.photos/400/300?random=2",
      date: "July 17",
      title: "Et repellendus molestiae qui est sed omnis",
      author: "Mario Douglas",
      category: "Sports",
      link: "blog-details.html",
    },
    {
      id: 3,
      img: "https://picsum.photos/400/300?random=3",
      date: "September 05",
      title: "Quia assumenda est et veritati tirana ploder",
      author: "Lisa Hunter",
      category: "Economics",
      link: "blog-details.html",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900">Experience the Magic of Iconic Events</h2>
          <p className="text-gray-600 mt-2">Step into the world of creativity and innovation at Cannes and Martha’s Vineyard. Connect with like-minded professionals, showcase your talent, and unlock new opportunities.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="relative">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-56 object-cover" 
                  loading="lazy" 
                />
                <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-md shadow-md">
                  {post.date}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-3">👤 {post.author}</span>
                  <span className="mx-3">|</span>
                  <span>📂 {post.category}</span>
                </div>
                <hr className="border-gray-200 my-4" />
                <a 
                  href={post.link} 
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center font-medium"
                >
                  <span>Read More</span>
                  <i className="ml-2 bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recentpost;
