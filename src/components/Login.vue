<template>
    <div class="container">
        <div class="notification"
            :class="{ 'notification-success': isLogout }"
            v-if="isLogout">
            {{ this.notification }}
        </div>
        <form @submit.prevent="submitForm">
            <base-input type="text" v-model="form.email" label="Email">
                <template #error>
                    <span v-if="error.email" class="error">{{ error.email }}</span>
                </template>
            </base-input>
            <base-input type="password" v-model="form.password" label="Password">
                <template #error>
                    <span v-if="error.password" class="error">{{ error.password }}</span>
                </template>
            </base-input>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";
import data from '../data.json';
import bcrypt from 'bcryptjs';

export default {
    data() {
        return {
            notification: '',
            isLogout: false,
            form: {
                email: '',
                password: ''
            },
            error: {
                email: '',
                password: ''
            }
        }
    },
    created() {
        const status = sessionStorage.getItem("statusLog");
        if (status === "false") {
            this.notification = 'Logout Berhasil!';
            this.isLogout = true;
            setTimeout(() => {
                this.isLogout = false;
            }, 3000);

            sessionStorage.removeItem("statusLog");
        }
    },

    methods: {
        async submitForm() {
            let valid = true;

            if (!this.form.email) {
                this.error.email = "Email Tidak boleh kosong";
                valid = false;
            } else {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                if (!emailRegex.test(this.form.email)) {
                    this.error.email = "Format email tidak valid";
                    valid = false;
                } else {
                    this.error.email = "";
                }
            }

            if (!this.form.password) {
                this.error.password = "Password Tidak boleh kosong";
                valid = false;
            } else {
                const email = this.form.email;
                const userData = data.users.find(user => user.email === email);

                if (!userData || !bcrypt.compareSync(this.form.password, userData.password)) {
                    this.error.password = "Maaf Password salah";
                    valid = false;
                } else {
                    this.error.password = "";
                }
            }


            if (valid) {
                const newData = {
                    email: this.form.email,
                    password: this.form.password,
                };
                let url = "http://localhost:3000/login/";
                let method = axios.post;
                method(url, newData).then((res) => {
                    const token = res.data.accessToken;
                    const decoded = jwt_decode(token);
                    console.log(decoded);
                    const { email, sub, exp } = decoded;

                    sessionStorage.setItem("admin", JSON.stringify({ email, sub, exp, token }));
                    sessionStorage.setItem("statusLog", "true");
                    this.$router.push({ name: 'Dashboard' });

                    this.form = {
                        email: '',
                        password: ''
                    };
                });
            }
        }
    }
}
</script>
<style scoped>
.notification {
     position: absolute;
     top: 10px;
     right: 10px;
     padding: 10px;
     border-radius: 5px;
     color: #fff;
     font-weight: bold;
     font-size: 16px;
 }


 .notification-success {
     background-color: #4CAF50;
 }

.container {
    max-width: 1920px;
    margin: 0 auto;
    padding: 20px;
}

label {
    text-align: left;
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background-color: #0069d9;
}

.error {
    font-size: 14px;
    color: red;
    text-align: center;
}
</style>
