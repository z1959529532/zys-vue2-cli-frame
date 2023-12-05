// 1、引入express
const express = require('express');
// 2、创建对象应用
const app = express();

// 中间件、验证token
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
// secret是后端加密的密钥
const secret = 'rhwl';

const DB_user = [
    {username: 'admin', password: 1},
    {username: 'zys', password: 1},
]

// 3、创建路由规则
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // 设置响应头  设置允许跨域
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method.toLowerCase() === 'options') {
        return res.end();
    }
    next();
});
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (DB_user.some(val => val.username === username)) {
        if (password === '1') {
            // 用户正确，使用jwt进行加密生成token
            res.json({
                code: 1,
                message: '登录成功！',
                role: username === 'admin' ? 'admin' : 'user',
                token: jwt.sign(
                    {username, password},
                    secret,
                    {expiresIn: 20,}
                ),
            });
        } else {
            res.json({
                code: 0,
                message: '密码不正确！',
                role: '',
            });
        }
    }
});
app.get('/validate', (req, res) => {
    const token = req.headers.authorization; // 在请求头中附带token信息
    jwt.verify(token, secret, (err, decode) => { // 验证token是否合法
        if (err) {
            return res.json({
                code: 0,
                message: '当前token无效！',
                role: '',
            });
        }
        // 如果验证合法，重新生成新的token，并返回信息
        res.json({
            code: 1,
            message: '生成新token！',
            role: decode.username === 'admin' ? 'admin' : 'user',
            token: jwt.sign(
                {username: decode.username, password: decode.password},
                secret,
                {expiresIn: 20,}
            ),
        });
    });
});

app.all('/getUsers', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = [
        {username: '张三', password: 123456},
        {username: '李四', password: 123456}
    ];
    setTimeout(() => {
        response.send(JSON.stringify(data));
    }, 100);
});

app.listen(3001, () => {
    console.log('服务器在3001端口运行');
});



