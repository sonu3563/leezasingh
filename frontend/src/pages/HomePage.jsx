import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
const HomePage = () => {
  const basePath = `${process.env.PUBLIC_URL}/publicfront/assets`;

  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    <main className="main">
      <section id="hero" className="hero section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">
                We offer modern solutions for growing your business
              </h1>
              <p data-aos="fade-up" data-aos-delay={100}>
                We are team of talented designers making websites with Bootstrap
              </p>
              <div
                className="d-flex flex-column flex-md-row"
                data-aos="fade-up"
                data-aos-delay={200}
              >

                <a href="#about" className="btn-get-started">
                  Get Started <i className="bi bi-arrow-right" />
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"
                >
                  <i className="bi bi-play-circle" />
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-out"
            >
              <img
                src={`${basePath}/img/hero-img.png`}
                className="img-fluid animated"
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add other sections here */}
      <section id="recent-posts" className="recent-posts section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Recent Posts</h2>
          <p>Recent posts form our Blog</p>
        </div>
        <div className="container">
          <div className="row gy-5">
            <div className="col-xl-4 col-md-6">
              <div
                className="post-item position-relative h-100"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src={`${basePath}/img/blog/blog-1.jpg`}
                    className="img-fluid"
                    alt=""
                  />
                  <span className="post-date">December 12</span>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Eum ad dolor et. Autem aut fugiat debitis
                  </h3>
                  <div className="meta d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person" />{" "}
                      <span className="ps-2">Julia Parker</span>
                    </div>
                    <span className="px-3 text-black-50">/</span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-folder2" />{" "}
                      <span className="ps-2">Politics</span>
                    </div>
                  </div>
                  <hr />
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="post-item position-relative h-100"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src={`${basePath}/img/blog/blog-2.jpg`}
                    className="img-fluid"
                    alt=""
                  />
                  <span className="post-date">July 17</span>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Et repellendus molestiae qui est sed omnis
                  </h3>
                  <div className="meta d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person" />{" "}
                      <span className="ps-2">Mario Douglas</span>
                    </div>
                    <span className="px-3 text-black-50">/</span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-folder2" />{" "}
                      <span className="ps-2">Sports</span>
                    </div>
                  </div>
                  <hr />
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="post-item position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src={`${basePath}/img/blog/blog-3.jpg`}
                    className="img-fluid"
                    alt=""
                  />
                  <span className="post-date">September 05</span>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Quia assumenda est et veritati tirana ploder
                  </h3>
                  <div className="meta d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person" />{" "}
                      <span className="ps-2">Lisa Hunter</span>
                    </div>
                    <span className="px-3 text-black-50">/</span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-folder2" />{" "}
                      <span className="ps-2">Economics</span>
                    </div>
                  </div>
                  <hr />
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about section start */}
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="content">
                <h3>Who We Are</h3>
                <h2>
                  Expedita voluptas omnis cupiditate totam eveniet nobis sint
                  iste. Dolores est repellat corrupti reprehenderit.
                </h2>
                <p>
                  Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt
                  et. Inventore et et dolor consequatur itaque ut voluptate sed
                  et. Magnam nam ipsum tenetur suscipit voluptatum nam et est
                  corrupti.
                </p>
                <div className="text-center text-lg-start">
                  <a
                    href="#"
                    className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 d-flex align-items-center"
              data-aos="zoom-out"
              data-aos-delay={200}
            >
              <img
                src={`${basePath}/img/about.jpg`}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* about section end */}
      {/* feature section start  */}
      <section id="features" className="features section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>
            Our Advacedd Features
            <br />
          </p>
        </div>
        <div className="container">
          <div className="row gy-5">
            <div className="col-xl-6" data-aos="zoom-out" data-aos-delay={100}>
              <img
                src={`${basePath}/img/features.png`}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-xl-6 d-flex">
              <div className="row align-self-center gy-4">
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check" />
                    <h3>Eos aspernatur rem</h3>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check" />
                    <h3>Facilis neque ipsa</h3>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={400}
                >
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check" />
                    <h3>Volup amet volupt</h3>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={500}
                >
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check" />
                    <h3>Rerum omnis sint</h3>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={600}
                >
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check" />
                    <h3>Alias possimus</h3>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={700}
                >
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check" />
                    <h3>Repellendus molli</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* feature section end */}

      {/* alt feature section start */}
      <section id="alt-features" className="alt-features section">
        <div className="container">
          <div className="row gy-5">
            <div
              className="col-xl-7 d-flex order-2 order-xl-1"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="row align-self-center gy-5">
                <div className="col-md-6 icon-box">
                  <i className="bi bi-award" />
                  <div>
                    <h4>Corporis voluptates sit</h4>
                    <p>
                      Consequuntur sunt aut quasi enim aliquam quae harum
                      pariatur laboris nisi ut aliquip
                    </p>
                  </div>
                </div>
                <div className="col-md-6 icon-box">
                  <i className="bi bi-card-checklist" />
                  <div>
                    <h4>Ullamco laboris nisi</h4>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deseruntno





                    </p>
                  </div>
                </div>
                <div className="col-md-6 icon-box">
                  <i className="bi bi-dribbble" />
                  <div>
                    <h4>Labore consequatur</h4>
                    <p>
                      Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
                      maiores omnis facere
                    </p>
                  </div>
                </div>
                <div className="col-md-6 icon-box">
                  <i className="bi bi-filter-circle" />
                  <div>
                    <h4>Beatae veritatis</h4>
                    <p>
                      Expedita veritatis consequuntur nihil tempore laudantium
                      vitae denat pacta
                    </p>
                  </div>
                </div>
                <div className="col-md-6 icon-box">
                  <i className="bi bi-lightning-charge" />
                  <div>
                    <h4>Molestiae dolor</h4>
                    <p>
                      Et fuga et deserunt et enim. Dolorem architecto ratione
                      tensa raptor marte
                    </p>
                  </div>
                </div>
                <div className="col-md-6 icon-box">
                  <i className="bi bi-patch-check" />
                  <div>
                    <h4>Explicabo consectetur</h4>
                    <p>
                      Est autem dicta beatae suscipit. Sint veritatis et sit
                      quasi ab aut inventore
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-5 d-flex align-items-center order-1 order-xl-2"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <img
                src={`${basePath}/img/alt-features.png`}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/*  alt feature section end */}

      {/* services section start */}
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>
            Check Our Services
            <br />
          </p>
        </div>
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="service-item item-cyan position-relative">
                <i className="bi bi-activity icon" />
                <h3>Nesciunt Mete</h3>
                <p>
                  Provident nihil minus qui consequatur non omnis maiores. Eos
                  accusantium minus dolores iure perferendis tempore et
                  consequatur.
                </p>
                <a href="#" className="read-more stretched-link">
                  <span>Read More</span> <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="service-item item-orange position-relative">
                <i className="bi bi-broadcast icon" />
                <h3>Eosle Commodi</h3>
                <p>
                  Ut autem aut autem non a. Sint sint sit facilis nam iusto
                  sint. Libero corrupti neque eum hic non ut nesciunt dolorem.
                </p>
                <a href="#" className="read-more stretched-link">
                  <span>Read More</span> <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="service-item item-teal position-relative">
                <i className="bi bi-easel icon" />
                <h3>Ledo Markt</h3>
                <p>
                  Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                  Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.
                </p>
                <a href="#" className="read-more stretched-link">
                  <span>Read More</span> <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="service-item item-red position-relative">
                <i className="bi bi-bounding-box-circles icon" />
                <h3>Asperiores Commodi</h3>
                <p>
                  Non et temporibus minus omnis sed dolor esse consequatur.
                  Cupiditate sed error ea fuga sit provident adipisci neque.
                </p>
                <a href="#" className="read-more stretched-link">
                  <span>Read More</span> <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <div className="service-item item-indigo position-relative">
                <i className="bi bi-calendar4-week icon" />
                <h3>Velit Doloremque.</h3>
                <p>
                  Cumque et suscipit saepe. Est maiores autem enim facilis ut
                  aut ipsam corporis aut. Sed animi at autem alias eius labore.
                </p>
                <a href="#" className="read-more stretched-link">
                  <span>Read More</span> <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={600}
            >
              <div className="service-item item-pink position-relative">
                <i className="bi bi-chat-square-text icon" />
                <h3>Dolori Architecto</h3>
                <p>
                  Hic molestias ea quibusdam eos. Fugiat enim doloremque aut
                  neque non et debitis iure. Corrupti recusandae ducimus enim.
                </p>
                <a href="#" className="read-more stretched-link">
                  <span>Read More</span> <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* services section end  */}

      {/* testimonial section start */}
      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>
            What they are saying about us
            <br />
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="swiper init-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Proin iaculis purus consequat sem cure digni ssim donec
                    porttitora entum suscipit rhoncus. Accusantium quam,
                    ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                    risus at semper.
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src={`${basePath}/img/testimonials/testimonials-1.jpg`}
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Saul Goodman</h3>
                    <h4>Ceo &amp; Founder</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Export tempor illum tamen malis malis eram quae irure esse
                    labore quem cillum quid cillum eram malis quorum velit fore
                    eram velit sunt aliqua noster fugiat irure amet legam anim
                    culpa.
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src={`${basePath}/img/testimonials/testimonials-2.jpg`}
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Sara Wilsson</h3>
                    <h4>Designer</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Enim nisi quem export duis labore cillum quae magna enim
                    sint quorum nulla quem veniam duis minim tempor labore quem
                    eram duis noster aute amet eram fore quis sint minim.
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src={`${basePath}/img/testimonials/testimonials-3.jpg`}
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Jena Karlis</h3>
                    <h4>Store Owner</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                    multos export minim fugiat minim velit minim dolor enim duis
                    veniam ipsum anim magna sunt elit fore quem dolore labore
                    illum veniam.
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src={`${basePath}/img/testimonials/testimonials-4.jpg`}
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Quis quorum aliqua sint quem legam fore sunt eram irure
                    aliqua veniam tempor noster veniam enim culpa labore duis
                    sunt culpa nulla illum cillum fugiat legam esse veniam culpa
                    fore nisi cillum quid.
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src={`${basePath}/img/testimonials/testimonials-5.jpg`}
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>John Larson</h3>
                    <h4>Entrepreneur</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </section>

      {/* testimonial section end */}
    </main>
  );
};

export default HomePage;



