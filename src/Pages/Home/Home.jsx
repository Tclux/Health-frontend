import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "lazysizes";
import { getDoctors } from "../../Redux/Actions/UserActions";
// import "lazysizes/plugins/parent-fit/ls.parent-fit";

const slides = [
  {
    id: 1,
    imageUrl: "/images/hero1.png",
    title: "Special Child Session",
    description: "with no commission",
  },
  {
    id: 2,
    imageUrl: "/images/hero2.png",
    title: "Best Children Study",
    description: "And Future Care",
  },
  {
    id: 3,
    imageUrl: "/images/hero3.png",
    title: "We Prepare Your",
    description: "Child For Life",
  },
];

const Home = () => {
  const allDoctors = useSelector((state) => state.allDoctors);
  const { error, loading, doctors } = allDoctors;

  console.log(doctors);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const [activeIndex, setActiveIndex] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Auto slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  return (
    <div className="home-wrapper">
      <div className="d-md-none d-block caro-capp mb-3 container">
        <h1>01</h1>
        <h1>Elevate Your Well-being!</h1>
        <h1>Discover Vitality</h1>
        <h1>Through Fitness</h1>
        <div className="caro-btn d-flex gap-5">
          <button>Explore Workouts</button>
          <button>Unlock Nutrition</button>
        </div>
      </div>
      <section className="caro-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`caro-item ${index === activeIndex ? "active" : ""}`}
          >
            <img src={slide.imageUrl} className="img-fluid" />
            <div className="caro-cap">
              <h1>01</h1>
              <h1>Elevate Your Well-being!</h1>
              <h1>Discover Vitality</h1>
              <h1>Through Fitness</h1>
              <div className="caro-btn d-flex gap-5">
                <button>Explore Workouts</button>
                <button>Unlock Nutrition</button>
              </div>
            </div>
          </div>
        ))}

        <button className="prev-btn" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next-btn" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="indicators">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
      </section>
      <div className="container">
        <section className="py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6 col-12 second-section-1">
              <h2>Bring Care to Your</h2>
              <h2>Home With One Click</h2>
              <p>
                Lorem ipsum dolor amet consectetur adipisicing elitiuim sete
                eiusmod tempor incididunt ut labore etnalom dolore magn aiqua
                udiminimate veniam quis norud exercitation ullamco laboris nisi
                aliquip commodo consequat duis aute irure dolor in
                reprehenderit.
              </p>
              <div className="hero4-btn">
                <button>About Us</button>
                <button>Contact</button>
              </div>
            </div>
            <div className="col-md-6 col-12 second-section-2 mt-md-0 mt-4">
              <div className="hero4-img">
                <img
                  className="img-fluid "
                  src="/images/h4.png"
                  alt="hero4-img"
                />
              </div>
              <div className="second-section-item">
                <div className="second-section-span1">
                  <h5 className="mb-0">Greetings & Welcome</h5>
                  <h5 className="mb-0">Dr. Tyrone Grindle</h5>
                </div>
                <div className="second-section-span"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="third-section">
        <div className="container text-center py-4">
          <h4>We Made It Simple</h4>
          <h2 className="how-it-works">
            How It <span>Works?</span>
          </h2>
          <p>
            Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete
            eiusmod tempor incididunt ut
            <br /> labore etnalom dolore magna aliqua udiminimate veniam quis
            norud.
          </p>
          <div className="row mt-4">
            <div className="col-md-4 col-sm-6 col-12 d-flex align-items-center flex-column justify-content-center i">
              <div className="dashed">
                <div className="icon-wrapper">
                  <img
                    className="img-fluid"
                    src="/images/icon1.png"
                    alt="icon1-img"
                  />
                </div>
              </div>
              <p className="mt-5">Search Best Online</p>
              <h4>Professional</h4>
            </div>
            <div className="col-md-4 col-sm-6 col-12  d-flex align-items-center flex-column justify-content-center i">
              <div className="dashed">
                <div className="icon-wrapper">
                  <img
                    className="img-fluid"
                    src="/images/icon2.png"
                    alt="icon1-img"
                  />
                </div>
              </div>
              <p className="mt-5">Search Best Online</p>
              <h4>Appointment</h4>
            </div>
            <div className="col-md-4 col-sm-6 col-12  d-flex align-items-center flex-column justify-content-center i">
              <div className="dashed">
                <div className="icon-wrapper">
                  <img
                    className="img-fluid"
                    src="/images/icon3.png"
                    alt="icon1-img"
                  />
                </div>
              </div>
              <p className="mt-5">Search Best Online</p>
              <h4>Feedback</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="fourth-section mt-4">
        <div className="container py-4">
          <h4 className="text-center">Meet Our Professionals</h4>
          <h2 className="how-it-works text-center">
            Top Rated <span>Specialists</span>
          </h2>
          <p className="text-center">
            Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete
            eiusmod tempor incididunt ut
            <br /> labore etnalom dolore magna aliqua udiminimate veniam quis
            norud.
          </p>
          <div className="row mt-2 y">
            {doctors?.map((doc) => (
              <div className="col-lg-4 col-md-6 col-12 op mt-3 ">
                <div className="x">
                  <div className="x-item mb-3">
                    <Link to={`/doctor/${doc?._id}`}>
                      <img
                        src={doc?.profileImage}
                        className="img-fluid img-doc w-100"
                      />
                    </Link>
                    <div className="light">
                      <span class="material-symbols-outlined">
                        electric_bolt
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex fourth-profile-1">
                      <h5>{doc.field}</h5>
                      {/* <b>Director, NurseryHub</b> */}
                    </div>
                    <div className="d-flex align-items-center gap-2 fourth-profile-2 ">
                      <h5 className="mb-0 mt-0">
                        {" "}
                        Dr. {doc.firstName} {doc.lastName}
                      </h5>
                      <div className="fourth-profile-2-1 mb-0">
                        <span class="material-symbols-outlined">
                          verified_user
                        </span>
                        <span class="material-symbols-outlined">verified</span>
                      </div>
                    </div>
                    <p className="mt-2">Ph.D, DPT, MS OMPT</p>
                    <div className="d-flex gap-3 align-items-center">
                      <ReactStars
                        count={5}
                        size={16}
                        value={4.5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p>1 Feedback</p>
                    </div>
                    <b>Tue</b>
                    <div className="mt-3 fourth-profile-3">
                      <div className="d-flex gap-2 align-items-center fourth-profile-3-1">
                        <span class="material-symbols-outlined">
                          location_on
                        </span>
                        <p>{doc.location}</p>
                      </div>
                      <div className="d-flex gap-2 align-items-center mt-2 fourth-profile-3-1">
                        <span class="material-symbols-outlined">save</span>
                        <p>Available Today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-more-btn">
            <button>Show All</button>
          </div>
        </div>
      </section>
      <section className="fifth-section mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <img src="/images/h5.png" className="img-fluid" alt="" />
            </div>
            <div className="col-md-6 col-12 d-flex flex-column justify-content-center fifth-section-2">
              <h3>Care On The GO</h3>
              <h3>Download Mobile App</h3>
              <p>
                Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete
                eiusmod tempor incididunt ut labore etnalom dolore magna aliqua.
              </p>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <img className="img-fluid" src="/images/h5-1.png" alt="" />
                <img className="img-fluid" src="/images/h5-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sixth-section mt-4">
        <div className="container py-4">
          <h4 className="text-center">Read Professional Articles</h4>
          <h2 className="how-it-works text-center">
            Latest <span>Articles</span>
          </h2>
          <p className="text-center">
            Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete
            eiusmod tempor incididunt ut
            <br /> labore etnalom dolore magna aliqua udiminimate veniam quis
            norud.
          </p>
          <div className="row mt-2 y">
            <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
              <div className="x">
                <div className="x-item mb-3">
                  <img className="img-fluid" src="/images/art3.jpg" alt="" />
                  <div className="light">
                    <span class="material-symbols-outlined">electric_bolt</span>
                  </div>
                  <div className="author">
                    <div className="d-flex gap-2 align-items-center py-1 px-3">
                      <img
                        src="/images/author1.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <p>Ralph Davis</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex fourth-profile-1">
                    <h5>Diagnostic Radiology</h5>
                    {/* <b>Director, NurseryHub</b> */}
                  </div>

                  <h5 className="mt-1">
                    Alcohol may be less harmful for people over 50
                  </h5>
                  <div className="d-flex gap-2 align-items-center sixth-section-1">
                    <span class="material-symbols-outlined">alarm</span>
                    <p>September 13, 2019</p>
                  </div>
                  <div className="d-flex gap-2 sixth-bottom mt-3  py-2 align-items-center">
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">favorite</span>
                      <p>5433 views</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">visibility</span>
                      <p>5433 views</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">chat_bubble</span>
                      <p>5433 views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
              <div className="x">
                <div className="x-item mb-3">
                  <img className="img-fluid" src="/images/art2.jpg" alt="" />
                  <div className="light">
                    <span class="material-symbols-outlined">electric_bolt</span>
                  </div>
                  <div className="author">
                    <div className="d-flex gap-2 align-items-center py-1 px-3">
                      <img
                        src="/images/author2.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <p>Ralph Davis</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex fourth-profile-1">
                    <h5>Darmatology</h5>
                    {/* <b>Director, NurseryHub</b> */}
                  </div>

                  <h5 className="mt-1">
                    Study reveals fiber we should eat to prevent disease
                  </h5>
                  <div className="d-flex gap-2 align-items-center sixth-section-1">
                    <span class="material-symbols-outlined">alarm</span>
                    <p>September 13, 2019</p>
                  </div>
                  <div className="d-flex gap-2 sixth-bottom mt-3  py-2 align-items-center">
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">favorite</span>
                      <p>5433 views</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">visibility</span>
                      <p>5433 views</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">chat_bubble</span>
                      <p>5433 views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
              <div className="x">
                <div className="x-item mb-3">
                  <img className="img-fluid" src="/images/art3.jpg" alt="" />
                  <div className="light">
                    <span class="material-symbols-outlined">electric_bolt</span>
                  </div>
                  <div className="author">
                    <div className="d-flex gap-2 align-items-center py-1 px-3">
                      <img
                        src="/images/author3.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <p>Ralph Davis</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex fourth-profile-1">
                    <h5>Diagnostic Radiology</h5>
                    {/* <b>Director, NurseryHub</b> */}
                  </div>

                  <h5 className="mt-1">
                    These common drugs may increase dementia risk
                  </h5>
                  <div className="d-flex gap-2 align-items-center sixth-section-1">
                    <span class="material-symbols-outlined">alarm</span>
                    <p>September 13, 2019</p>
                  </div>
                  <div className="d-flex gap-2 sixth-bottom mt-3  py-2 align-items-center">
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">favorite</span>
                      <p>5433 views</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">visibility</span>
                      <p>5433 views</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined">chat_bubble</span>
                      <p>5433 views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
