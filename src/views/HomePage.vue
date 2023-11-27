<template>
    <div class="home-container">
      <header class="header">
        MAREL
      </header>
      <div class="buttons-container">
        <button class="nav-button" @click="goToPropiedades">Propiedades</button>
        <button class="nav-button" @click="goToCalendario">Rentas</button>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HomePage',
    methods: {
      goToPropiedades() {
        this.$router.push('/propiedades');
      },
      goToCalendario() {
        this.$router.push('/calendario');
      }
    }
  });
  </script>
  
  <style>
  .home-container {
    text-align: center;
    padding: 50px;
    font-family: 'Arial', sans-serif;
  }
  
  .header {
    font-size: 2em;
    color: #333;
    margin-bottom: 40px;
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .nav-button {
    border: none;
    background-color: #4CAF50;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .nav-button:hover {
    background-color: #45a049;
  }
  </style>
  