import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Core/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <section>
        <section className={`landing py-5`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="landingHead">
                  <h5 className="py-2">
                    MIDDLE EAST’S FAVORITE EXPERTS MARKETPLACE
                  </h5>
                  <h2>
                    Start building your career,{" "}
                    <span>one client at a time</span>
                  </h2>
                  <h4 className="py-5">
                    Join a global talent pool of expert freelancers!
                  </h4>
                  <div className="imgContainer position-relative py-5">
                    <img
                      src="https://ureed.com/assets/images/profile_image_61837_1620171606893.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_photo_36649_1618851286919.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_image_22710_1620133397571.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_photo_42518_1620122514009.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_image_72222_1619951129229.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_photo_70543_1619746628205.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_image_71800_1619641206620.jpg"
                      alt=""
                    />
                  </div>

                  <div className="earning bg-dark text-light rounded p-3 my-5">
                    <p>Earning as...</p>
                    <div className="d-flex">
                      <div
                        style={{
                          width: "70%",
                          height: "40px",
                          display: "inline-flex",
                          background: `var(--lightBlue)`,
                          color: `var(--beige)`,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="rounded me-1"
                        type="text"
                      >
                        Full Stack Web Developer
                      </div>
                      <button className="btn btn-primary">Get Started</button>
                    </div>
                  </div>

                  <ul>
                    <li>Engage with the region’s most promising companies</li>
                    <li>
                      Minimize risk with management tools and automated
                      processes
                    </li>
                    <li>
                      Promote your practice and find relevant opportunities
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-6 coverImg d-flex"></div>
            </div>
          </div>
        </section>
        <section className="features py-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-12 col-4 ">
                <h2>Your desk, your rules.</h2>
                <p>
                  Learn how you can use Ureed.com as a launchpad for your
                  freelancing career
                </p>
              </div>
              <div className="col-12 col-md-6 col-4 "></div>
              <div className="col-12 col-md-6 col-4 "></div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
