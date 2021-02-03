import React from "react";

const TeamSection = () => {
  return (
    <section id="team" class="team-section pt-150 pb-120">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-8 mx-auto">
            <div class="section-title text-center mb-55">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                Our Team
              </span>
              <h2 class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                Meet Our Expert
              </h2>
              <p class="wow fadeInUp" data-wow-delay=".6s">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-sm-6">
            <div class="single-team mb-30 wow fadeInUp" data-wow-delay=".2s">
              <div class="team-img mb-20">
                <img src="assets/img/team/team-1.jpg" alt="" />
              </div>
              <div class="team-info">
                <h4>Kristina</h4>
                <span>Founder & Software Engineer</span>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-sm-6">
            <div class="single-team mb-30 wow fadeInUp" data-wow-delay=".8s">
              <div class="team-img mb-20">
                <img src="assets/img/team/team-4.jpg" alt="" />
              </div>
              <div class="team-info">
                <h4>Martin</h4>
                <span>Founder & Software Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
