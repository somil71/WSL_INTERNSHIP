import React from "react";

const Hero = () => {
  const scrollToRestaurants = (e) => {
    e.preventDefault();
    document
      .getElementById("restaurants")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-eyebrow">OrderIt</span>
        <h1 className="hero-title">
          Great food, delivered to your door.
        </h1>
        <p className="hero-subtitle">
          Browse real menus from real restaurants, track your order end to
          end, and let AI help you decide what to eat next.
        </p>

        <div className="hero-actions">
          <a href="#restaurants" className="hero-cta" onClick={scrollToRestaurants}>
            Browse Restaurants
          </a>
          <a href="/recipe-generator" className="hero-cta hero-cta-secondary">
            Try the AI Recipe Generator
          </a>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <span className="hero-feature-icon">🍽️</span>
            <span>Real menus &amp; live pricing</span>
          </div>
          <div className="hero-feature">
            <span className="hero-feature-icon">🔒</span>
            <span>Secure checkout with Stripe</span>
          </div>
          <div className="hero-feature">
            <span className="hero-feature-icon">🤖</span>
            <span>AI-powered recommendations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
