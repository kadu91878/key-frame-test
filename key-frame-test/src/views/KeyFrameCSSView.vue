<template>
    <div class="knob-container">
      <div class="knob" :style="`--progress: ${displayValue}; --knob-color: ${knobColor}`">
        <div class="knob-value">{{ displayValue }}%</div>
      </div>
      <div class="current-value-text">
        Valor atual: {{ currentValue }}%
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // Valor inicial aleatório entre 0 e 100
  const currentValue = ref(Math.floor(Math.random() * 101));
  const displayValue = ref(0);
  const knobColor = ref('red');
  
  // Função para determinar a cor do knob
  const determineKnobColor = (value: number) => (value <= 25 ? 'red' : 'green');
  
  // Função de animação
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
  
  // Inicia a animação quando o componente é montado
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
  
  .knob {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      var(--knob-color) calc(var(--progress) * 1%), 
      lightgray 0
    );
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .knob::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-color: white;
    z-index: 1;
  }
  
  .knob-value {
    position: absolute;
    z-index: 2;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .current-value-text {
    font-size: 1.5rem;
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  