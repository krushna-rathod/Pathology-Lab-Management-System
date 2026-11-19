import React,{useEffect,useState}from 'react'
import './homeScreen.css';
import labPic from '../../Assets/scientist img.webp';
import data from './data.json';
import Modal from '../../CommonComponents/Model/model';
import Footer from '../../CommonComponents/Footer/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomeScreen = () => {
  const [listOfTest,setListOfTest]=useState([]);
  const[clickAddTest,setClickAddTest]=useState(false);
  const[activeIndexNav,setActiveIndexNav]=useState(0);
  const[selectedDetailedTest,setSelectedDetailedTest]=useState(null);
  useEffect(()=>{
    fetchDataOnLoading();

    // console.log(selectedDetailedTest)
    // setListOfTest(data.data);
  },[])


  //handle contact form
  const [contactData, setContactData] = useState({
  email: "",
  name: "",
  mobile: "",
  message: ""
});

// handle input
const handleContactChange = (e) => {
  setContactData({
    ...contactData,
    [e.target.name]: e.target.value
  });
};

// submit form
const handleContactSubmit = async () => {
  try {
    if (!contactData.email || !contactData.name || !contactData.message) {
      toast.error("Please fill all fields ❌");
      return;
    }

    await axios.post("http://localhost:8080/contact", contactData);

    toast.success("Message Sent Successfully ✅");

    setContactData({
      email: "",
      name: "",
      mobile: "",
      message: ""
    });

  } catch (err) {
    console.log(err);
    toast.error("Something went wrong ❌");
  }
};


const fetchDataOnLoading = async () => {
  try {
    const response = await axios.get("http://localhost:8080/test/get");

    console.log(response.data);

    const data = response.data.data || response.data;

    setListOfTest(data);

    if (data && data.length > 0) {
      setSelectedDetailedTest(data[0]);
    }

  } catch (err) {
    console.log(err);
  }
};
  //for printing the index
  const handleClickNavLink=(index)=>{
    setActiveIndexNav(index);
    setSelectedDetailedTest(listOfTest[index])
  }
  // console.log(activeIndexNav);
  const handleClosePopup=(val)=>{
    setClickAddTest(val)
  }


  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
  
   <div className='homescreen'>
    <div className='introHomeScreen'>
      <div className='imgHomeScreenLogo'>
       <div className='imgDiv'>
        <img className='labLogoHomeScreen' src={labPic} alt='lapPic'/>
       </div>
       <div className='introPart'>
  <div className='titleMini'>Enterprices Limited</div>
  <div className='titleMajor'>Pathalogy Management System</div>
  <div className='description1'>The Pathology Lab Management System website is designed to provide complete information about the laboratory and its diagnostic services. It helps patients learn about different medical tests such as blood tests, urine tests, and other health checkups offered by the lab. 
    The website also provides details about the laboratory facilities, available services, and the importance of regular medical testing for maintaining good health.</div>
  <div className='description2'>A Pathology Lab Management System is a software application designed to automate
     and manage laboratory operations such as patient registration,
      test management, report generation, and billing. It helps laboratories reduce
       manual work, maintain accurate records, and generate reports quickly.
        The system stores patient data digitally and allows lab staff to track samples
         and test results efficiently.”
     </div>
     <div className='topBtnDiv'>
      <div className='btns-div' onClick={()=>setClickAddTest(true)}>Create</div>
      <div className='btns-div'> 
       <a style={{textDecoration:"none",color:"black"}} href='#contact'>Contact</a> 
        </div>
     </div>
       </div>
      </div>
    </div>
    <div className='testHomeScreen'>
            <div className='leftPartTest'>
             <div className='totalTest'>{listOfTest.length} Test Available</div>
              <div className='testNameDiv'>
                {
                  listOfTest?.map((item,index)=>{
                    return (
                          <div onClick={
                            ()=>{
                              handleClickNavLink(index)
                            }
                          } //click karne ke baad background colur pause ho jana chahiye
                          className={`testNameTitle ${activeIndexNav===index?"activeNavLink":null}`}>{item.name}</div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='rightPartTest'>
              <div className='topRightPart'>
                {selectedDetailedTest?.name}
              </div>
               <div className='bottomRightPart'>
                <div className='topBottomRightPart'>
                 {selectedDetailedTest?.description}
                </div>
                 <div className='bottomBottomRightPart'>
                  <div className='bBRightPartLeftSide'>
                 <div className='detailsBlock'>
                  {"Fasting"}:<span className='spanColrChange'>{selectedDetailedTest?.fasting}</span>
                     </div>
                     <div className='detailsBlock'>
                  {"Abnormal Range"}:<span className='spanColrChange'>{selectedDetailedTest?.abnormalRange}</span>
                     </div>
                     <div className='detailsBlock'>
                  {"Normal Range"}:<span className='spanColrChange'>{selectedDetailedTest?.normalRange}</span>
                     </div>
                     <div className='detailsBlock'>
                  {"Price"}:<span className='spanColrChange'>{selectedDetailedTest?.price}</span>
                     </div>

                  </div>
                  <div className='bBRightPartRightSide'>
                    <img src={selectedDetailedTest?.imgLink}alt='pic' className='bBRightImage'/>
                  </div>
                 </div>
               </div>
            </div>
    </div>


    {/* Contact FORM */}
<div className="contactHomeScreen">
  <div className="contactFormTitle" id="contact">
    Contact Us
  </div>

  <div className="contactForm">
    <div className="inputFields">

      <input
  type="email"
  name="email"
  value={contactData.email}
  onChange={handleContactChange}
  className="inputFieldsBox"
  placeholder="Enter your Email Id"
/>

      <input
  type="text"
  name="name"
  value={contactData.name}
  onChange={handleContactChange}
  className="inputFieldsBox"
  placeholder="Enter your Name"
/>

     <input
  type="number"
  name="mobile"
  value={contactData.mobile}
  onChange={handleContactChange}
  className="inputFieldsBox"
  placeholder="Enter your Mobile Number"
/>

<textarea
  name="message"
  value={contactData.message}
  onChange={handleContactChange}
  className="inputTextareaMessage"
  rows={5}
></textarea>

    </div>

   <button className="sendEmailButton" onClick={handleContactSubmit}>
  Send Message
</button>
  </div>
</div>
<Footer/>
{
  clickAddTest && <Modal setOpenCreate={handleClosePopup}/>
}
</div>
</>
   
  )
}



export default HomeScreen

