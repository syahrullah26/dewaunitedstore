<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const texts = [
  'Anak Dewa',
  'Belanja Sekarang',
  'Dewa United'
]

const displayText = ref('')
const currentIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = ref(150)
let timeout: NodeJS.Timeout | undefined

const type = () => {
  const currentText = texts[currentIndex.value]
  
  if (!currentText) return
  
  if (!isDeleting.value) {
    // ngetik
    displayText.value = currentText.substring(0, displayText.value.length + 1)
    typingSpeed.value = 100
    
    if (displayText.value === currentText) {
      // diem sebelom ngapus
      typingSpeed.value = 1000
      isDeleting.value = true
    }
  } else {
    // apus
    displayText.value = currentText.substring(0, displayText.value.length - 1)
    typingSpeed.value = 100
    
    if (displayText.value === '') {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % texts.length
      typingSpeed.value = 500
    }
  }
  
  timeout = setTimeout(type, typingSpeed.value)
}

onMounted(() => {
  timeout = setTimeout(type, 1000)
})

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<template>
  <div class="w-full py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="min-h-30 sm:min-h-35 flex items-center justify-center">
          <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-[150px] font-bold">
            <span class="bg-gradient-to-r from-[#aa8327ff] via-[#7b5902] to-[#aa8327] bg-clip-text text-transparent">
              {{ displayText }}
            </span>
            <span class="inline-block w-1 h-12 sm:h-14 md:h-16 lg:h-[126px] bg-[#aa8327ff] ml-1 animate-pulse"></span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>