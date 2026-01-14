
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue"

type Chapter =
  | {
      id: string
      kicker: string
      title: string
      body: string
      scrollSpace: number
      kind: "video"
      srcMp4: string
      srcWebm?: string
    }
  | {
      id: string
      kicker: string
      title: string
      body: string
      scrollSpace: number
      kind: "image"
      img: string
    }

const chapters: Chapter[] = [
  {
    id: "N01",
    kicker: "Chapter 01",
    title: "Whatta scenen (video)",
    body: "Testvideo bakom. Nästa kapitel tar över med mjuk fade.",
    kind: "image",
    img: '/images/food/sallad.avif',
    // srcWebm: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    scrollSpace: 160,
  },
  {
    id: "N01",
    kicker: "Chapter 01",
    title: "Första scenen (video)",
    body: "Testvideo bakom. Nästa kapitel tar över med mjuk fade.",
    kind: "video",
    srcMp4: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    // srcWebm: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    scrollSpace: 160,
  },
  {
    id: "N02",
    kicker: "Chapter 02",
    title: "Andra scenen",
    body: "Bildbakgrund. Byter när mittlinjen passerar triggern.",
    kind: "image",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2400&q=80",
    scrollSpace: 160,
  },
  {
    id: "N03",
    kicker: "Chapter 03",
    title: "Tredje scenen",
    body: "Justera scrollSpace för tempo.",
    kind: "image",
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2400&q=80",
    scrollSpace: 160,
  },
]

const activeIndex = ref(0)

// Vue fyller denna med alla <div ref="sentinels">
const sentinels = ref<HTMLDivElement[]>([])

let io: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()

  io = new IntersectionObserver(
    (entries) => {
      const hit = entries
        .filter((e) => e.isIntersecting)
        .map((e) => Number((e.target as HTMLElement).dataset.index))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b)
        .at(-1)

      if (hit !== undefined) activeIndex.value = hit
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-50% 0px -50% 0px",
    }
  )

  for (const el of sentinels.value) io.observe(el)
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>
<template>
  <main class="bg-neutral-950 text-white">
      
    <!-- Sektion 1 -->
	<section class="h-[200vh]">
			<!-- <div class="sticky top-0 h-screen flex items-center justify-center bg-indigo-600">-->
  		<div class="sticky top-0 h-screen overflow-hidden">
		    <!-- Videobakgrund -->
		    <video
		      class="absolute inset-0 h-full w-full object-cover"
		      autoplay
		      muted
		      loop
		      playsinline
		      preload="auto"
		    >
		      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
		      <!-- fallback-text om video inte kan spelas -->
		      Din webbläsare stödjer inte video.
		    </video>
		    <!-- Mörk overlay för läsbarhet -->
		    <div class="absolute inset-0 bg-black/40"></div>
		    <!-- Mörk overlay för läsbarhet -->
		    <!-- Innehåll ovanpå -->
		    <div class="relative z-10 h-full flex items-center justify-center">
		      <h1 class="text-5xl font-bold">Sektion 1 (video)</h1>
		    </div>

		</div>
	</section>
    <!-- Sektion 2 -->
    <section class="h-[200vh]">
      <div class="sticky top-0 h-screen flex items-center justify-center bg-emerald-600">
        <h1 class="text-5xl font-bold">Sektion 2 (sticky)</h1>
      </div>
    </section>

    <!-- Sektion 3 -->
    <section class="h-[200vh]">
      <div class="sticky top-0 h-screen flex items-center justify-center bg-rose-600">
        <h1 class="text-5xl font-bold">Sektion 3 (sticky)</h1>
      </div>
    </section>

<!-- Slide 2 -->
<section class="relative h-[220vh] bg-emerald-600">
  <!-- Panelen/“bakgrunden” som står still -->
  <div class="sticky top-0 h-screen bg-zinc-200/60 py-2">
    <!-- Innehåll i panelen -->
    <div class="relative h-full">
      <!-- Titeln: sticky med top-offset => börjar "hänga kvar" efter en bit scroll -->
      <h2 class="sticky top-14 px-10 pt-10 text-5xl font-bold">
        Slide 2 – titel
      </h2>
      <!-- Lite extra text så man ser rörelsen -->
      <p class="mt-[40vh] px-10 text-xl">
        Scrolla… efter ett tag börjar titeln bete sig som “fast” och sedan när
        sektionen tar slut rör den sig uppåt och försvinner.
      </p>
    </div>
  </div>
</section>
<div
        v-for="(chapter, i) in chapters"
        :key="chapter.id"
        class="relative"
        :style="`height:${chapter.scrollSpace}vh;`"
	>
	    <template v-if="chapter.kind === 'video'">
	      <video
		class="absolute inset-0 h-full w-full object-cover"
		autoplay
		muted
		loop
		playsinline
		preload="metadata"
	      >
		<source :src="chapter.srcMp4" type="video/mp4" />
		<source v-if="chapter.srcWebm" :src="chapter.srcWebm" type="video/webm" />
	      </video>
	      <div class="absolute inset-0 bg-gradient-to-b from-black/25 to-black/75" />
	    </template>

	    <template v-else>
	      <div
		class="absolute inset-0 bg-cover bg-center"
		:style="`background-image: linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.75)), url('${chapter.img}');`"
	      />
	    </template>

	</div>

</main>
</template>
