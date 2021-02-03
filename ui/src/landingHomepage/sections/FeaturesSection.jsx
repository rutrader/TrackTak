import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features" class="service-section gray-bg pt-150 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-8 mx-auto">
            <div class="section-title text-center mb-55">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                Our Core
              </span>
              <h2 class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                Features
              </h2>
              <p class="wow fadeInUp" data-wow-delay=".6s">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div
              class="single-service text-center mb-30 wow fadeInUp"
              data-wow-delay=".2s"
              data-wow-duration="1.3s"
            >
              <div class="service-icon icon-gradient gradient-1 mb-30">
                <i class="lni lni-money-protection"></i>
              </div>
              <h4 class="mb-15">Simple Pricing</h4>
              <p>
                Lorem ipsum dolor sit consetetu sadipscing elitr, sed dia nonum
                eirmod tempor.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div
              class="single-service text-center mb-30 wow fadeInUp"
              data-wow-delay=".4s"
              data-wow-duration="1.3s"
            >
              <div class="service-icon icon-gradient gradient-2 mb-30">
                <i class="lni lni-ux"></i>
              </div>
              <h4 class="mb-15">Effecient Workflow</h4>
              <p>
                Lorem ipsum dolor sit consetetu sadipscing elitr, sed dia nonum
                eirmod tempor.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div
              class="single-service text-center mb-30 wow fadeInUp"
              data-wow-delay=".6s"
              data-wow-duration="1.3s"
            >
              <div class="service-icon icon-gradient gradient-3 mb-30">
                <i class="lni lni-users"></i>
              </div>
              <h4 class="mb-15">Built-in CRM</h4>
              <p>
                Lorem ipsum dolor sit consetetu sadipscing elitr, sed dia nonum
                eirmod tempor.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div
              class="single-service text-center mb-30 wow fadeInUp"
              data-wow-delay=".8s"
              data-wow-duration="1.3s"
            >
              <div class="service-icon icon-gradient  gradient-4 mb-30">
                <i class="lni lni-reload"></i>
              </div>
              <h4 class="mb-15">Regular Updates</h4>
              <p>
                Lorem ipsum dolor sit consetetu sadipscing elitr, sed dia nonum
                eirmod tempor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
