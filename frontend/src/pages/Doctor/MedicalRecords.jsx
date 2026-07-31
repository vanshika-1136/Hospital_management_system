import { useState, useEffect } from "react";
import {
  addMedicalRecord,
  getMedicalRecords
} from "../../api/medicalRecordApi";


function MedicalRecords() {

  const [records, setRecords] = useState([]);

  const [showModal, setShowModal] = useState(false);


  const [form, setForm] = useState({
    patientId: "",
    diagnosis: "",
    treatment: "",
    notes: ""
  });



  const fetchRecords = async () => {

    try {

      const res = await getMedicalRecords();

      setRecords(res.data.records || []);

    } catch(error) {

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchRecords();

  },[]);



  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      await addMedicalRecord(form);


      alert("Medical Record Added");


      setShowModal(false);


      setForm({
        patientId:"",
        diagnosis:"",
        treatment:"",
        notes:""
      });


      fetchRecords();


    }
    catch(error){

      console.log(error);

    }

  };




return (

<div className="p-6 bg-gray-100 min-h-screen">


{/* Header */}

<div className="flex justify-between items-center mb-6">


<div>

<h1 className="text-3xl font-bold text-gray-800">
Medical Records
</h1>


<p className="text-gray-500">
Manage patient diagnosis and treatment history
</p>

</div>



<button

onClick={()=>setShowModal(true)}

className="
bg-blue-600 
text-white 
px-5 
py-2 
rounded-lg
hover:bg-blue-700
"

>

+ Add Record

</button>


</div>





{/* Table */}

<div className="bg-white rounded-xl shadow p-5">


<table className="w-full">


<thead>

<tr className="border-b text-left">

<th className="p-3">
Patient
</th>

<th className="p-3">
Diagnosis
</th>

<th className="p-3">
Treatment
</th>

<th className="p-3">
Notes
</th>

<th className="p-3">
Date
</th>


</tr>

</thead>



<tbody>


{
records.map((record)=>(


<tr 
key={record.id}
className="border-b hover:bg-gray-50"
>


<td className="p-3">
{record.patient_id}
</td>


<td className="p-3">
{record.diagnosis}
</td>


<td className="p-3">
{record.treatment}
</td>


<td className="p-3">
{record.notes}
</td>


<td className="p-3">
{
new Date(record.created_at)
.toLocaleDateString()
}
</td>



</tr>


))

}



</tbody>


</table>



{
records.length===0 &&

<div className="text-center py-10 text-gray-500">

No medical records found

</div>

}



</div>





{/* Modal */}


{
showModal &&

<div 
className="
fixed inset-0 
bg-black/40 
flex 
items-center 
justify-center
">


<div className="
bg-white
w-96
rounded-xl
p-6
shadow-xl
">


<h2 className="
text-xl
font-bold
mb-5
">

Add Medical Record

</h2>



<form 
onSubmit={handleSubmit}
className="space-y-4"
>



<input

name="patientId"

value={form.patientId}

onChange={handleChange}

placeholder="Patient ID"

className="
w-full
border
p-3
rounded-lg
"

/>



<input

name="diagnosis"

value={form.diagnosis}

onChange={handleChange}

placeholder="Diagnosis"

className="
w-full
border
p-3
rounded-lg
"

/>



<input

name="treatment"

value={form.treatment}

onChange={handleChange}

placeholder="Treatment"

className="
w-full
border
p-3
rounded-lg
"

/>




<textarea

name="notes"

value={form.notes}

onChange={handleChange}

placeholder="Notes"

className="
w-full
border
p-3
rounded-lg
"

/>





<div className="flex justify-end gap-3">


<button

type="button"

onClick={()=>setShowModal(false)}

className="
px-4
py-2
border
rounded-lg
"

>

Cancel

</button>



<button

className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
"

>

Save

</button>



</div>


</form>


</div>


</div>

}


</div>

)

}


export default MedicalRecords;