import React from "react";

const SubscribeSection = () => {
  return (
    <section id="subscribe" class="subscribe-section gray-bg pt-100">
      <div class="container">
        <div class="subscribe-wrapper pt-70 pb-70">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="row">
            <div class="col-xl-6 col-lg-8 col-md-10 mx-auto">
              <div class="section-title text-center mb-30">
                <span class="text-white wow fadeInDown" data-wow-delay=".2s">
                  Newsletter
                </span>
                <h2
                  class="text-white mb-15 wow fadeInLeft"
                  data-wow-delay=".4s"
                >
                  Subscribe Our Newsletter
                </h2>
                <p class="text-white wow fadeInLeUp" data-wow-delay=".6s">
                  Sign up today to get exclusive access to the premium and 50%
                  off for life.
                </p>
              </div>
            </div>
            <div class="col-xl-8 col-lg-10 mx-auto">
              <form
                action="#"
                class="subscribe-form wow fadeInUp"
                data-wow-delay=".8s"
              >
                <input
                  type="email"
                  name="subs-input"
                  id="subs-input"
                  placeholder="Enter your email"
                />
                <button type="submit" class="theme-btn">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
