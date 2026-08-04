<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
})

const submitted = ref(false)

function submitForm() {
  // Simulate submission
  gsap.to('.contact-form', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', onComplete: () => {
    submitted.value = true
    gsap.from('.success-msg', { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.5)' })
  }})
}

onMounted(() => {
  gsap.from('.contact-hero', { opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.2 })
  gsap.from('.contact-form', { opacity: 0, x: 60, duration: 1, ease: 'power3.out', delay: 0.4 })
  gsap.from('.contact-info', { opacity: 0, x: -40, duration: 1, ease: 'power3.out', delay: 0.5 })
})
</script>

<template>
  <div style="background-color: #0B1312; color: #E5E7EB; padding-top: 80px; min-height: 100vh;">

    <!-- Hero -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1400&q=80"
          alt="" class="w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0" style="background: rgba(11,19,18,0.92);"></div>
      </div>
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 30% 50%, rgba(0,191,166,0.1) 0%, transparent 50%);"></div>

      <div class="contact-hero relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-8" style="background: #00BFA6;"></div>
          <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">Get In Touch</span>
          <div class="h-px w-8" style="background: #00BFA6;"></div>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
          Let's Build<br /><span style="color: #00BFA6;">Something</span><br />Great Together
        </h1>
        <p class="text-lg" style="color: rgba(229,231,235,0.55);">
          Tell us about your project and we'll respond within 24 hours.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-16">

        <!-- Left: Info -->
        <div class="contact-info lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 class="text-2xl font-bold mb-4">Let's Talk</h2>
            <p class="text-base leading-relaxed" style="color: rgba(229,231,235,0.5);">
              Whether you have a complex enterprise project or a simple question, we're here to help. Reach out through any of these channels.
            </p>
          </div>

          <!-- Contact details -->
          <div class="flex flex-col gap-5">
            <a href="mailto:hello@digivora.id"
              class="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300 hover:bg-[rgba(0,191,166,0.06)]"
              style="border: 1px solid rgba(0,191,166,0.15);">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(0,191,166,0.1);">
                <Mail :size="18" style="color: #00BFA6;" />
              </div>
              <div>
                <div class="text-xs tracking-wider mb-1" style="color: rgba(0,191,166,0.6);">Email</div>
                <div class="text-sm font-semibold group-hover:text-[#00BFA6] transition-colors">hello@digivora.id</div>
              </div>
            </a>

            <div class="flex items-center gap-4 p-4 rounded-xl" style="border: 1px solid rgba(0,191,166,0.15);">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(0,191,166,0.1);">
                <MapPin :size="18" style="color: #00BFA6;" />
              </div>
              <div>
                <div class="text-xs tracking-wider mb-1" style="color: rgba(0,191,166,0.6);">Location</div>
                <div class="text-sm font-semibold">Indonesia — Remote Worldwide</div>
              </div>
            </div>

            <div class="flex items-center gap-4 p-4 rounded-xl" style="border: 1px solid rgba(0,191,166,0.15);">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(0,191,166,0.1);">
                <Phone :size="18" style="color: #00BFA6;" />
              </div>
              <div>
                <div class="text-xs tracking-wider mb-1" style="color: rgba(0,191,166,0.6);">Response Time</div>
                <div class="text-sm font-semibold">Within 24 Hours</div>
              </div>
            </div>
          </div>

          <!-- Visual -->
          <div class="relative rounded-2xl overflow-hidden" style="border: 1px solid rgba(0,191,166,0.15);">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
              alt="Team collaboration" class="w-full h-48 object-cover" loading="lazy" />
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(11,19,18,0.7), transparent);"></div>
            <div class="absolute bottom-4 left-4">
              <div class="text-sm font-semibold">Our Team</div>
              <div class="text-xs" style="color: rgba(0,191,166,0.7);">Always ready to help</div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact-form lg:col-span-3">
          <div v-if="!submitted" class="rounded-2xl p-8 md:p-10" style="background: rgba(17,32,31,0.8); border: 1px solid rgba(0,191,166,0.15); backdrop-filter: blur(12px);">
            <h3 class="text-xl font-semibold mb-8">Tell Us About Your Project</h3>
            <form @submit.prevent="submitForm" class="flex flex-col gap-5">
              <!-- Name + Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="relative">
                  <label class="block text-xs font-semibold tracking-wider mb-2" style="color: rgba(0,191,166,0.7);">Full Name *</label>
                  <input v-model="form.name" type="text" required placeholder="John Doe"
                    class="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 focus:ring-1"
                    style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB; --tw-ring-color: #00BFA6;"
                    :style="{ borderColor: form.name ? 'rgba(0,191,166,0.5)' : 'rgba(0,191,166,0.2)' }"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold tracking-wider mb-2" style="color: rgba(0,191,166,0.7);">Email *</label>
                  <input v-model="form.email" type="email" required placeholder="you@company.com"
                    class="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300"
                    style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB;"
                    :style="{ borderColor: form.email ? 'rgba(0,191,166,0.5)' : 'rgba(0,191,166,0.2)' }"
                  />
                </div>
              </div>

              <!-- Company -->
              <div>
                <label class="block text-xs font-semibold tracking-wider mb-2" style="color: rgba(0,191,166,0.7);">Company</label>
                <input v-model="form.company" type="text" placeholder="Your Company Name"
                  class="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300"
                  style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB;" />
              </div>

              <!-- Service + Budget -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold tracking-wider mb-2" style="color: rgba(0,191,166,0.7);">Service Needed</label>
                  <select v-model="form.service"
                    class="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300"
                    style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB;">
                    <option value="">Select a service</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>SaaS Platform</option>
                    <option>UI/UX Engineering</option>
                    <option>Automation</option>
                    <option>Business Intelligence</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold tracking-wider mb-2" style="color: rgba(0,191,166,0.7);">Budget Range</label>
                  <select v-model="form.budget"
                    class="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300"
                    style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB;">
                    <option value="">Select range</option>
                    <option>< $5,000</option>
                    <option>$5,000 – $20,000</option>
                    <option>$20,000 – $50,000</option>
                    <option>> $50,000</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-xs font-semibold tracking-wider mb-2" style="color: rgba(0,191,166,0.7);">Project Details *</label>
                <textarea v-model="form.message" required rows="5" placeholder="Describe your project, goals, timeline, and any specific requirements..."
                  class="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 resize-none"
                  style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB;"></textarea>
              </div>

              <!-- Submit -->
              <button type="submit"
                class="flex items-center justify-center gap-3 py-4 px-8 text-sm font-semibold tracking-[0.2em] uppercase rounded-xl transition-all duration-300 hover:opacity-90 mt-2"
                style="background: #00BFA6; color: #0B1312;">
                <Send :size="16" />
                Send Message
              </button>
            </form>
          </div>

          <!-- Success state -->
          <div v-else class="success-msg rounded-2xl p-16 text-center" style="background: rgba(17,32,31,0.8); border: 1px solid rgba(0,191,166,0.3);">
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background: rgba(0,191,166,0.15); border: 2px solid rgba(0,191,166,0.4);">
              <span style="font-size: 36px;">🚀</span>
            </div>
            <h3 class="text-2xl font-bold mb-3">Message Sent!</h3>
            <p class="mb-8" style="color: rgba(229,231,235,0.5);">We'll get back to you within 24 hours. Can't wait to hear more about your project!</p>
            <button @click="submitted = false; form.message = ''"
              class="px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-xl transition-opacity hover:opacity-80"
              style="border: 1px solid rgba(0,191,166,0.3); color: #00BFA6;">
              Send Another Message
            </button>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
input::placeholder, textarea::placeholder { color: rgba(229,231,235,0.25); }
input:focus, textarea:focus, select:focus {
  border-color: rgba(0,191,166,0.6) !important;
  box-shadow: 0 0 0 3px rgba(0,191,166,0.1);
}
select option { background: #0B1312; }
</style>
