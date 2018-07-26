<template>
  <div>
    <ilove :pData="pData"></ilove>
  </div>
</template>

<script>
import { Ilove } from './vue-love'
export default {
  name: 'Demo',
  components: {
    Ilove
  },
  data () {
    return {
      pData: {
        call: '狗呆与女神相识',
        time: '2018/7/9 01:08:00'
      }
    }
  }
}
</script>

<style scoped>
</style>
