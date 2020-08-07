#! /usr/bin/env node

const pkg = require('./package.json')
const program = require('commander')
const { initTest } = require('./libs/cmd-test')
const commandInit = require('./libs/cmd-init')

// console.log(`version: ${pkg.version}`)
// console.log(`author: ${pkg.author}`)

// 获取命令行入参
let argv = process.argv

program
    .version(pkg.version, '-v, --version')
    .option('-v, --version', '查看工具版本号')
    .option('-h, --help', '查看工具帮助')
    .description(pkg.description)

program.on('--help', function () {
    console.log('')
    console.log('Examples (调用示例):')
    console.log('  $ we -v')
    console.log('  $ we test')
    console.log('  $ we test -n HH -a 18 p 18001670961')
    console.log('  $ we init myProject')
    console.log('')
})

// HH: 初始化模块演示
program
    .command('test') // 定义命令行指令
    // .alias('i') // 命令行指令的别名
    .description('这是一个测试命令') // 描述
    .option('-n, --nickName [nickName]', '姓名', 'HAVENT')
    .option('-a, --age [age]', '年龄', '38')
    .option('-p, --phone [phone]', '手机')
    .action((options) => {
        let config = {
            nickName: options.nickName || '',
            age: options.age || 0,
            phone: options.phone || null,
            role: ''
        }

        initTest(config)
    })

// HH: 初始化项目
program
    .command('init <projectName>')
    .action(function(projectName) {
        commandInit.init(projectName)
    })

// 解析命令行
program.parse(argv)
