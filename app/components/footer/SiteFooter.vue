<script setup lang="ts">
// Compact site footer; mobile-first, balanced columns on md+
import { VISIT_INFO } from '~/constants/visit'
import { FOOTER } from '~/constants/footer'
import LinkButton from '~/components/ui/LinkButton.vue'
import OpenStatus from '~/components/visit/OpenStatus.vue'
const info = VISIT_INFO

</script>

<template>
  <footer class="bg-black border-t border-white/10">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 py-12 md:py-14">
      <!-- top row: brand + address + call -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- brand block -->
        <div>
          <p class="text-white text-lg font-semibold">
            {{ FOOTER.brand.name }}
          </p>
          <p v-if="FOOTER.brand.tagline" class="text-white/70">
            {{ FOOTER.brand.tagline }}
          </p>

          <div v-if="FOOTER.todayOpenText" class="mt-3 text-sm text-white/70">
            <OpenStatus
                :hours="info.hours"
                :soon-threshold-min="45"
                class="mb-3"
              />
            <!-- {{ FOOTER.todayOpenText }} -->
          </div>

          <div class="mt-4 flex gap-3">
            <LinkButton size="sm" :href="FOOTER.phone.href" aria-label="Anrufen">
              Anrufen
            </LinkButton>
            <LinkButton
              size="sm"
              variant="outline"
              href="#visit"
              aria-label="Route öffnen"
            >
              Route
            </LinkButton>
          </div>
        </div>

        <!-- address -->
        <div>
          <p class="text-white/80">{{ FOOTER.address.line1 }}</p>
          <p class="text-white/80">{{ FOOTER.address.line2 }}</p>
          <a
            :href="FOOTER.phone.href"
            class="mt-2 inline-block text-white/80 hover:text-white"
            >{{ FOOTER.phone.label }}</a
          >
        </div>

        <!-- quick links -->
        <nav class="grid grid-cols-2 gap-6 md:gap-3">
          <div>
            <p class="text-white/70 text-sm font-medium">Schnellzugriff</p>
            <ul class="mt-2 space-y-1.5">
              <li v-for="l in FOOTER.links.quick" :key="l.label">
                <component
                  :is="l.external ? 'a' : 'NuxtLink'"
                  :href="l.href"
                  :to="l.external ? undefined : l.href"
                  :target="l.external ? '_blank' : undefined"
                  :rel="l.external ? 'noopener' : undefined"
                  class="text-white hover:text-gold transition-colors"
                >
                  {{ l.label }}
                </component>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-white/70 text-sm font-medium">Rechtliches</p>
            <ul class="mt-2 space-y-1.5">
              <li v-for="l in FOOTER.links.legal" :key="l.label">
                <NuxtLink :to="l.href" class="text-white hover:text-gold transition-colors">
                  {{ l.label }}
                </NuxtLink>
              </li>
            </ul>

            <div v-if="FOOTER.social?.length" class="mt-4">
              <p class="text-white/70 text-sm font-medium">Folgen</p>
              <ul class="mt-2 space-y-1.5">
                <li v-for="s in FOOTER.social" :key="s.href">
                  <a
                    :href="s.href"
                    target="_blank"
                    rel="noopener"
                    class="text-white hover:text-gold transition-colors"
                  >
                    {{ s.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <!-- bottom row: tiny print -->
      <div class="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p class="text-white/60 text-sm">
          © {{ new Date().getFullYear() }} {{ FOOTER.brand.name }}. Alle Rechte vorbehalten.
        </p>
        <p class="text-white/40 text-xs">
          Map data © Google. Fotos © Bar Seña.
        </p>
      </div>
    </div>
  </footer>
</template>
