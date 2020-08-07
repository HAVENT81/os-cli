/**
 *  inquirer 功能简介
 *  input – 输入
 *  validate – 验证
 *  list – 列表选项
 *  confirm – 提示
 *  checkbox – 复选框等等
 */
const inquirer = require('inquirer')
const ProgressBar = require('../utils/progress-bar')

const clone = require('git-clone')
const shell = require('shelljs')
const log = require('tracer').colorConsole()

const cmdInit = module.exports

cmdInit.init = (newProjectName) => {
    log.info(`欢迎使用 we-cli 命令行工具！`)
    log.info(`we-cli 将为您创建 /${newProjectName} 目录，并拷贝模版内容到新目录！`)

    choiceConfig(config => {
        log.info(config)

        const absolutePath = shell.pwd()
        const targetPath = `${absolutePath}/${newProjectName}`
        const gitUrl = `https://github.com/HAVENT81/we-cli.git`
        const total = 100
        let current = 0

        if (newProjectName) {
            log.info(`正在 ${gitUrl} 拉取模板代码 ...`)
            log.info(`保存路径 ${targetPath}`)
            downloading(current, total)

            let interval = setInterval(() => {
                current++
                if (current > total - 1) current = 1
                downloading(current, total)
            }, 50)

            clone(gitUrl, targetPath, null, () => {
                clearInterval(interval)
                // 移除 git 信息
                shell.rm('-rf', `${targetPath}/.git`)

                // 下载完成
                downloading(total, total)
                console.log('')
                log.info('模板工程建立完成')
            })
        } else {
            log.error('请输入一个项目名称！(# we init testProject)')
        }
    })
}



let progressBar = null
/**
 * HH: 下载进度显示
 * @param current 当前进度值（数字）
 * @param total 总进度值（数字）
 */
function downloading(current, total) {
    if (!progressBar) progressBar = new ProgressBar('下载进度', 0)

    progressBar.render({ completed: current, total: total, status: (current < total ? '下载中...' : '下载完毕.') })
    // process.exit(0)
}


/**
 * HH: 用户选择相关配置
 * @param callback 回调函数
 */
function choiceConfig(callback) {
    const prompts = []
    let config = {}

    prompts.push({
        type: 'list',
        name: 'templateName',
        message: '请选择需要使用的模版项目名称？',
        choices: [
            {
                name: '基础 Vue 项目包',
                value: 'vue'
            },
            {
                name: '基础 React 项目包',
                value: 'react'
            }
        ]
    })

    inquirer.prompt(prompts).then(function (answers) {
        config = {
            ...config,
            ...answers
        }
        if (callback) {
            callback(config)
        }
    }).catch(error => {
        log.error(error)
    })
}
