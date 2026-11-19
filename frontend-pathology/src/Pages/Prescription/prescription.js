
import React, { useState, useEffect } from "react";
import imgLogo from "../../Assets/Pathalogy_logo.jpg";
import "./prescription.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { useParams } from "react-router-dom";

const Prescription = () => {
  const { id } = useParams();

  const [patient, setPatientData] = useState(null);

  useEffect(() => {
    handleOnPageLoading();
  }, []);

  const handleOnPageLoading = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/get/${id}`
      );
      setPatientData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ PDF Download Function (Professional)
  const downLoadPdf = () => {
    const input = document.getElementById("pdfDownload");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Multi-page support
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${patient?.name}_report.pdf`);
    });
  };

  return (
    <div className="prescription">
      <div className="presdownload" id="pdfDownload">
        {/* Header */}
        <div className="header-logos">
          <img src={imgLogo} className="presc-logo" alt="logo" />

          <div className="pathologyDesc">
            <div className="namePathology">Krushna Pathology</div>
            <div className="addressDetails">
              Near Infosys, Hinjewadi Phase 2
            </div>
            <div className="mobNo">+91-9579255157</div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="patient-info">
          <div className="patient-info-row">
            <div className="info-detail">
              <div className="patient-name-attr">Name :</div>
              <div className="patient-name-value">{patient?.name}</div>
            </div>

            <div className="info-detail-age">
              <div className="patient-name-attr">Age :</div>
              <div className="patient-name-value">{patient?.age}</div>
            </div>

            <div className="info-detail">
              <div className="patient-name-attr">Address :</div>
              <div className="patient-name-value">{patient?.address}</div>
            </div>
          </div>

          <div className="patient-info-row">
            <div className="info-detail">
              <div className="patient-name-attr">Examined By :</div>
              <div className="patient-name-value">
                {patient?.examinedBy}
              </div>
            </div>

            <div className="info-detail-age">
              <div className="patient-name-attr">MobNo :</div>
              <div className="patient-name-value">
                {patient?.mobileNo}
              </div>
            </div>

            <div className="info-detail">
              <div className="patient-name-attr">Examined Date :</div>
              <div className="patient-name-value">
                {patient?.examinedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="result-section">
          <table className="table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Normal Range</th>
                <th>Unit</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {patient?.result?.map((item, index) => {
                const maxRange = item.range?.split("-")[1];
                const isAbnormal =
                  maxRange && Number(item.result) > Number(maxRange);

                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.range}</td>
                    <td>{item.unit}</td>
                    <td className={isAbnormal ? "abnormal" : ""}>
                      {item.result}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="footer-prescription">
          <div className="examinedBy">
            <div className="signature">
              <div>Tested By</div>
              <div>Dr Krushna Rathod</div>
            </div>

            <div className="signature">
              <div>Report Date</div>
              <div>{patient?.reportDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="pdf-down-btn" onClick={downLoadPdf}>
        Download PDF
      </div>
    </div>
  );
};

export default Prescription;


















// import React ,{useState,useEffect} from "react";
// import imgLogo from "../../Assets/Pathalogy_logo.jpg";
// import "./prescription.css";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import axios from "axios";
// import { useParams } from "react-router-dom";




// const Prescription = () => {
//  const{id}=useParams()

//  const [patient,setPatientData]=useState(null);
//  useEffect(()=>{
//  handleOnPageLoading();
//  },[])

//  const handleOnPageLoading=async()=>{
//   await axios.get(`http://localhost:8080/patient/get/${id}`).then(response=>{
//     const data=response.data.data;
//     setPatientData(data)
    
//     // console.log(response)
//   }).catch(err=>{
//     console.log(err);
//   })
//  }



//     const downLoadPdf = () => {
//      const input = document.getElementById("pdfDownload");

//     html2canvas(input).then((canvas) => {

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();

//       const imgWidth = 210;
//       const imgHeight =
//         (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

//       pdf.save(`name.pdf`);
//     });

//     // navigate("/");
// };
//   return (
//     <div className="prescription">
//       <div className="presdownload" id="pdfDownload">

//         {/* Header */}
//         <div className="header-logos">
//           <img src={imgLogo} className="presc-logo" alt="logo" />

//           <div className="pathologyDesc">
//             <div className="namePathology">Krushna Pathology</div>
//             <div className="addressDetails">
//               Near Infosys, Hinjewadi Phase 2
//             </div>
//             <div className="mobNo">+91-9579255157</div>
//           </div>
//         </div>

//         {/* Patient Info */}
//         <div className="patient-info">

//           <div className="patient-info-row">
//             <div className="info-detail">
//               <div className="patient-name-attr">Name :</div>
//               <div className="patient-name-value">{patient?.name}</div>
//             </div>

//             <div className="info-detail-age">
//               <div className="patient-name-attr">Age :</div>
//               <div className="patient-name-value">{patient?.age}</div>
//             </div>

//             <div className="info-detail">
//               <div className="patient-name-attr">Address :</div>
//               <div className="patient-name-value">
//                 {patient?.address}
//               </div>
//             </div>
//           </div>

//           <div className="patient-info-row">
//             <div className="info-detail">
//               <div className="patient-name-attr">Examined By :</div>
//               <div className="patient-name-value">
//                 {patient?.examinedBy}
//               </div>
//             </div>

//             <div className="info-detail-age">
//               <div className="patient-name-attr">MobNo: </div>
//               <div className="patient-name-value">
//                 {patient?.mobileNo}
//               </div>
//             </div>

//             <div className="info-detail">
//               <div className="patient-name-attr">Examined Date :</div>
//               <div className="patient-name-value">
//                 {patient?.examinedDate}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Result Section */}
//         <div className="result-section">
//           <div className="particular-test">
//             <table className="table">
//               <thead className="thead">
//                 <tr>
//                   <th></th>
//                   <th>Normal Range</th>
//                   <th>Unit</th>
//                   <th>Result</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {
//                   patient?.result?.map((item,id)=>{
//                     return(
//                  <tr className="finalPresTableRow" style={{marginBottom:"50px"}}>
//                   <td>{item.name}</td>
//                   <td>{item.range}</td>
//                   <td>{item.unit}</td>
//                   <td>{item.result}</td>
//                 </tr>

//                     );
//                   })
//                 }
              
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="footer-prescription">
//           <div className="examinedBy">
//             <div className="signature">
//               <div>Tested By</div>
//               <div>Dr Krushna Rathod</div>
//             </div>

//             <div className="signature">
//               <div>Report Date</div>
//               <div>{patient?.reportDate}</div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Download Button */}
//       <div className="pdf-down-btn" onClick={downLoadPdf}>
//         Download
//       </div>

//     </div>
//   );
// };

// export default Prescription;