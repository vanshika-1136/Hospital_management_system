import {useEffect,useState} from "react";
import {
getReports,
addReport
}
from "../../api/reportApi";



function Reports(){


const [reports,setReports]=useState([]);


const [form,setForm]=useState({

patient_id:"",
report_type:"",
report_title:"",
description:"",
file_url:""

});



const loadReports=async()=>{

const res=await getReports();

setReports(res.data.reports);

}



useEffect(()=>{

loadReports();

},[]);



const submit=async(e)=>{

e.preventDefault();


await addReport(form);

alert("Report Added");

loadReports();


}



return (

<div className="p-6 bg-gray-100 min-h-screen">


<h1 className="text-3xl font-bold mb-6">
Medical Reports
</h1>



<div className="bg-white p-6 rounded-xl shadow mb-8">


<h2 className="font-bold text-xl mb-4">
Upload Report
</h2>


<form 
onSubmit={submit}
className="space-y-3"
>


<input
className="border p-3 w-full"
placeholder="Patient ID"
onChange={
e=>setForm({
...form,
patient_id:e.target.value
})
}
/>


<input
className="border p-3 w-full"
placeholder="Report Type"
onChange={
e=>setForm({
...form,
report_type:e.target.value
})
}
/>


<input
className="border p-3 w-full"
placeholder="Report Title"
onChange={
e=>setForm({
...form,
report_title:e.target.value
})
}
/>


<textarea
className="border p-3 w-full"
placeholder="Description"
onChange={
e=>setForm({
...form,
description:e.target.value
})
}
/>



<button
className="
bg-blue-600
text-white
px-5
py-2
rounded
"
>
Add Report
</button>


</form>


</div>





<div className="bg-white rounded-xl shadow p-5">


<table className="w-full">

<thead>

<tr className="border-b">

<th>Patient</th>
<th>Type</th>
<th>Title</th>
<th>Date</th>

</tr>

</thead>


<tbody>

{

reports.map(r=>(

<tr key={r.id}
className="border-b"
>

<td>
{r.patient_name}
</td>

<td>
{r.report_type}
</td>

<td>
{r.report_title}
</td>


<td>
{
new Date(r.created_at)
.toLocaleDateString()
}
</td>


</tr>

))

}


</tbody>


</table>


</div>


</div>

)


}


export default Reports;