<template>
    <div class="knob-container">
      <Knob
        :value="displayValue"
        :value-template="`${displayValue}%`"
        :min="0"
        :max="100"
        :size="200"
        :stroke-width="10"
        :show-value="true"
        rangeColor="LightGray"
        :style="`--knob-value-color: ${knobColor};`"
      />
      <div class="current-value-text">
        Valor atual: {{ currentValue }}%
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Knob from 'primevue/knob';
  
  // Mock de valor inicial
  const currentValue = ref(Math.floor(Math.random() * 101));
  const displayValue = ref(0);
  
  // Determina a cor do knob com base no valor
  const knobColor = ref('red');
  const determineKnobColor = (value: number) => (value <= 25 ? 'red' : 'green');
  
  // Animação do knob indo até 100% e voltando para o valor atual
  const animateKnob = () => {
    displayValue.value = 0;
    knobColor.value = 'red';
    let isIncreasing = true;
  
    const step = () => {
      if (isIncreasing) {
        displayValue.value += 1;
        if (displayValue.value >= 100) {
          isIncreasing = false;
        }
      } else {
        displayValue.value -= 1;
        if (displayValue.value <= currentValue.value) {
          displayValue.value = currentValue.value;
          knobColor.value = determineKnobColor(currentValue.value);
          return;
        }
      }
      knobColor.value = determineKnobColor(displayValue.value);
      setTimeout(step, 50);
    };
  
    step();
  };
  
  // Inicia a animação ao montar o componente
  onMounted(() => {
    animateKnob();
  });
  </script>
  
  <style scoped>
  .knob-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .p-knob-value {
    stroke: var(--knob-value-color, green) !important;
  }
  
  .current-value-text {
    font-size: 1.5rem;
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  