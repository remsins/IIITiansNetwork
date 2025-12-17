import React, { useState } from "react";
import MiniTeamCard from "../ui/MiniTeamCard";
import Index3 from "../sub-pages/index3";

const Team = () => {
  const [year, setYear] = useState("2025-26");

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HERO HEADER ================= */}
        <div className="pt-24 pb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            Our Team
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The people driving collaboration, leadership, and innovation across IIITs.
          </p>

          <div className="mt-8 flex justify-center">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2025-26">2025–26 (Current)</option>
              <option value="2024-25">2024–25</option>
              <option value="2023-24">2023–24</option>
            </select>
          </div>
        </div>

        {/* ================= VISION + MISSION ================= */}
        <div className="grid md:grid-cols-2 gap-14 pb-24">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To build a unified and empowered student community across all Indian
              Institutes of Information Technology, fostering collaboration,
              leadership, and innovation beyond institutional boundaries.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Strengthen collaboration among IIIT students nationwide</li>
              <li>Create platforms for leadership, innovation, and outreach</li>
              <li>Bridge students, alumni, and industry</li>
              <li>Represent IIITs collectively at a national level</li>
            </ul>
          </div>
        </div>

        {/* ================= FOUNDER SPOTLIGHT ================= */}
        <div className="bg-gray-50 rounded-3xl p-10 mb-28">
          <h2 className="text-2xl font-bold mb-8 text-center">Founder</h2>

          <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
            <img
              src="/team/dummypfp.png"
              alt="Founder"
              className="w-32 h-32 rounded-2xl object-cover border"
            />

            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">Founder Name</h3>
              <p className="text-sm text-gray-500 mb-3">
                Founder, IIITians Network
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded the IIITians Network with the vision of connecting all
                IIIT students under one collaborative ecosystem that promotes
                leadership, innovation, and collective growth.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CORE TEAM ================= */}
        <div className="mb-28">
          <h2 className="text-3xl font-bold text-center mb-14">
            Core Team {year}
          </h2>

          {/* reuse Index3 cleanly */}
          <Index3 showViewMore={false} />
        </div>

        {/* ================= TEAM MEMBERS ================= */}
        <div className="pb-32">
          <h2 className="text-3xl font-bold text-center mb-14">
            Team Members
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <MiniTeamCard name="Gauransh Sattavan" team="Social Media" college="IIIT Kota" image="/team/gauransh.jpg" />
            <MiniTeamCard name="Subhojit" team="Design" college="IIIT Bhopal" image="/team/vibhu.JPG" />
            <MiniTeamCard name="Shikhar" team="Social Media" college="IIIT Kota" image="/team/shikhar.jpg" />
            <MiniTeamCard name="Aman Gupta" team="Content" college="IIIT Kota" image="/team/dummypfp.png" />
            <MiniTeamCard name="Neha Sharma" team="Design" college="IIIT Gwalior" image="/team/dummypfp.png" />
            <MiniTeamCard name="Rahul Verma" team="Tech" college="IIIT Guwahati" image="/team/dummypfp.png" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;
