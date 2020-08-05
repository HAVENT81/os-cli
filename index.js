#! /usr/bin/env node

const pkg = require('./package.json')
const program = require('commander')

/**
 *  inquirer 功能简介
 *  input – 输入
 *  validate – 验证
 *  list – 列表选项
 *  confirm – 提示
 *  checkbox – 复选框等等
*/
const inquirer = require('inquirer')


// const clone = require('git-clone')
// const shell = require('shelljs')
// const log = require('tracer').colorConsole()

// console.log(`version: ${pkg.version}`)
// console.log(`author: ${pkg.author}`)

// 获取命令行入参
let argv = process.argv

program
    .version(pkg.version, '-v, --version')
    .option('-v, --version', '查看工具版本号')
    .option('-h, --help', '查看工具帮助')
    .description(pkg.description)

// program
//     .command('help', {isDefault: true})
//     .description('帮助命令')
//     .action(function () {
//         program.outputHelp()
//     })

program.on('--help', function () {
    console.log('')
    console.log('Examples (调用示例):')
    console.log('  $ we -v')
    console.log('  $ we test')
    console.log('  $ we test -n HH -a 18')
    console.log('')
})

// HH: 初始化模块演示
program
    .command('test') // 定义命令行指令
    // .alias('i') // 命令行指令的别名
    .description('这是一个测试命令') // 描述
    .option('-n, --nickName [nickName]', '姓名', 'HAVENT')
    .option('-a, --age [age]', '年龄', '38')
    .action((options) => {
        let config = {
            nickName: options.nickName || '',
            age: options.age || 0,
            role: ''
        }

        initTest(config)
    })


// 解析命令行
program.parse(argv)

function initTest(config) {
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
        console.log(answers)
    }).catch(error => {
        console.error(error)
        if(error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    })
}
