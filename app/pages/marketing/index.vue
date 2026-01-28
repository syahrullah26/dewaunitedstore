<script setup lang="ts">
useSeoMeta({
  title: "Marketing Dewa United",
  description:
    "Dewa United offers comprehensive marketing solutions designed to elevate your brand and drive measurable results.",
});
const solutions = [
  {
    title: "Brand Partnership",
    desc: "Strategic collaborations that strengthen brand positioning and long-term value.",
  },
  {
    title: "Digital Campaign",
    desc: "Integrated digital campaigns across social, media, and digital platforms.",
  },
  {
    title: "Content & Media Exposure",
    desc: "High-quality content distribution to amplify brand messages effectively.",
  },
  {
    title: "Community Activation",
    desc: "Engaging loyal communities through meaningful brand experiences.",
  },
  {
    title: "Event & Experiential Marketing",
    desc: "On-ground and virtual activations that deliver immersive brand impact.",
  },
  {
    title: "Retail & Merchandise Activation",
    desc: "Brand exposure through merchandise, retail, and physical touchpoints.",
  },
];
</script>

<template>
  <!-- ================= HERO ================= -->
  <section class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="/du-universal.png"
        class="w-full h-full object-cover opacity-20"
        alt="Dewa United Background"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"
      />
    </div>
    <div
      class="absolute inset-0 md:flex items-end justify-end pr-20 fan-wrapper"
    >
      <img
        src="/du-universal.png"
        data-aos="fade"
        class="global-image fan-center fan-mobile rounded-xl"
      />
    </div>

    <div
      class="relative z-10 min-h-screen flex items-center px-6 sm:px-10 md:px-20"
    >
      <div
        data-aos="fade-up"
        class="max-w-xl backdrop-blur-md bg-white/10 p-10 rounded-3xl border border-white/10"
      >
        <span
          class="inline-block mb-4 px-5 py-2 rounded-full border border-[var(--gold-main)]/40 text-[var(--gold-main)] text-xs tracking-widest"
        >
          OFFICIAL MARKETING
        </span>

        <h1 class="text-4xl md:text-6xl font-bold leading-tight">
          What Can We Build
          <span class="text-[var(--gold-main)]">Together</span>?
        </h1>

        <p class="mt-6 text-neutral-200">
          Dewa United offers comprehensive marketing solutions designed to
          elevate your brand and drive measurable results.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row gap-4">
          <!-- PRIMARY CTA -->
          <a href="#contact" class="btn-gold text-center">
            Get Marketing Proposal
          </a>

          <!-- SCROLL CTA -->
          <a href="#solutions" class="btn-outline text-center">
            View Our Solutions
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= TRUST ================= -->
  <section class="bg-black py-24 px-6 sm:px-10 md:px-20 text-center">
    <h2 class="text-3xl md:text-4xl font-bold" data-aos="fade-right">
      Trusted by Brands & Partners
    </h2>
    <p class="mt-4 text-neutral-400 max-w-2xl mx-auto" data-aos="fade-left">
      We collaborate with brands, partners, and communities to deliver impactful
      marketing campaigns.
    </p>

    <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-60">
      <div
        class="h-16 bg-white/10 rounded-xl"
        data-aos="fade-up"
        data-aos-delay="500"
      />
      <div
        class="h-16 bg-white/10 rounded-xl"
        data-aos="fade-up"
        data-aos-delay="600"
      />
      <div
        class="h-16 bg-white/10 rounded-xl"
        data-aos="fade-up"
        data-aos-delay="700"
      />
      <div
        class="h-16 bg-white/10 rounded-xl"
        data-aos="fade-up"
        data-aos-delay="800"
      />
    </div>
  </section>

  <!-- ================= SOLUTIONS ================= -->
  <section
    id="solutions"
    class="scroll-mt-24 bg-black py-24 px-6 sm:px-10 md:px-20"
  >
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold" data-aos="fade-left" data-aos-delay="300">
        Integrated Marketing Solutions
      </h2>
      <p class="mt-4 text-neutral-400 max-w-2xl mx-auto" data-aos="fade-right" data-aos-delay="500">
        A full spectrum of strategic marketing solutions to support your brand’s
        growth.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="item,index in solutions"
        :key="item.title"
        data-aos="fade-up"
        :data-aos-delay="index*200"
        class="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--gold-main)]/40 transition"
      >
        <h3 class="text-xl font-semibold mb-3">
          {{ item.title }}
        </h3>
        <p class="text-neutral-400 text-sm">
          {{ item.desc }}
        </p>
      </div>
    </div>
  </section>

  <!-- ================= WHY US ================= -->
  <section
    class="bg-gradient-to-b from-black to-neutral-900 py-24 px-6 sm:px-10 md:px-20"
  >
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold" data-aos="fade-up" data-aos-delay="300">
          Why Brands Choose Dewa United
        </h2>
        <p class="mt-4 text-neutral-400" data-aos="fade-up" data-aos-delay="500">
          We combine strategic thinking, strong brand assets, and professional
          execution.
        </p>
      </div>

      <ul class="space-y-4 text-neutral-200" data-aos="fade-up" data-aos-delay="700">
        <li class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--gold-main)]" />
          Strong National Brand Presence
        </li>
        <li class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--gold-main)]" />
          Engaged & Loyal Community
        </li>
        <li class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--gold-main)]" />
          Integrated Online & Offline Exposure
        </li>
        <li class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--gold-main)]" />
          Proven Marketing Execution
        </li>
        <li class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--gold-main)]" />
          Trusted & Transparent Partnership
        </li>
      </ul>
    </div>
  </section>
  <!-- ================= CONTACT ================= -->
  <section
    id="contact"
    class="bg-gradient-to-b from-black to-zinc-950 py-28 px-6 sm:px-10 md:px-20"
  >
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <span class="badge-gold" data-aos="fade-up">CONTACT US</span>

        <h2 class="mt-6 text-3xl md:text-4xl font-bold" data-aos="fade-left" data-aos-delay="300">
          Let’s Build Something Powerful Together
        </h2>

        <p class="mt-4 text-neutral-400 max-w-2xl mx-auto font-default" data-aos="fade-right" data-aos-delay="500">
          Reach out to our marketing team to explore partnership opportunities,
          campaign collaboration, and strategic solutions.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- EMAIL -->
        <div class="card-gold flex flex-col items-center text-center gap-4" data-aos="fade-up" data-aos-delay="700">
          <div
            class="w-14 h-14 rounded-full bg-[rgba(225,182,98,0.15)] flex items-center justify-center"
          >
            ✉️
          </div>

          <h3 class="text-xl font-semibold">Email Us</h3>

          <p class="text-neutral-400 font-default">
            For inquiries, proposals, and partnerships
          </p>

          <a
            href="mailto:marketing@dewaunited.com"
            class="text-[var(--gold-main)] font-default hover:underline"
          >
            marketing@dewaunited.com
          </a>
        </div>

        <!-- PHONE -->
        <div class="card-gold flex flex-col items-center text-center gap-4" data-aos="fade-up" data-aos-delay="900">
          <div
            class="w-14 h-14 rounded-full bg-[rgba(225,182,98,0.15)] flex items-center justify-center"
          >
            📞
          </div>

          <h3 class="text-xl font-semibold">Call Us</h3>

          <p class="text-neutral-400 font-default">
            Speak directly with our marketing representative
          </p>

          <a
            href="tel:+6281234567890"
            class="text-[var(--gold-main)] font-default hover:underline"
          >
            +62 812-xxx-xxxx
          </a>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center">
        <NuxtLink to="mailto:marketing@dewaunited.com" class="btn-gold">
          Request Marketing Proposal
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
