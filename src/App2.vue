<template>
    <div class="container">
        <form @submit.prevent="addData">
            <div class="form-group">
                <label for="matkul">Mata Kuliah:</label>
                <input type="text" id="matkul" v-model="form.matkul" v-bind:class="{ 'input-error': error.matkul }"/>
                <span v-if="error.matkul" class="error">{{ error.matkul }}</span>
            </div>
            <div class="form-group">
                <label for="nilaiTugas">Nilai Tugas:</label>
                <input type="number" id="nilaiTugas" v-model="form.nilaiTugas" v-bind:class="{ 'input-error': error.tugas }"/>
                <span v-if="error.tugas" class="error">{{ error.tugas }}</span>
            </div>
            <div class="form-group">
                <label for="nilaiUTS">Nilai UTS:</label>
                <input type="number" id="nilaiUTS" v-model="form.nilaiUTS" v-bind:class="{ 'input-error': error.uts }"/>
                <span v-if="error.uts" class="error">{{ error.uts }}</span>
            </div>
            <div class="form-group">
                <label for="nilaiUAS">Nilai UAS:</label>
                <input type="number" id="nilaiUAS" v-model="form.nilaiUAS" v-bind:class="{ 'input-error': error.uas }"/>
                <span v-if="error.uas" class="error">{{ error.uas }}</span>
            </div>
            <div class="form-group">
                <label for="sks">SKS:</label>
                <input type="number" id="sks" v-model="form.sks" v-bind:class="{ 'input-error': error.sks }"/>
                <span v-if="error.sks" class="error">{{ error.sks }}</span>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <hr />
        <table>
            <thead>
                <tr>
                    <th>Mata Kuliah</th>
                    <th>Nilai Tugas</th>
                    <th>Nilai UTS</th>
                    <th>Nilai UAS</th>
                    <th>SKS</th>
                    <th>Total Nilai</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(siswa, index) in dataList" :key="index">
                    <td>{{ siswa.matkul }}</td>
                    <td>{{ siswa.nilaiTugas }}</td>
                    <td>{{ siswa.nilaiUTS }}</td>
                    <td>{{ siswa.nilaiUAS }}</td>
                    <td>{{ siswa.sks }}</td>
                    <td>{{ siswa.totalNilai }}</td>
                    <td>{{ siswa.grade }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Lanjutkan Kode disini -->
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            form: {
                matkul: "",
                nilaiTugas: null,
                nilaiUTS: null,
                nilaiUAS: null,
                sks: null
            },
            error: {
                matkul: '',
                tugas: '',
                uts: '',
                uas: '',
                sks: '',
            },
            dataList: []
        }
    },
    //Lanjutkan disini
    methods: {
        addData() {
            let valid = true;

            if (!this.form.matkul) {
                this.error.matkul = "Mata Kuliah gaboleh kosong";
                valid = false;
            } else {
                const isMatkulExist = this.dataList.some(data => data.matkul === this.form.matkul);
                if (isMatkulExist) {
                    this.error.matkul = "Maaf, Mata Kuliah sudah ada!";
                    valid = false;
                } else {
                    this.error.matkul = "";
                }
            }

            if (!this.form.nilaiTugas) {
                this.error.tugas = "Nilai Tugas gaboleh kosong";
                valid = false;
            } else {
                if (this.form.nilaiTugas < 0 || this.form.nilaiTugas > 100) {
                    this.error.tugas = "Maaf, Nilai hanya dari 1 - 100";
                    valid = false;
                } else {
                    this.error.tugas = "";
                }
            }

            if (!this.form.nilaiUTS) {
                this.error.uts = "Nilai UTS gaboleh kosong";
                valid = false;
            } else {
                if (this.form.nilaiUTS < 0 || this.form.nilaiUTS > 100) {
                    this.error.uts = "Maaf, Nilai hanya dari 1 - 100";
                    valid = false;
                } else {
                    this.error.uts = "";
                }
            }

            if (!this.form.nilaiUAS) {
                this.error.uas = "Nilai UAS gaboleh kosong";
                valid = false;
            } else {
                if (this.form.nilaiUAS < 0 || this.form.nilaiUAS > 100) {
                    this.error.uas = "Maaf, Nilai hanya dari 1 - 100";
                    valid = false;
                } else {
                    this.error.uas = "";
                }
            }

            if (!this.form.sks) {
                this.error.sks = "Mohon pilih SKS";
                valid = false;
            } else {
                this.error.sks = '';
            }

            if (valid) {
                const totalNilai = (this.form.nilaiTugas * 0.2) + (this.form.nilaiUTS * 0.4) + (this.form.nilaiUAS * 0.4);
                let grade = (totalNilai >= 81) ? "A" : (totalNilai >= 71) ? "AB" : (totalNilai >= 66) ? "B" : (totalNilai >= 61) ? "BC" : (totalNilai >= 56) ? "C" : (totalNilai >= 41) ? "D" : "E";
                const newData = {
                    matkul: this.form.matkul,
                    nilaiTugas: this.form.nilaiTugas,
                    nilaiUTS: this.form.nilaiUTS,
                    nilaiUAS: this.form.nilaiUAS,
                    sks: this.form.sks,
                    totalNilai: totalNilai.toFixed(2),
                    grade: grade
                };

                this.dataList.push(newData);
                this.form.matkul = "";
                this.form.nilaiTugas = null;
                this.form.nilaiUTS = null;
                this.form.nilaiUAS = null;
                this.form.sks = null;
            }
        },
    }
}
</script>
<style scoped> .container {
     max-width: 1920px;
     margin: 0 auto;
     padding: 20px;
 }

 .form-group {
     display: inline-block;
     margin-right: 10px;
 }

 .error {
     font-size: 14px;
     color: red;
     text-align: center;
 }

 label {
     text-align: left;
     display: block;
     font-weight: bold;
     margin-bottom: 5px;
 }

 input[type="text"],
 input[type="number"] {
     display: block;
     width: 80%;
     padding: 10px;
     border: 1px solid #ccc;
     border-radius: 5px;
     font-size: 16px;
     margin-top: 5px;
 }

 .input-error {
  border: 2px solid red !important;
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

 table {
     border-collapse: collapse;
     width: 100%;
     margin-top: 20px;
 }

 th,
 td {
     padding: 10px;
     text-align: center;
     border: 1px solid #ccc;
     font-size: 14px;
 }

 th:first-child,
 td:first-child {
     text-align: left;
 }

 th {
     background-color: #007bff;
     color: #fff;
     font-weight: bold;
 }

 .btn-danger {
     background-color: #dc3545;
 }

 .btn-danger:hover {
     background-color: #c82333;
 }
</style>
