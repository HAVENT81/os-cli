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

const cmdTest = module.exports

cmdTest.initTest = (config) => {
    const prompts = []

    console.log(config)

    prompts.push({
        type: 'input',
        name: 'nickName',
        message: '您的姓名？',
        default: config.nickName,
        validate: function (input) {
            if (input) {
                return true
            } else {
                return '不能为空'
            }
        }
    })

    prompts.push({
        type: 'input',
        name: 'age',
        message: '今年多大了？',
        default: config.age,
        validate: input => {
            // 同步请求
            if (input > 0) {
                return true
            }
            return '请输入正确的年龄！'
        }
    })

    if (!config.phone) {
        prompts.push({
            type: 'number',
            name: 'phone',
            message: '手机号码？',
            validate: input => {
                if (!isNaN(input)) {
                    return true
                }
                return '手机号码必填！'
            }
        })
    }

    prompts.push({
        type: 'list',
        name: 'role',
        message: '你是谁？',
        choices: [
            {
                name: '我是哥哥弟弟',
                value: 'brother'
            },
            {
                name: '我是姐姐妹妹',
                value: 'sister'
            }
        ]
    })

    inquirer.prompt(prompts).then(function (answers) {
        // console.log(chalk.blue.bgRed(answers))
        console.log({
            ...config,
            ...answers
        })

        // 调用测试下载
        testDownload()
    }).catch(error => {
        console.error(error)
        if(error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    })
}


function testDownload() {
    let pb = new ProgressBar('下载进度', 50)
    let num = 0, total = 100
    function downloading() {
        if (num < total) {
            pb.render({ completed: num, total: total, status: '下载中...' })
            num++
            setTimeout(function () {
                downloading()
            }, 50)
        }else{
            pb.render({completed: num, total: total, status: "下载完毕."})
            process.exit(0)
        }
    }

    downloading()
}
