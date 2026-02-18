"use client";

import { motion } from "motion/react";
import Image from "next/image";

const residents = [
  {
    name: "Pat Bradley",
    bio: "Pat Bradley is a technical, multi-genre DJ and promoter influenced early on by Southern California's club and festival culture, and more recently by Berlin's techno scene. Based in Bushwick since 2023, he's focused on carving out his own lane back on the East Coast.",
    images: [
      "/Pat_Bradley_Images/DSC03535.jpg",
      "/Pat_Bradley_Images/DSC03594.jpg",
      "/Pat_Bradley_Images/DSC03617.jpg",
    ],
  },
  {
    name: "Lucia",
    bio: "Based in Brooklyn, Lucia is a techno DJ focusing on hypnotic and groove driven sets. She uses her sets to highlight long transitions and gradual progression, allowing her sound to bring a consistent energy to the dance floor and keep the crowd entranced.",
    images: [
      "/Lucia_Images/DSC03511.jpg",
      "/Lucia_Images/DSC03603.jpg",
      "/Lucia_Images/DSC03586.jpg",
    ],
  },
  {
    name: "Hidden Order",
    bio: "Hidden Order blends influences from his native Berlin with the sounds of Brooklyn's underground scene. Building on a foundation of driving techno, he gradually weaves in ambient textures and subtle accents, creating a spacious, immersive environment.",
    images: [
      "/Hidden_Order_Images/DSC03601.jpg",
      "/Hidden_Order_Images/DSC03635.jpg",
      "/Hidden_Order_Images/DSC03514.jpg",
    ],
  },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function ResidentsPageClient() {
  return (
    <div className="bg-black">
      {/* Page intro */}
      <div className="relative flex h-screen flex-col justify-end px-8 pb-20 md:px-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-mono text-xs tracking-widest text-red-500 uppercase"
        >
          Analog Culture — Bushwick, NY
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="mt-3 font-light leading-none tracking-tight text-white"
          style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
        >
          Residents
        </motion.h1>
        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 right-8 flex items-center gap-3 md:right-20"
        >
          <span className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-4 w-px bg-zinc-600"
          />
        </motion.div>
      </div>

      {/* Thin red rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease }}
        style={{ transformOrigin: "left" }}
        className="h-px bg-red-900/50"
      />

      {/* Residents */}
      {residents.map((resident, index) => (
        <ResidentSection key={resident.name} resident={resident} index={index} />
      ))}
    </div>
  );
}

function ResidentSection({
  resident,
  index,
}: {
  resident: (typeof residents)[0];
  index: number;
}) {
  const flipLayout = index % 2 !== 0;
  const [heroSrc, portraitSrc, accentSrc] = resident.images;

  return (
    <article>
      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="relative h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <Image
            src={heroSrc!}
            fill
            alt={resident.name}
            className="object-cover object-center"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>

        {/* Dense bottom gradient so name always reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        {/* Subtle top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Name block */}
        <div className="absolute bottom-0 left-0 p-8 md:p-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="block font-mono text-xs tracking-widest text-red-500 uppercase"
          >
            Resident&nbsp;—&nbsp;{String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            viewport={{ once: true }}
            className="mt-2 font-light leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            {resident.name}
          </motion.h2>
        </div>
      </div>

      {/* ── Bio + portrait ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text */}
        <div
          className={`flex flex-col justify-center bg-zinc-950 px-8 py-16 md:px-16 md:py-28 ${
            flipLayout ? "md:order-2" : "md:order-1"
          }`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-mono text-xs tracking-widest text-red-500/60 uppercase"
          >
            Bio
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-6 max-w-prose text-lg leading-relaxed text-zinc-300 md:text-xl"
          >
            {resident.bio}
          </motion.p>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className={`relative min-h-96 overflow-hidden md:min-h-[600px] ${
            flipLayout ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={portraitSrc!}
            fill
            alt={`${resident.name} portrait`}
            className="object-cover object-top"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </motion.div>
      </div>

      {/* ── Accent image ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-60px" }}
        className="relative h-[58vh] overflow-hidden"
      >
        <Image
          src={accentSrc!}
          fill
          alt={`${resident.name} — photo`}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Divider before next resident */}
      {index < residents.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-red-900/30"
        />
      )}
    </article>
  );
}
