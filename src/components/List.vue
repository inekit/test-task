<template>
  <div class="list">
      <b-button @click="shown=!shown">{{listName}}></b-button>
        <ul v-if="realListPosition<mode.length" :style="{ display: shown ? 'block': 'none' }">
            <li v-for="data,i of Object.entries(iterableData)" :key="'eee'+i " >
                <p>{{data?.[0] && data?.[0] !== 'undefined' ? data?.[0] : 'Остальные'}}</p>
                <List :listPosition="realListPosition+1" :ulData="data?.[1]"/>

            </li>
        </ul>
        <ul v-if="realListPosition>=mode.length " :style="{ display: shown ? 'block': 'none' }">
            <li v-for="data,i of ulData" :key="'eee'+i">
                <p v-b-tooltip.hover :title="getCityData(data)">{{data.name}}</p>          
                <b-tooltip triggers="hover">
                </b-tooltip>  
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'ListStep',
  props: {
    listPosition: Number,
    key: String,
    ulData: Object
  },
  data: () => {
    return {
        shown: false,
        realListPosition: 0,
    }
  },
  computed: {
      listName: function (){
          return this.$store.state.dictionary[this.mode[this.realListPosition ?? 0]] ?? "Жильцы"
      },
      mode: function (){
          return this.$store.state.mode[0]
      },
  },
  methods: {
      getCityData(data){
          return this.$store.state.cities.find(el=>el.id=data.city_id)?.data
      },
      //Группируем данные по заданному id категории 
      //(прим - listPosition = 0 -> this.mode[listPosition] = "Страна", на выходе получаем {Россия: Подходящие граждане,...})
      initList (listPosition){
          
        this.realListPosition = listPosition 
        this.iterableData = [];

        this.shown=this.listPosition === 0 ? true : false;

        const ulType = this.mode[listPosition ?? 0]
        const citizens = this.ulData

        citizens?.forEach(citizen=>{
            const key = citizen.groups.find(group=>{ 
                if (group.type === ulType) return true
            })?.name
            
        
            this.iterableData[key]?.length ? this.iterableData[key].push(citizen) : this.iterableData[key] = [citizen]
        })

        const keys = Object.keys(this.iterableData)
        if (keys.length === 1 && this.iterableData['undefined'] && listPosition === this.listPosition) {
            this.realListPosition = listPosition+1;
            this.initList(listPosition+1);
           }

  },
  },
  created: function (){
      this.initList(this.listPosition);
  },
  watch: {
    mode: function () {
       this.initList(this.listPosition);
       
    }
  },
  
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.list{
    margin:30px 20px;
    text-align: left;
    ul {
        text-align: left;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 10px;
        border: 1px solid rgba(0,0,0,.125);
        border-radius: 0.25rem;
    };
    p {
         text-align: left;
    };
    button {
        margin-bottom: 10px;
    };
    li {
    display: inline-block;
    margin: 0 10px;
    width: auto;
    position: relative;
    display: block;
    color: #212529;
    text-decoration: none;
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,.125);
        p{
            margin: 10px 0 0 10px;
        }
    };
    li:last-child{
        border-bottom:none
    }
}


a {
  color: #42b983;
}
</style>
