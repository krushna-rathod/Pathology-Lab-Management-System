import React, { useState, useEffect } from "react";
import "./report.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const { id } = useParams();

  const [patientDetail, setpatientdetail] = useState(null);

  const [inputField, setInputField] = useState([
    { id: 0, name: "", range: "", unit: "", result: "" }
  ]);

  useEffect(() => {
    fetchDataOnLoading();
  }, []);

  const fetchDataOnLoading = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/${id}/testDetails`
      );
      const patData = response.data.patient;
      setpatientdetail(patData);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Input change
  const onChangeInput = (event, index) => {
    const updated = inputField.map((row) => {
      if (row.id === index) {
        return { ...row, [event.target.name]: event.target.value };
      }
      return row;
    });
    setInputField(updated);
  };

  // ✅ Add row
  const addinputRows = () => {
    const newRow = {
      id: inputField.length,
      name: "",
      range: "",
      unit: "",
      result: ""
    };
    setInputField([...inputField, newRow]);
  };

  // ✅ Remove row
  const removeRow = () => {
    if (inputField.length > 1) {
      setInputField(inputField.slice(0, -1));
    }
  };

//   // ✅ Submit
//   const handleFinalSubmit = async () => {
//   try {
//     const token = JSON.parse(localStorage.getItem("user"))?.token;

// await axios.put(
//   `http://localhost:8080/patient/${patientDetail._id}`,
//   {
//     ...patientDetail,
//     result: inputField,
//     status: "Completed"
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }

// )
//   //   await axios.put(
//   //     `http://localhost:8080/patient/${patientDetail._id}`,
//   //     {
//   //       ...patientDetail,
//   //       result: inputField,
//   //       status: "Completed"
//   //     }
//   //   );

//   //   // ✅ Success Toast
//   //   toast.success("Report Generated Successfully ✅");

//   // } 
// } catch (err) {
//     console.log(err);

//     // ❌ Error Toast
//     toast.error("Something went wrong ❌");
//   }
// };
const handleFinalSubmit = async () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  if (!token) {
    toast.error("Login required ❌");
    return;
  }

  const filteredData = inputField.filter(row =>
    row.name && row.range && row.unit && row.result
  );

  if (filteredData.length === 0) {
    toast.error("Please fill every Details ❌");
    return;
  }

  try {
    await axios.put(
      `http://localhost:8080/patient/${patientDetail._id}`,
      {
        ...patientDetail,
        result: filteredData,
        status: "Completed"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Report Generated Successfully ✅");

  } catch (err) {
    console.log(err);
    toast.error("Something went wrong ❌");
  }
};

  return (
    
    
    <div className="report-page">
     
      <div className="reportDiv">

        {/* HEADER */}
        <div className="report-header">
          <h2>Krushna Pathology Lab</h2>
          <span>Report Entry Panel</span>
        </div>

        {/* PATIENT INFO */}
        <div className="report-infos">
          <div><b>Name:</b> {patientDetail?.name}</div>
          <div><b>Examined By:</b> {patientDetail?.examinedBy}</div>
        </div>

        {/* TABLE */}
        <table className="report-table">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Normal Range</th>
              <th>Unit</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {inputField.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => onChangeInput(e, item.id)}
                    className="input-field"
                    placeholder="Test Name"
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="range"
                    value={item.range}
                    onChange={(e) => onChangeInput(e, item.id)}
                    className="input-field"
                    placeholder="Range"
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="unit"
                    value={item.unit}
                    onChange={(e) => onChangeInput(e, item.id)}
                    className="input-field"
                    placeholder="Unit"
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="result"
                    value={item.result}
                    onChange={(e) => onChangeInput(e, item.id)}
                    className="input-field"
                    placeholder="Result"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* BUTTONS */}
        <div className="btn-group">
          <button className="btn add-btn" onClick={addinputRows}>
            Add
          </button>

          {inputField.length > 1 && (
            <button className="btn remove-btn" onClick={removeRow}>
              Remove
            </button>
          )}

          <Link
            to={`/prescription/${id}`}
            className="btn submit-btn"
            onClick={handleFinalSubmit}
          >
            Generate Report
          </Link>
        </div>

      </div>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  
  );
};

export default Report;

// import React,{useState,useEffect} from "react";
// import "./report.css";
// import axios from "axios";
// import { Link,useParams } from "react-router-dom";

// const Report = () => {
// const{id}=useParams();
// //for creting tests
// const [patientDetail,setpatientdetail]=useState(null)
// const[testData,setTestData]=useState(null)

// useEffect(()=>{
//   fetchDataOnLoading();
// },[])

// const fetchDataOnLoading=async()=>{
//    await axios.get(`http://localhost:8080/patient/${id}/testDetails`).then(response=>{
//     console.log(response)
//     const patData=response.data.patient;
//     const testdata= response.data.test;
//     setpatientdetail(patData);
//     setTestData(testdata);
//    }).catch(err=>{
//     console.log(err);
//    })
// }

//   const[inputField,setInputField]=useState([{"id":0,"name":"","range":"","unit":"","result":""}]);
   
//   const onChangeInput=(event,index)=>{
//     const updateRow = inputField.map(row=>{
//       if(row.id==index){
//         return { ...row,[event.target.name]:event.target.value}
//       }
//       return row;
//     })
//     setInputField(updateRow)
//   }

// const addinputRows=()=>{
//   const newRow={
//     id:inputField.length+1,"name":"","range":"","unit":"","result":""

//   }
//   setInputField([...inputField,newRow])
// }
// const removeRow =()=>{
//    if(inputField.length>1){
//     setInputField(inputField.slice(0,-1));
//    }
// }


//  const handleFinalSubmit=async()=>{
//   await axios.put(`http://localhost:8080/patient/${patientDetail._id}`,
//     {
//       ...patientDetail,result:inputField,
//       status:"Completed"
//     }
//   ).then(response=>{
//         console.log(response)
         
//      }).catch(err=>{
//    console.log(err);
//      })
//  }
//   return (
//     <div className="report-page">
//       <div className="reportDiv">

//         {/* Patient Info */}
//         <div className="report-infos">
//           <div className="report-info">Name : {patientDetail?.name}</div>
//           <div className="report-info">Examined By : {patientDetail?.examinedBy}</div>
//         </div>

//         {/* Input Block */}
//         <div className="report-inputBlock">
//           <div className="report-tests">
//             <div className="nameOfTest">{testData?.name}</div>
//           </div>

//           <div className="inputRows">
//             {
//               inputField .map((item,index)=>{
//                 return(
//                   <div className="inputRow">

//               <div className="input-row-group">
//                 <div className="input-test-name">Test name</div>
//                 <input type="text" value={item.name} name="name" onChange={(e)=>{onChangeInput(e,item.id)}} className="input-feild-tests" />
//               </div>

//               <div className="input-row-group">
//                 <div className="input-test-name">Normal Range</div>
//                 <input type="text"value={item.range} name="range" onChange={(e)=>{onChangeInput(e,item.id)}} className="input-feild-tests" />
//               </div>

//               <div className="input-row-group">
//                 <div className="input-test-name">Unit</div>
//                 <input type="text" value={item.unit} name="unit"onChange={(e)=>{onChangeInput(e,item.id)}} className="input-feild-tests" />
//               </div>

//               <div className="input-row-group">
//                 <div className="input-test-name">Result</div>
//                 <input type="text" value={item.result} name="result" onChange={(e)=>{onChangeInput(e,item.id)}}  className="input-feild-tests" />
//               </div>

//             </div>
//                 )
//               })
//             }
//           </div>

//           {/* Buttons */}
//           <div className="btn-grp-add-rem">
//             <div className="add-btn-row" onClick={addinputRows}>Add</div>
//             {
//               inputField.length>1?<div className="add-btn-row" onClick={removeRow}>Remove</div>:null
//             }
//             <Link to={`/prescription/${id}`} className="add-btn-row" onClick={handleFinalSubmit}>
//             Report</Link>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Report;
