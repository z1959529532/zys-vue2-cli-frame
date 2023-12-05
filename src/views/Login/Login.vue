<template>
    <div id="login">
        <!--        <el-input style="width:200px" v-model="username"></el-input>-->
        <!--        <el-button @click="login">登录</el-button>-->
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import * as createRouter from "@/router";

class LoginFrom {
    username: string = '';
    password: number | any = null;
}

class LoginReply {
    code: any = null;
    message: string = '';
    role: string = '';
    token: string = '';
}

@Component({
    name: 'Login'
})
export default class Login extends Vue {

    loginForm = new LoginFrom();
    loginFormRules = {
        username: [
            {required: true, message: '请输入用户名！', trigger: 'blur'},
        ],
        password: [
            {required: true, message: '请输入密码！', trigger: 'blur'},
        ],
    };

    mounted() {
    }

    login() {
        // if (!this.loginForm.username) {
        //     this.$message({message: '请输入用户名！', type: 'warning'});
        //     return
        // }
        // if (!this.loginForm.password) {
        //     this.$message({message: '请输入密码！', type: 'warning'});
        //     return
        // }

        (this.$refs.loginForm as any).validate((valid: boolean) => {
            if (valid) {
                const param = {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                }
                this.$allApi.userLogin(param).then((res: LoginReply) => {
                    if (res.code === 1) {
                        this.$message({message: res.message, type: 'success'});

                        localStorage.setItem('token', res.token);
                        localStorage.setItem('role', res.role);

                        // console.log(this.$router,  3344);
                        createRouter.addRoleRoutes();
                        this.$router.replace('nativeMain');
                        // console.log(this.$router.getRoutes(),  3344);
                    }
                    if (res.code === 0) {
                        this.$message({message: res.message, type: 'warning'});
                    }
                })
            }
        })
    }

}
</script>

<style scoped lang="less">
#login {
    width: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid skyblue;
    border-radius: 15px;
    padding: 20px 30px 20px 20px;
}
</style>
