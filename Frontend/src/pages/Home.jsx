import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getAllServicesAction } from "../redux/action/services/ServicesAction";

// Components
import { Navbar } from "../assets/components/navbar/Navbar";
import { ServiceCard } from "../assets/components/card/ServiceCard";

// Image
import AboutUsImg from "../assets/img/imgAboutUs.jpg";
import HeroImg from "../assets/img/imagebg.jpg";

export const Home = () => {
  const dispatch = useDispatch();

  const serviceData = useSelector((state) => state.services.services);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllServicesAction());
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        class={`flex h-screen bg-cover bg-center text-white grayscale-[85%]`}
        style={{ backgroundImage: `url(${HeroImg})` }}
      >
        <h1 class="m-auto w-[50%] text-center text-6xl font-bold leading-relaxed">
          Your Dream Wedding Made Perfect
        </h1>
      </div>

      {/* About Us Section */}
      <div class="mx-auto flex w-[60%] flex-col gap-7 py-10">
        <div class="flex flex-col text-center">
          <h2 class="text-lg font-medium text-[#80B9AD]">- About Us -</h2>
          <h1 class="text-4xl font-bold">Who We Are</h1>
        </div>
        <div class="flex w-full items-center justify-between">
          <img src={AboutUsImg} alt="About Us" class="w-fit rounded-md" />
          <div class="flex w-[65%] flex-col gap-2">
            <h5 class="text-xl font-bold">The Essence of Wedding Organizers</h5>
            <p class="text-sm">
              A wedding organizer plays a crucial role in turning your dream
              wedding into a flawless reality. From meticulous planning to
              seamless execution, they ensure every detail, from venue selection
              to decor and scheduling, is tailored to perfection. Their
              expertise and dedication allow you to cherish every moment,
              knowing your special day is in capable hands. Trust a wedding
              organizer to transform your vision into an unforgettable
              celebration, leaving you free to savor every joyful moment with
              loved ones.
            </p>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div class="mx-auto flex h-full w-[60%] flex-col gap-7 py-10">
        <div class="flex flex-col text-center">
          <h2 class="text-lg font-medium text-[#80B9AD]">- Services -</h2>
          <h1 class="text-4xl font-bold">What We Offer</h1>
        </div>
        <div
          class={`${
            serviceData.length === 1 ? "flex justify-center" : "grid"
          }  grid-cols-2 gap-4`}
        >
          {serviceData?.map((service, index) => (
            <ServiceCard service={service} key={index} />
          ))}
        </div>
      </div>

      {/* Contact Us Section */}
      <div class="mx-auto flex min-h-full w-[60%] flex-col gap-7 py-10">
        <div class="flex flex-col text-center">
          <h2 class="text-lg font-medium text-[#80B9AD]">- Contact Us -</h2>
          <h1 class="text-4xl font-bold">Our Contact Information</h1>
        </div>
        <div class="flex h-full w-full flex-wrap justify-around">
          <div class="flex w-1/4 flex-col items-center justify-center gap-1 rounded-lg border bg-white p-4 text-center shadow-md">
            <img
              src="./image/location-icon.png"
              alt="Location Icon"
              class="h-10 w-10 object-cover"
            />
            <h5 class="text-lg font-bold">Our Location</h5>
            <p>123 Main Street, New York City, United States, 10001</p>
          </div>
          <div class="flex w-1/4 flex-col items-center justify-center gap-1 rounded-lg border bg-white p-4 text-center shadow-md">
            <img
              src="./image/phone-icon.png"
              alt="Phone Icon"
              class="h-10 w-10 object-cover"
            />
            <h5 class="text-lg font-bold">Phone Number</h5>
            <p>+62 8123 4567 890</p>
          </div>
          <div class="flex w-1/4 flex-col items-center justify-center gap-1 rounded-lg border bg-white p-4 text-center shadow-md">
            <img
              src="./image/email-icon.png"
              alt="Email Icon"
              class="h-10 w-10 object-cover"
            />
            <h5 class="text-lg font-bold">Email</h5>
            <p class="break-all">arfindwioctavianto@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};
