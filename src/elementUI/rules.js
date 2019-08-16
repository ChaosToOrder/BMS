// 用户名 字母数字组成6-16位
export function userNameRE(rule, value, callback) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g
    if (!value) {
        return callback(new Error('请填写用户名'))
    } else if (!reg.test(value)) {
        return callback(new Error('用户名格式错误'))
    } else {
        callback()
    }
}

// 密码 字母数字组成6-16位
export function passwordRE(rule, value, callback) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g
    if (!value) {
        return callback(new Error('请填写密码'))
    } else if (!reg.test(value)) {
        return callback(new Error('密码格式错误'))
    } else {
        callback()
    }
}
export default {
    // 常用登录  6-16字母数字组合
    logName: [{ required: true, validator: userNameRE, trigger: 'blur' }],
    // 常用密码  6-16字母数字组合
    logPwd: [{ required: true, validator: passwordRE, trigger: 'blur' }]
}