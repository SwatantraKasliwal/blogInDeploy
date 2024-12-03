import React from "react";

function AboutUS() {
  const date = new Date().getFullYear();

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to
        <b>
          <i> BlogIn </i>
        </b>
        We are passionate storytellers, curious explorers, and dedicated to
        bringing you the best content. Our mission is to inspire, educate, and
        entertain our readers with high-quality articles, insightful opinions
        etc. At
        <b>
          <i> BlogIn </i>
        </b>
        , we believe in the power of words and the impact they can have on the
        world. Whether you’re here to learn something new, get a fresh
        perspective, or simply enjoy a good read, we have something for
        everyone. Our team of talented writers and contributors work tirelessly
        to provide content that resonates with you and enriches your knowledge
        and experience.
      </p>
      <h3>Our Vision</h3>
      <p>
        To create a community where knowledge, creativity, and passion come
        together, fostering a culture of learning and growth. We aim to be your
        go-to source for reliable, well-researched, and captivating content.
      </p>
      <h3>Our Values</h3>
      <ul>
        <li>
          Integrity: We stand by the truth and ensure our content is accurate
          and trustworthy.
        </li>

        <li>
          Creativity: We encourage innovative ideas and unique perspectives.
        </li>

        <li>
          Respect: We value our readers and respect their views, ensuring an
          inclusive and welcoming environment.
        </li>

        <li>
          Excellence: We strive for excellence in everything we do, from our
          writing to our user experience.
        </li>
      </ul>
      <p>
        Join Our Community We invite you to join our community by subscribing to
        our newsletter, following us on social media, and engaging with our
        content. Your feedback and participation are vital to us, and we look
        forward to connecting with you!
      </p>
      <p>
        <b>Copyright Notice © BlogIn</b>,{date}. All rights reserved. All
        content provided on this blog, including text, images, videos, and other
        materials, is protected under international copyright laws. Unauthorized
        use and/or duplication of this material without express and written
        permission from the blog’s author and/or owner is strictly prohibited.
        You may use excerpts and links, provided that full and clear credit is
        given to{" "}
        <b>
          <i>BlogIn</i>
        </b>{" "}
        with appropriate and specific direction to the original content.
        Disclaimer The views and opinions expressed on this blog are those of
        the individual authors and do not necessarily reflect the official
        policy or position of any other agency, organization, employer, or
        company. All content provided on this blog is for informational purposes
        only. The owner of this blog makes no representations as to the accuracy
        or completeness of any information on this site or found by following
        any link on this site.
      </p>
    </div>
  );
}

export default AboutUS;
