import React from "react";

const TestimonialsSection = () => {
  return (
    <section class="testimonial-section pt-100 pb-100 gray-bg">
      <div class="container">
        <img
          src="assets/img/testimonial/testimonial-shape.svg"
          alt=""
          class="shape testimonial-shape"
        />
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-8 mx-auto">
            <div class="section-title text-center mb-55">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                Testimonials
              </span>
              <h2 class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                What Users Says
              </h2>
              <p class="wow fadeInUp" data-wow-delay=".6s">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore.
              </p>
            </div>
          </div>
        </div>
        <div class="testimonial-active-wrapper">
          <div class="row testimonial-active no-gutters">
            <div class="col-xl-6">
              <div class="single-testimonial">
                <div class="testimonial-info-wrapper">
                  <div class="testimonial-info">
                    <div class="testimonial-img">
                      <img
                        src="assets/img/testimonial/testimonial-1.png"
                        alt=""
                      />
                    </div>
                    <div class="testimonial-meta">
                      <h5>John Doe</h5>
                      <span>CEO of Company</span>
                    </div>
                  </div>
                  <div class="rating">
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                  </div>
                </div>
                <div class="testimonial-content">
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo.Lorem ipsum dolor sit amet, consetetur. oreipsum
                    dolor sit amet consetetur.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="single-testimonial">
                <div class="testimonial-info-wrapper">
                  <div class="testimonial-info">
                    <div class="testimonial-img">
                      <img
                        src="assets/img/testimonial/testimonial-2.png"
                        alt=""
                      />
                    </div>
                    <div class="testimonial-meta">
                      <h5>Adam Smith</h5>
                      <span>Head of Tesla</span>
                    </div>
                  </div>
                  <div class="rating">
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                    <i class="lni lni-star-filled"></i>
                  </div>
                </div>
                <div class="testimonial-content">
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo.Lorem ipsum dolor sit amet, consetetur. oreipsum
                    dolor sit amet consetetur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
