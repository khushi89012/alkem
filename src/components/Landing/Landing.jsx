
import {useNavigate} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login ,Token} from '../Redux/action.js'
import axios  from 'axios'
import { useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Division} from './Division'
import {Location} from './Location'
import {Product} from './product.jsx'
import Topnav from './Navbar'
export const Landing = ()=>{
  const [show, setShow] = useState(false);
const [name,setName] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const navigate = useNavigate()
const api = "https://alkemapi.indusnettechnologies.com/api/distributor/distributor_list/E?dn=&page_no=1"
const tokendata = JSON.parse(localStorage.getItem("persist:root"))
let token = tokendata.partData;
let tokStr = JSON.parse(token).token

const [data, setData] = useState([])

const [locationCode, setLocationCode] = useState("")
const [locationData, setLocationData] = useState([])


useEffect(()=>{
    axios.get(api,{ headers: {"Authorization" : `Bearer ${tokStr}`} } )
        .then((res)=>{
            // console.log(res.data.data)
            setData(res.data.data)
         
        
        })
        .catch((err)=>{
            console.log(err)
        })
},[])


const handleClick = ()=>{
    localStorage.clear()
    navigate("/")
}



const [distributor, setDistributor] = useState(0)
const [distributorData, setDistributorData] = useState([])




const changedValue = (e)=>{
  setDistributor(e.target.value)
  setName(e.data.customer_name)
  handleClose()


}







    return <div>
      <Topnav logout={handleClick}/>
      <br></br>
    <div>
    
      
    </div>
    <select  style={{"padding" :"7px","marginLeft":"10px"}}   variant="primary" onClick={handleShow}>
      <option> {name ? name : "select distributer"}</option>
      
      </select>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Distributer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div name="distributor" id="distributor" value={distributor} >
          <input type ="text" placeholder="Distributor"/>
          <ul>
          {data.map((el,i)=>(
           
           <li>
            <input type="radio" key={i} value={el.customer_code} name={el.location} onClick={(e)=>changedValue(e)}/>
           {el.customer_name} - {el.customer_code} ({el.location})
           </li>

       ))}
          </ul>
           
        </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

 <Division id={distributor}/>

 <Location id={distributor}/> 
<Product id={distributor}/>

      </div>
}














































