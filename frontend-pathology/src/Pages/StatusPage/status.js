import React, { useState, useEffect } from 'react'
import './status.css'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import axios from 'axios';
 import Modal from '../../CommonComponents/Model/model';
 import { Link } from 'react-router-dom';
 import noDataImg from '../../Assets/noDataImg.jpg'

const Status = () => {

  const [activeBar, setActiveBar] = useState("Pending")
  const [data, setData] = useState([])
  const [clickedUpdate,setClickedUpdate]=useState(false);
    const [clickedPatient,setClickedPatient]=useState(null);
  // ✅ same logic, just cleaner
  useEffect(() => {
       fetchPatient();
    // setData(activeBar === "Pending" ? pendingData : completedData)
  }, [activeBar])
   
  const fetchPatient =async ()=>{
    await axios.get(`http://localhost:8080/patient/getStatus/${activeBar}`).then(res=>{
      setData(res.data.data);
      console.log(res.data.data)

    }).catch(err=>{
      console.log(err)
    })
  }
    const updateIconClick=(item)=>{
      setClickedUpdate(true)
      setClickedPatient(item);
    }


    
  const deletePatient = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  try {
    await axios.delete(`http://localhost:8080/patient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // ✅ reload AFTER delete success
    window.location.reload();

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className='statusPage'>
      <div className='statusPageWorkDiv'>

        <div className='statusBar'>
          <div
            className={`statusTitle ${activeBar === 'Pending' ? "activeBarStatus" : ""}`}
            onClick={() => setActiveBar("Pending")}
          >
            Pending
          </div>

          <div
            className={`statusTitle ${activeBar === 'Completed' ? "activeBarStatus" : ""}`}
            onClick={() => setActiveBar("Completed")}
          >
            Completed
          </div>
        </div>

        <div className='statusList'>
          {
            data && data.map((item, index) => {
              return (
                <div className='statusRowList' key={item.id}>
                  <div className='statusName'>
                    {item?.name}
                  </div>

                  <div className='statusDrDetails'>
                    <div className='statusDrName'>{item?.examinedBy}</div>
                    <div className='statusDrName'>{item?.reportDate}</div>
                  </div>

                  {/* <div className='statusBtns'>

                    {
                      activeBar==="Pending"?<div className='icons' style={{ backgroundColor: "yellowgreen" }} onClick={() => updateIconClick(item)}>
                      <EditIcon />
                    </div>:null
                    }
                    {
                      activeBar==="Pending"?<div className='icons' style={{ backgroundColor: "red" }} onClick={()=>deletePatient(item._id)}>
                      <DeleteIcon />
                    </div>:null
                    }
                    
                    <Link  to={activeBar==="Completed"?`/prescription/${item._id}`:`/report/${item._id}`} className='icons'>
                      <ArticleIcon />
                    </Link>
                  </div> */}

                  <div className='statusBtns'>

  {activeBar === "Pending" && (
    <div className='icons edit' onClick={() => updateIconClick(item)}>
      <EditIcon />
    </div>
  )}

  {activeBar === "Pending" && (
    <div className='icons delete' onClick={() => deletePatient(item._id)}>
      <DeleteIcon />
    </div>
  )}

  <Link
    to={activeBar === "Completed" ? `/prescription/${item._id}` : `/report/${item._id}`}
    className='icons view'
  >
    <ArticleIcon />
  </Link>

</div>
                </div>
              );
            })
          }
         
         {
          data.length==0 && 
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",borderRadius:"5px"}}>
          <img width={450} src={noDataImg}/>
          </div>
         }
                 
        </div>

      </div>
       {

            clickedUpdate &&<Modal item={clickedPatient} setOpenCreate={setClickedUpdate}/>
          }
    </div>
  )
}

export default Status