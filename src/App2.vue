<template>
    <div class="container">
        <form @submit.prevent="addData">
            <base-input type="text" v-model="form.matkul" label="Mata Kuliah">
                <template #error>
                    <span v-if="error.matkul" class="error">{{ error.matkul }}</span>
                </template>
            </base-input>
            <base-input type="number" v-model="form.nilaiTugas" label="Nilai Tugas">
                <template #error>
                    <span v-if="error.tugas" class="error">{{ error.tugas }}</span>
                </template>
            </base-input>
            <base-input type="number" v-model="form.nilaiUTS" label="Nilai UTS">
                <template #error>
                    <span v-if="error.uts" class="error">{{ error.uts }}</span>
                </template>
            </base-input>
            <base-input type="number" v-model="form.nilaiUAS" label="Nilai UAS">
                <template #error>
                    <span v-if="error.uas" class="error">{{ error.uas }}</span>
                </template>
            </base-input>
            <base-select label="SKS" v-model="form.sks" :options="sksOptions" placeholder="-Pilih SKS-">
                <template #error>
                    <span v-if="error.sks" class="error">{{ error.sks }}</span>
                </template>
            </base-select>
            <base-radio-group label="Semester" name="semester" :options="semesterOptions" v-model="form.semester">
                <template #error>
                    <span v-if="error.semester" class="error">{{ error.semester }}</span>
                </template>
            </base-radio-group>
            <div class="form-group">
                <label>Hide</label>
                <div>
                    <base-checkbox label="Yes" v-model="form.isHidden"></base-checkbox>
                </div>
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
                    <th>Semester</th>
                    <th>Rata-Rata</th>
                    <th>Grade</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(siswa, index) in dataList" :key="index">
                    <td>{{ siswa.matkul }}</td>
                    <td>{{ siswa.nilaiTugas }}</td>
                    <td>{{ siswa.nilaiUTS }}</td>
                    <td>{{ siswa.nilaiUAS }}</td>
                    <td>{{ siswa.sks }}</td>
                    <td>{{ siswa.semester }}</td>
                    <td>{{ (siswa.isHidden) ? 'Hidden' : siswa.totalNilai }}</td>
                    <td>{{ siswa.grade }}</td>
                    <td>
                        <button @click="deleteData(index)" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Lanjutkan Kode disini -->
        <div>
            <h2>JIKA INGIN TAU IPK</h2>
            <button @click="findIPK" type="submit" class="btn btn-primary">IPK</button>
            <br />
            <span style="color: red;" v-if="ipk">{{ ipk }}</span>
        </div>
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
                sks: null,
                semester: '',
                isHidden: false
            },
            ipk: null,
            error: {
                matkul: '',
                tugas: '',
                uts: '',
                uas: '',
                sks: '',
                semester: ''
            },
            dataList: [],
            sksOptions: [
                { value: 1, label: 1 },
                { value: 2, label: 2 },
            ],
            semesterOptions: [
                { text: "Reguler", value: 'Reguler' },
                { text: "Antara", value: 'Antara' },
            ]
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

            if (!this.form.semester) {
                this.error.semester = "Mohon Pilih Salah Satu";
                valid = false;
            } else {
                this.error.semester = '';
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
                    semester: this.form.semester,
                    totalNilai: totalNilai.toFixed(2),
                    grade: grade,
                    isHidden: this.form.isHidden
                };

                this.dataList.push(newData);
                this.form.matkul = "";
                this.form.nilaiTugas = null;
                this.form.nilaiUTS = null;
                this.form.nilaiUAS = null;
                this.form.sks = null;
                this.form.semester = '';
                this.form.isHidden = false;
                this.ipk = null;
            }
        },
        deleteData(index) {
            this.dataList.splice(index, 1);
            this.ipk = null;
        },
        //Lanjutkan disini
        findIPK() {
            let totalGrade = 0;
            let totalSKS = 0;

            this.dataList.forEach(siswa => {
                const grade = siswa.grade;
                const sks = siswa.sks;

                switch (grade) {
                    case 'A':
                        totalGrade += 4 * sks;
                        break;
                    case 'AB':
                        totalGrade += 3.5 * sks;
                        break;
                    case 'B':
                        totalGrade += 3 * sks;
                        break;
                    case 'BC':
                        totalGrade += 2.5 * sks;
                        break;
                    case 'C':
                        totalGrade += 2 * sks;
                        break;
                    case 'D':
                        totalGrade += 1 * sks;
                        break;
                    default:
                        totalGrade += 0;
                        break;
                }

                totalSKS += sks;
            });

            if (totalSKS === 0) {
                this.ipk = "Tidak ada data mata kuliah";
            } else {
                const ipk = totalGrade / totalSKS;
                this.ipk = `${ipk.toFixed(2)}`;
            }
        }
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

 label {
     text-align: left;
     display: block;
     font-weight: bold;
     margin-bottom: 5px;
 }

 .error {
     font-size: 14px;
     color: red;
     text-align: center;
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
