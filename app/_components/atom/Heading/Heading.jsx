"use client";
import React, { useState, useEffect } from "react";

const Heading = () => {
  const [heading, setHeading] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setTimeout(() => {
      setHeading("Updated Heading");
      setDescription("This is an updated description.");
    }, 2000);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="heading">
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Heading;
