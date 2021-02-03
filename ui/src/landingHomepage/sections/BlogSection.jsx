import React from "react";

const BlogSection = () => {
  return (
    <section id="blog" class="blog-section pt-150">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-8 mx-auto">
            <div class="section-title text-center mb-55">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                Blog
              </span>
              <h2 class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                Most Recent Posts
              </h2>
              <p class="wow fadeInUp" data-wow-delay=".4s">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog mb-30 wow fadeInUp" data-wow-delay=".2s">
              <div class="blog-img mb-25">
                <a href="javascript:void(0)">
                  <img src="assets/img/blog/blog-1.png" alt="" />
                </a>
              </div>
              <div class="blog-meta mb-20">
                <div class="blog-author">
                  <img src="assets/img/blog/blog-author-1.png" alt="" />
                  <span>Tina Mark</span>
                </div>
                <div class="blog-comment">
                  <i class="lni lni-comments-alt"></i>
                  <span>2 Comments</span>
                </div>
              </div>
              <div class="blog-title">
                <h4>
                  <a href="javascript:void(0)">
                    How to get started with SoftLand and its benifits
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog mb-30 wow fadeInUp" data-wow-delay=".4s">
              <div class="blog-img mb-25">
                <a href="javascript:void(0)">
                  <img src="assets/img/blog/blog-2.png" alt="" />
                </a>
              </div>
              <div class="blog-meta mb-20">
                <div class="blog-author">
                  <img src="assets/img/blog/blog-author-2.png" alt="" />
                  <span>Sufia Jane</span>
                </div>
                <div class="blog-comment">
                  <i class="lni lni-comments-alt"></i>
                  <span>5 Comments</span>
                </div>
              </div>
              <div class="blog-title">
                <h4>
                  <a href="javascript:void(0)">
                    How to optimize your workflow with SoftLand
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog mb-30 wow fadeInUp" data-wow-delay=".6s">
              <div class="blog-img mb-25">
                <a href="javascript:void(0)">
                  <img src="assets/img/blog/blog-3.png" alt="" />
                </a>
              </div>
              <div class="blog-meta mb-20">
                <div class="blog-author">
                  <img src="assets/img/blog/blog-author-3.png" alt="" />
                  <span>John Doe</span>
                </div>
                <div class="blog-comment">
                  <i class="lni lni-comments-alt"></i>
                  <span>8 Comments</span>
                </div>
              </div>
              <div class="blog-title">
                <h4>
                  <a href="javascript:void(0)">
                    How to choose a perfect software for your business
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
