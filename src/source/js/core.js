import { init, draw } from './canvas.js'
export default {
  name: 'VueLove',
  props: {
    pData: {
      call: {
        type: String
      },
      time: {
        type: String
      }
    }
  },
  data () {
    return {
      timeLen: [1000 * 60 * 60 * 24, 1000 * 60 * 60, 1000 * 60, 1000]
    }
  },
  computed: {
    meetDom () {
      return document.querySelector('#meet')
    },
    initDate () {
      return new Date(this.pData.time).getTime()
    }
  },
  mounted () {
    this.initDom()
    this.initEvent()
  },
  methods:{
    showTime () {
      const time = new Date().getTime() - this.initDate
      const days = time / this.timeLen[0] | 0
      const hours = (time - (days * this.timeLen[0])) / (this.timeLen[1]) | 0
      const minutes = (time - (days * this.timeLen[0]) - (hours * this.timeLen[1])) / (this.timeLen[2]) | 0
      const seconds = (time - (days * this.timeLen[0]) - (hours * this.timeLen[1]) - (minutes * this.timeLen[2])) / this.timeLen[3] | 0
      const meetTime = ` ${ days }天 ${ hours }时 ${ minutes }分 ${ seconds }秒`
      this.meetDom.innerText = meetTime
    },
    loop () {
      setTimeout(() => {
        this.initDom()
      }, 1000)
    },
    initDom () {
      this.showTime()
      this.loop()
    },
    loveing (x, y, dom) {
      const love = document.createElement('i')
      love.className = 'love'
      love.style.position = 'absolute'
      love.style.left = `${x}px`
      love.style.top = `${y}px`
      dom.appendChild(love)
      setTimeout(() => {
        dom.removeChild(love)
      }, 800)
    },
    initEvent () {
      // 鼠标点击的特效
      const container = document.querySelector('.container')
      // 50为桃心的宽度，50为桃心的高度
      document.body.addEventListener('touchstart', e => {
        const { pageX: oldX, pageY: oldY } = e.touches[0]
        const newX = oldX - 50, newY = oldY - 50
        this.loveing(newX, newY, container)
      })
      document.body.addEventListener('touchend', e => {
        // 点击触摸事件之后禁止click事件
        if (e.preventDefault) e.preventDefault()
        else e.returnValue = false
      })
      document.body.addEventListener('click', e => {
        const { clientX: oldX, clientY: oldY } = e
        const newX = oldX - 50, newY = oldY - 50
        loveing(newX, newY, container)
      })
      // canvas动画
      const canvas = document.querySelector('#canvas'), WIDTH = window.innerWidth, HEIGHT = window.innerHeight
      canvas.width = WIDTH
      canvas.height = HEIGHT
      const context = canvas.getContext('2d')
      const maxR = 15, minR = 5, circleArr = []
      let POINT = 35
      if (window.innerWidth < 780) POINT = 15
      else if (window.innerWidth < 1280) POINT = 25
      init({ POINT, WIDTH, HEIGHT, maxR, minR, circleArr })
      requestAnimationFrame(function fn() {
        draw({ context, canvas, POINT, WIDTH, HEIGHT, circleArr })
        requestAnimationFrame(fn)
      })
    }
  }
}