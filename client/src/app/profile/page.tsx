"use client";

import ProfileCard from "@/components/cards/ProfileCard";
import { useGetProfile } from "@/hooks/profile";

const Page = () => {
  const { data: profile = {
    userId: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""

  }} =
          useGetProfile();

  return <ProfileCard profile={profile}/>

};

export default Page;
