import React, { useState, useEffect, useRef, useContext } from 'react';
import "./navbar.css";
import imgLogo from "../../Assets/Pathalogy_logo.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Model/model';
import { AuthContext } from "../../Context/authContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [clickAddTest, setClickAddTest] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgLink: "",
    fasting: "",
    normalRange: "",
    abnormalRange: ""
  });

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (clickAddTest && ref.current && !ref.current.contains(e.target)) {
        setClickAddTest(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [clickAddTest]);

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // ✅ CREATE TEST (ADMIN ONLY)
  const onClickCreate = async () => {
    try {
      const token = user?.token;

      if (!token) {
        toast.error("Login required ❌");
        return;
      }

      await axios.post(
        "http://localhost:8080/test/post",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Test Created Successfully ✅");

      setClickAddTest(false);

      setInput({
        name: "",
        description: "",
        price: "",
        imgLink: "",
        fasting: "",
        normalRange: "",
        abnormalRange: ""
      });

      window.location.reload();

    } catch (err) {
      console.log(err);
      toast.error("Failed to create test ❌");
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    logout();
    toast.success("Logged out ✅");
    navigate("/");
  };

  return (
    <div className="navbar">
      
      {/* LOGO */}
      <Link to={'/'} className="leftSideNavbar">
        <img src={imgLogo} className='imgLogoNavbar' alt="Logo" />
      </Link>

      <div className="rightSideNavbar">

        {/* ✅ ADMIN ONLY */}
        {user?.role === "admin" && (
          <div className='linksRightNavbar' onClick={() => setOpenCreate(prev => !prev)}>
            Create New
          </div>
        )}

        {/* REPORT (ADMIN ONLY) */}
        {user?.role === "admin" && (
          <Link to={'/status'} className='linksRightNavbar'>Report</Link>
        )}

        {/* ADD TEST (ADMIN ONLY) */}
        {user?.role === "admin" && (
          <div className='linksRightNavbar'>
            <div className="navLinkAddtest" onClick={() => setClickAddTest(true)}>
              Add Test
            </div>

            {clickAddTest && (
              <div className='addtest-modal' ref={ref}>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Name</div>
                  <input type='text' name='name' value={input.name} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Description</div>
                  <input type='text' name='description' value={input.description} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Price</div>
                  <input type='text' name='price' value={input.price} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Image Link</div>
                  <input type='text' name='imgLink' value={input.imgLink} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Fasting</div>
                  <input type='text' name='fasting' value={input.fasting} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Normal Range</div>
                  <input type='text' name='normalRange' value={input.normalRange} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='input-addtest-modal'>
                  <div className='inputAddtestLabel'>Abnormal Range</div>
                  <input type='text' name='abnormalRange' value={input.abnormalRange} onChange={handleInput} className='modal-input-fld' />
                </div>

                <div className='create-addtest' onClick={onClickCreate}>
                  Create
                </div>

              </div>
            )}
          </div>
        )}

        {/* LOGIN / LOGOUT */}
        {user ? (
          <div className='linksRightNavbar' onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <Link to="/login" className='linksRightNavbar'>Login</Link>
        )}

      </div>

      {/* CREATE PATIENT MODAL */}
      {openCreate && <Modal setOpenCreate={setOpenCreate} />}

    </div>
  );
};

export default Navbar;



// import React ,{useState,useEffect,useRef}from 'react'
// import "./navbar.css";
// import imgLogo from"../../Assets/Pathalogy_logo.jpg";
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Modal from '../Model/model';
// import { useContext } from "react";
// import { AuthContext } from "../../Context/authContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [openCreate,setOpenCreate]=useState(false);
//   const[clickAddTest,setClickAddTest]=useState(false);
  
//   const[input,setInput]=useState({"name":"","description":"","price":"","imgLink":"","fasting":"","normalRange":"","abnormalRange":""})
  
  
//   const ref=useRef();
//   useEffect(()=>{
//     const checkIfClickedOutside=(e)=>{
//       if(clickAddTest && ref.current &&!ref.current.contains(e.target)){
//         setClickAddTest(false);
//       }
//     }
//     document.addEventListener("mousedown",checkIfClickedOutside);
//     return ()=>{
//       document.removeEventListener("mousedown",checkIfClickedOutside);
//     }
//   },[clickAddTest])

//   const handleInput=(event)=>{
//     setInput({...input,[event.target.name]:event.target.value})
//   }
//   const onClickCreate=async()=>{
//      await axios.post("http://localhost:8080/test/post",input).then(res=>{
//       window.location.reload();
//      }).catch(err=>{
//       console.log(err);
//      })
//   }
//   return (
//     <div className="navbar">
//     <Link to={'/'} className="leftSideNavbar">
//       <img src={imgLogo} className='imgLogoNavbar' alt="Logo"/>
//       </Link>
//     <div className="rightSideNavbar">
//       <div className='linksRightNavbar'onClick={()=>{setOpenCreate(prev=>!prev)}}>
//         Create New
//       </div>
//       {/* Link for routing  */}
//       <Link to={'/status'} className='linksRightNavbar'>Report</Link>
//       <div className='linksRightNavbar'>
//         <div className="navLinkAddtest" onClick={()=>{setClickAddTest(true)}}>
//           Add Test
//         </div>

        
//         {
//           clickAddTest && <div className='addtest-modal' ref={ref}>
//           <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Name</div>
//            <input type='text' name='name' value={input.name} onChange={(e)=>{handleInput(e)}} className='modal-input-fld'/>
//           </div>

//            <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Description</div>
//            <input type='text' name='description'value={input.description} onChange={(e)=>{handleInput(e)}}  className='modal-input-fld'/>
//           </div>

//            <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Price</div>
//            <input type='text' name='price'  value={input.price} onChange={(e)=>{handleInput(e)}}  className='modal-input-fld'/>
//           </div>

//            <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Image Link</div>
//            <input type='text' name='imgLink'value={input.imgLink} onChange={(e)=>{handleInput(e)}}  className='modal-input-fld'/>
//           </div>

//            <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Fasting</div>
//            <input type='text' name='fasting'value={input.fasting}  onChange={(e)=>{handleInput(e)}}  className='modal-input-fld'/>
//           </div>

//            <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Normal Range</div>
//            <input type='text'  name='normalRange'value={input.normalRange} onChange={(e)=>{handleInput(e)}}  className='modal-input-fld'/>
//           </div>

//           <div className='input-addtest-modal'>
//            <div className='inputAddtestLabel'>Abnormal Range</div>
//            <input type='text' name='abnormalRange' value={input.abnormalRange} onChange={(e)=>{handleInput(e)}} className='modal-input-fld'/>
//           </div>
//           <div className='create-addtest' onClick={onClickCreate}>Create</div>
//         </div>
//         }
//         </div>
//     </div>

//    {
//     openCreate&& <Modal setOpenCreate={setOpenCreate}/>
//    }
//     </div>
//   )
// }

// export default Navbar;
