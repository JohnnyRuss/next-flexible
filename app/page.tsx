import React from "react";

interface HomeType {}

const Home: React.FC<HomeType> = (props) => {
  return (
    <section className="flexStart flex-col paddings mb-16">
      <h1>page</h1>
      <h1>posts</h1>
      <h1>load more</h1>
    </section>
  );
};

export default Home;
