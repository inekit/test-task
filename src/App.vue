<template>
<b-form-radio-group
        id="btn-radios-1"
        v-model="$store.state.mode"
        
        :options="$store.state.modes.map((el)=>{return {text: el.join('-'), value: el}})"
        name="radios-btn-default"
        buttons
      ></b-form-radio-group>
  <List :listPosition="0" :ulData="$store.state.citizens"/>
</template>

<script>
import List from './components/List.vue'
import cities from '../cities.json';
import citizens from '../citizens.json';

export default {
  name: 'App',
  data:  () => {
    return {
    }
  },
  components: {
    List
  },
  created: function(){
    console.log(citizens)
    this.$store.state.cities = cities;
    this.$store.state.citizens = citizens;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
