import { Metadata } from "next";

import MasterLayout from "@/components/master-layout";

const MEMBERS = [
  {
    name: "Visal .In",
    thumbnail: "https://avatars.githubusercontent.com/u/4539653?v=4",
    title: "Founder",
  },
  {
    name: "Rin Yato",
    thumbnail: "https://avatars.githubusercontent.com/u/106462074?v=4",
    title: "Lead Developer",
  },
  {
    name: "Ave Aristov",
    thumbnail: "https://avatars.githubusercontent.com/u/100404669?v=4",
    title: "Contributor & Moderator",
  },
  {
    name: "Kimthean",
    thumbnail: "https://avatars.githubusercontent.com/u/124693005?v=4",
    title: "Contributor & Moderator",
  },
  {
    name: "Sliden",
    thumbnail: "https://avatars.githubusercontent.com/u/57210425?v=4",
    title: "Contributor & Moderator",
  },
];

export const metadata: Metadata = {
  title: "About us - KhmerCoders",
  keywords:
    "KhmerCoders, Visal .In, October 2016, Facebook group, computer programming, knowledge exchange, networking, tech discussions, Cambodian programmer community, 7500+ members, largest community in Cambodia.",
  description:
    "KhmerCoders, Visal .In, October 2016, Facebook group, computer programming, knowledge exchange, networking, tech discussions, Cambodian programmer community, 7500+ members, largest community in Cambodia.",
};

export default function AboutPage() {
  return (
    <MasterLayout>
      <div className="container mx-auto py-12">
        <h1 className="mb-4 text-4xl font-bold">Who we are?</h1>
        <p>
          KhmerCoders was established by Visal .In in October 2016. Initially,
          it began as a Facebook group bringing together individuals interested
          in computer programming. Within the group, members actively exchange
          knowledge, network with one another, and engage in friendly
          discussions regarding the latest technological advancements.
          Presently, KhmerCoders boasts a membership of over 7500 individuals.
        </p>

        <h1 className="mb-4 mt-8 text-2xl font-bold">Teams</h1>

        <div className="grid-col-1 my-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((member) => {
            return (
              <div key={member.name} className="flex gap-4">
                <img
                  src={member.thumbnail}
                  alt={member.name}
                  className="size-16 rounded-full"
                />

                <div className="flex flex-col justify-center">
                  <div className="font-bold">{member.name}</div>
                  <div>{member.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MasterLayout>
  );
}
