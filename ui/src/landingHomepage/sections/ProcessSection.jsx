import React from "react";

const ProcessSection = () => {
  return (
    <section id="process" class="process-section pt-150 mb-150">
      <img
        src="assets/img/process/process-shape.png"
        alt=""
        class="shape process-shape"
      />
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12">
            <div class="section-title mb-30">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                Easy to Use
              </span>
              <h2 class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                Project Management System
              </h2>
              <p class="mb-50 wow fadeInUp" data-wow-delay=".6s">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                seddinonumy eirmod tempor invidunt ut labore.Smratseo is a brand
                of digital agency. Competen.
              </p>
            </div>
            <div class="process-faq">
              <div class="accordion" id="accordionExample2">
                <div class="faq-item mb-15 wow fadeInUp" data-wow-delay=".2s">
                  <div class="faq-header" id="faq-heading-4">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-4"
                      aria-expanded="true"
                      aria-controls="faq-4"
                    >
                      <i class="lni lni-cogs gradient-1"></i>{" "}
                      <span>Fully Automated</span>
                    </button>
                  </div>

                  <div
                    id="faq-4"
                    class="collapse"
                    aria-labelledby="faq-heading-4"
                    data-parent="#accordionExample2"
                  >
                    <div class="faq-body">
                      <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        seddinonumy eirmod tempor invidunt ut labore.Smratseo is
                        a brand of digital agency.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="faq-item mb-15 wow fadeInUp" data-wow-delay=".4s">
                  <div class="faq-header" id="faq-heading-5">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-5"
                      aria-expanded="true"
                      aria-controls="faq-5"
                    >
                      <i class="lni lni-alarm-clock gradient-2"></i>{" "}
                      <span>Saves Time</span>
                    </button>
                  </div>

                  <div
                    id="faq-5"
                    class="collapse"
                    aria-labelledby="faq-heading-5"
                    data-parent="#accordionExample2"
                  >
                    <div class="faq-body">
                      <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        seddinonumy eirmod tempor invidunt ut labore.Smratseo is
                        a brand of digital agency.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="faq-item wow fadeInUp" data-wow-delay=".6s">
                  <div class="faq-header" id="faq-heading-6">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-6"
                      aria-expanded="true"
                      aria-controls="faq-6"
                    >
                      <i class="lni lni-layers gradient-3"></i>{" "}
                      <span>Highly Scalable</span>
                    </button>
                  </div>

                  <div
                    id="faq-6"
                    class="collapse"
                    aria-labelledby="faq-heading-6"
                    data-parent="#accordionExample2"
                  >
                    <div class="faq-body">
                      <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        seddinonumy eirmod tempor invidunt ut labore.Smratseo is
                        a brand of digital agency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="process-img wow fadeInRight" data-wow-delay=".5s">
              <img src="assets/img/process/process-img.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
