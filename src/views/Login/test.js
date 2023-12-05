/**
 * 使用cookie与session
 * @author zys
 */
// yarn add express
// yarn add express-session
const express = require('express');
const sessions = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const DB_user = [
    {username: 'admin', password: 1},
    {username: 'zys', password: 1},
]
let DB_session;

// 设置服务器的session
app.use(sessions({
    secret: 'sys_session',  // cookie签名 | session Id
    name: 'zys',  // 默认是connect.sid
    cookie: {maxAge: 15000},  // 有效期
    resave: false,
    saveUninitialized: false
}));

app.all('/login', (req, res) => {
    const {username, password} = req.body;
    if (DB_user.some(val => val.username === username)) {
        if (password === '1') {
            // 后端设置
            req.session.user = {username, password};
            req.session.isLOgin = true;
            res.json({
                code: 1,
                message: '登录成功！',
                role: username === 'admin' ? 'admin' : 'user',
            })
        } else {
            res.json({
                code: 0,
                message: '密码不正确！',
                role: '',
            })
        }
    }
})

app.listen(3000, () => {
    console.log('服务器在3000端口运行');
});
