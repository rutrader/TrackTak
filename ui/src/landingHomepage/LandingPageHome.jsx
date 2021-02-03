import React from "react";
import SpinnerHome from "../landingHomepage/SpinnerHome";
import BlogSection from "./sections/BlogSection";
import FaqSection from "./sections/FaqSection";
import FeaturesSection from "./sections/FeaturesSection";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome";
import ProcessSection from "./sections/ProcessSection";
import SubscribeSection from "./sections/SubscribeSection";
import TeamSection from "./sections/TeamSection";
import TestimonialsSection from "./sections/TestimonialsSection";

const LandingPageHome = () => {
  return (
    <>
      <SpinnerHome />
      <HeaderHome />
      <section
        id="home"
        class="hero-section img-bg"
        style={{ backgroundImage: "url(assets/img/hero/hero-bg.svg)" }}
      >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-7 col-lg-6">
              <div class="hero-content-wrapper">
                <h1
                  class="wow fadeInDown"
                  data-wow-delay=".4s"
                  data-wow-duration="1.3s"
                >
                  Hello, automated Discounted Cash Flows.
                </h1>
                <p
                  class="wow fadeInLeft"
                  data-wow-delay=".6s"
                  data-wow-duration="1.3s"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore.
                </p>
                <a
                  href="#features"
                  class="theme-btn wow fadeInUp"
                  data-wow-delay=".8s"
                  data-wow-duration="1.3s"
                >
                  Explore Features
                </a>
              </div>
            </div>
            <div class="col-xl-5 col-lg-6">
              <div class="hero-img">
                <img
                  class="wow fadeInRight"
                  data-wow-delay=".4s"
                  data-wow-duration="1.3s"
                  src="assets/img/hero/hero-img.png"
                  alt=""
                />
                <img
                  src="assets/img/hero/hero-shape.svg"
                  alt=""
                  class="shape"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <ProcessSection />
      <TeamSection />
      <TestimonialsSection />
      <FaqSection />
      <BlogSection />
      <SubscribeSection />
      <Footer />
      <a href="#" class="scroll-top">
        <i class="lni lni-chevron-up"></i>
      </a>
    </>
  );
};

export default LandingPageHome;
