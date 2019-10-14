<template>
  <div class="container">
    <div class="content">
      <div class="line">
        <div class="birthday">
          <div class="title">B站用户生日分布</div>
          <div class="chart">
            <div id="birthday"></div>
          </div>
        </div>
        <div class="sex">
          <div class="title">B站用户性别分布</div>
          <div class="chart">
            <div id="sex"></div>
          </div>
        </div>
      </div>
      <div class="level">
        <div class="title">B站用户等级分布</div>
        <div class="level-chart">
          <div class="circle-wrap" v-for="(item, key) of levelData">
            <div class="level-title">Level {{ key + 1 }}</div>
            <div class="level-score" :id="`level_${key+1}`"></div>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>有效样本数据：100000，截止日期：2019-10-14</div>
      <div>Author: Terence.Sun 禁止商业使用</div>
    </div>
  </div>
</template>

<script>
    import G2 from '@antv/g2';
    import {CountUp} from 'countup.js';

    export default {
        data() {
            return {
                levelData: [
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                ],
                counter: [],
            }
        },
        methods: {
            init_count() {
                for (let count = 0; count < this.levelData.length; count++) {
                    this.counter.push(new CountUp(`level_${count + 1}`, this.levelData[count].score, {
                        useGrouping: false,
                    }));
                }
            },
            birthday_chart() {
                const chart = new G2.Chart({
                    container: 'birthday',
                    forceFit: true,
                    height: 400,
                });
                const data = [
                    {genre: 'Sports', sold: 275},
                    {genre: 'Strategy', sold: 115},
                    {genre: 'Action', sold: 120},
                    {genre: 'Shooter', sold: 350},
                    {genre: 'Other', sold: 150}
                ];
                chart.source(data);
                chart.axis('genre', {
                    label: {
                        textStyle: {
                            fill: "#fff",
                        }
                    }
                });
                chart.axis('sold', {
                    label: {
                        textStyle: {
                            fill: "#fff",
                        }
                    }
                });
                chart.legend(false);
                chart.interval().position('genre*sold').color('genre');
                chart.render();
            },
            sex_chart() {
                const chart = new G2.Chart({
                    container: 'sex',
                    forceFit: true,
                    height: 400
                });
                var data = [{
                    item: '事例一',
                    count: 40,
                    percent: 0.4
                }, {
                    item: '事例二',
                    count: 21,
                    percent: 0.21
                }, {
                    item: '事例三',
                    count: 17,
                    percent: 0.17
                }, {
                    item: '事例四',
                    count: 13,
                    percent: 0.13
                }, {
                    item: '事例五',
                    count: 9,
                    percent: 0.09
                }];
                chart.source(data, {
                    percent: {
                        formatter: function formatter(val) {
                            val = val * 100 + '%';
                            return val;
                        }
                    }
                });
                chart.legend(false);
                chart.coord('theta', {
                    radius: 0.75
                });
                chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
                chart.axis('percent', {
                    label: {
                        textStyle: {
                            fill: "#fff",
                        }
                    }
                });
                chart.intervalStack().position('percent').color('item').label('percent', {
                    formatter: function formatter(val, item) {
                        return item.point.item + ': ' + val;
                    },
                    textStyle: {
                        fill: "#fff",
                    },
                }).tooltip('item*percent', function (item, percent) {
                    percent = percent * 100 + '%';
                    return {
                        name: item,
                        value: percent
                    };
                }).style({
                    lineWidth: 1,
                    stroke: '#fff'
                });
                chart.render();
            },
            level_chart() {
                const data = [
                    {score: 12.42},
                    {score: 12.42},
                    {score: 12.42},
                    {score: 12.42},
                    {score: 12.42},
                    {score: 12.42},
                ];
                this.levelData = data;
                this.countUp_reset();
            },
            countUp_start() {
                for (let item of this.counter) {
                    item.start();
                }
            },
            countUp_reset() {
                for (let key = 0; key < this.counter.length; key++) {
                    this.counter[key].update(this.levelData[key].score);
                }
            },
        },
        mounted() {
            this.init_count();
            this.birthday_chart();
            this.sex_chart();
            this.countUp_start();
            this.level_chart();
        }
    }
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding: 100px;
    display: flex;
    align-items: center;
    text-align: center;
    z-index: 2;
    flex-direction: column;
    /*background-color: ;*/

    .content {
      flex: 0 0 auto;
      display: flex;
      position: relative;
      min-width: 800px;
      max-width: 1500px;
      width: 100%;
      height: 750px;
      flex-direction: column;
      /*background-color: #dfccff;*/

      .line {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
      }

      .title {
        font-size: 20px;
        letter-spacing: 2px;
        margin-bottom: 10px;
        color: #fff;
      }

      .chart {
        width: 90%;
        height: 400px;
        /*background-color: #9aceff;*/
      }

      .birthday {
        flex: 1 1 auto;
        display: flex;
        position: relative;
        height: 450px;
        flex-direction: column;
        align-items: center;
        /*background-color: #b9ffc3;*/
      }

      .sex {
        flex: 1 1 auto;
        display: flex;
        position: relative;
        height: 450px;
        flex-direction: column;
        align-items: center;
        /*background-color: #ffca99;*/
      }

      .level {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .level-chart {
          flex: 0 0 auto;
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          height: 200px;
          width: 100%;
          margin-top: 10px;
          align-items: center;
          justify-content: space-between;

          .circle-wrap {
            flex: 0 0 auto;
            display: flex;
            position: relative;
            width: 120px;
            height: 120px;
            flex-direction: column;
            align-items: center;
            border-radius: 50%;
            box-shadow: 3px 0px 5px 0px rgba(120, 120, 120, 0.4);
            background-color: rgba(255, 255, 255, .8);

            .level-title {
              margin-top: 20px;
              font-size: 15px;
              width: 70px;
              padding-bottom: 4px;
              border-bottom: #7F828B solid 1px;
            }

            .level-score {
              font-size: 22px;
              margin-top: 10px;
            }
          }
        }
      }
    }

    .footer {
      flex: 0 0 auto;
      display: flex;
      position: absolute;
      bottom: 5vh;
      min-width: 400px;
      max-height: 700px;
      height: 100px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 16px;
      color: #ffffff;
      font-weight: 600;
    }
  }
</style>
