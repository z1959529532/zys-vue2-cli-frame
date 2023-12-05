<template>
  <div id="joystick">
    <div class="knob-content">
      <div class="knob"></div>
    </div>
  </div>
</template>


<script>
/**
 * 摇杆
 */
export default {
  name: 'Joystick',
  props: {
    offsetLeft: {
      type: Number,
      default: 0
    },
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      /** 旋钮 */
      knob: null,
      knobContent: null,
      /** 旋钮半径 */
      knobRadius: null,
      /** 底盘半径 */
      knobContentRadius: null,
      /** 旋钮的中心 */
      centerPoint: {x: null, y: null}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.knob = document.querySelector('.knob');
      this.knobContent = document.querySelector('.knob-content');
      // 地盘定位
      this.knobContent.style.left = this.offsetLeft + 'px';
      this.knobContent.style.top = this.offsetTop + 'px';

      this.knobRadius = this.knob.clientWidth / 2;
      this.knobContentRadius = this.knobContent.clientWidth / 2;
      this.centerPoint.x = this.knob.offsetLeft + this.knobRadius;
      this.centerPoint.y = this.knob.offsetTop + this.knobRadius;

      this.init();
    });
  },
  methods: {
    init() {
      this.knobContent.addEventListener('mousedown', (e) => {
        const offset = this.calculateOffset(e);
        this.knob.style.left = offset.x + 'px';
        this.knob.style.top = offset.y + 'px';
        document.addEventListener('mousemove', this.moveKnob);
      });

      document.addEventListener('mouseup', () => {
        this.knob.style.left = this.centerPoint.x + 'px';
        this.knob.style.top = this.centerPoint.y + 'px';
        document.removeEventListener('mousemove', this.moveKnob);
      });
    },

    moveKnob(e) {
      const offset = this.calculateOffset(e);
      this.knob.style.left = offset.x + 'px';
      this.knob.style.top = offset.y + 'px';
    },

    /**
     * 计算偏移量
     * @param e 鼠标事件
     * @return {{x: number, y: number}}
     */
    calculateOffset(e) {
      // 触摸点到摇杆中心点的距离
      let d = Math.sqrt(
          Math.pow(e.pageX - this.centerPoint.x, 2) + Math.pow(e.pageY - this.centerPoint.y, 2));
      d = d > (this.knobContentRadius - this.knobRadius) ? this.knobContentRadius - this.knobRadius : d;
      // 三角函数 减去xy偏移到中心点 得到弧度值
      const radin = Math.atan2(e.pageY - this.centerPoint.y, e.pageX - this.centerPoint.x);

      // 此处返回计算角度等信息输出
      const angle = -radin * (180 / Math.PI);
      console.log(angle);

      return {x: this.centerPoint.x + Math.cos(radin) * d, y: this.centerPoint.y + Math.sin(radin) * d};
    }

  }
};
</script>

<style scoped lang="less">
#joystick {
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .knob-content {
    position: absolute;
    /*top: 50%;*/
    /*left: 50%;*/
    /*margin-left: -60px;*/
    /*margin-top: -60PX;*/
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, .2);
    border-radius: 100%;
    cursor: pointer;
  }

  .knob {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -20px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 100%;
  }
}
</style>