const singleLineLog = require('single-line-log')
let slog = singleLineLog.stdout

// 封装的 ProgressBar 工具
function ProgressBar (description, barLength) {
    // 两个基本参数(属性)
    // 命令行开头的文字信息
    this.description = description || 'Progress'
    // 进度条的长度(单位：字符)，默认设为 25
    this.length = barLength || 25

    // 刷新进度条图案、文字的方法
    this.render = function (opts) {
        // 计算进度(子任务的 完成数 除以 总数)
        let percent = (opts.completed / opts.total).toFixed(4)
        // 计算需要多少个 █ 符号来拼凑图案
        let cell_num = Math.floor(percent * this.length)

        // 拼接黑色条
        let cell = ''
        for (let i = 0; i < cell_num; i++) {
            cell += '█'
        }

        // 拼接灰色条
        let empty = ''
        for (let i = 0; i < this.length - cell_num; i++) {
            empty += '░'
        }

        // 拼接最终文本
        let cmdText = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total

        // 在单行输出文本
        slog(cmdText)
    }
}

// 模块导出
module.exports = ProgressBar
