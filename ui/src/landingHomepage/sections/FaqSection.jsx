import React from "react";

const FaqSection = () => {
  return (
    <section class="faq-section pt-150">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xl-6 col-lg-6">
            <div class="faq-img wow fadeInLeft" data-wow-delay=".5s">
              <img src="assets/img/faq/faq-img.svg" alt="" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="section-title mb-30">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                FAQ
              </span>
              <h2 class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                Frequently Asked Questions
              </h2>
              <p class="mb-50 wow fadeInUp" data-wow-delay=".6s">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                seddinonumy eirmod tempor invidunt ut labore.Smratseo is a brand
                of digital agency. Competen.
              </p>
            </div>
            <div class="process-faq">
              <div class="accordion" id="accordionExample3">
                <div class="faq-item mb-15 wow fadeInUp" data-wow-delay=".2s">
                  <div class="faq-header" id="faq-heading-7">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-7"
                      aria-expanded="true"
                      aria-controls="faq-7"
                    >
                      <span class="pt-0">Which license I need?</span>
                    </button>
                  </div>

                  <div
                    id="faq-7"
                    class="collapse show"
                    aria-labelledby="faq-heading-7"
                    data-parent="#accordionExample3"
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
                  <div class="faq-header" id="faq-heading-8">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-8"
                      aria-expanded="true"
                      aria-controls="faq-8"
                    >
                      <span class="pt-0">How do I get access?</span>
                    </button>
                  </div>

                  <div
                    id="faq-8"
                    class="collapse"
                    aria-labelledby="faq-heading-8"
                    data-parent="#accordionExample3"
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
                <div class="faq-item mb-15 wow fadeInUp" data-wow-delay=".6s">
                  <div class="faq-header" id="faq-heading-9">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-9"
                      aria-expanded="true"
                      aria-controls="faq-9"
                    >
                      <span class="pt-0">How do I see my data?</span>
                    </button>
                  </div>

                  <div
                    id="faq-9"
                    class="collapse"
                    aria-labelledby="faq-heading-9"
                    data-parent="#accordionExample3"
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
                <div class="faq-item wow fadeInUp" data-wow-delay=".8s">
                  <div class="faq-header" id="faq-heading-10">
                    <button
                      class="faq-btn collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#faq-10"
                      aria-expanded="true"
                      aria-controls="faq-10"
                    >
                      <span class="pt-0">Do you offer refunds?</span>
                    </button>
                  </div>

                  <div
                    id="faq-10"
                    class="collapse"
                    aria-labelledby="faq-heading-10"
                    data-parent="#accordionExample3"
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
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
