<template>
    <div class="container">
        <form @submit.prevent="addData">
            <div class="form-group">
                <label for="matkul">Mata Kuliah:</label>
                <input type="text" id="matkul" v-model="form.matkul" />
            </div>
            <div class="form-group">
                <label for="nilaiTugas">Nilai Tugas:</label>
                <input type="number" id="nilaiTugas" v-model="form.nilaiTugas" />
            </div>
            <div class="form-group">
                <label for="nilaiUTS">Nilai UTS:</label>
                <input type="number" id="nilaiUTS" v-model="form.nilaiUTS" />
            </div>
            <div class="form-group">
                <label for="nilaiUAS">Nilai UAS:</label>
                <input type="number" id="nilaiUAS" v-model="form.nilaiUAS" />
            </div>
            <div class="form-group">
                <label for="sks">SKS:</label>
                <input type="number" id="sks" v-model="form.sks" />
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CONTOH MATKUL</td>
                    <td>100</td>
                    <td>100</td>
                    <td>100</td>
                    <td>2</td>
                    <td>100.0</td>
                    <td>A</td>
                    <td>AKSI</td>
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

            dataList: []
        }
    },
    //Lanjutkan disini
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
