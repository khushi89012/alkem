import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login, Token } from '../Redux/action.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Product = ({ id }) => {
    const [show, setShow] = useState(false);
    let product = {}
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const tokendata = JSON.parse(localStorage.getItem("persist:root"))
    let token = tokendata.partData;
    let tokStr = JSON.parse(token).token


    const [locationCode, setLocationCode] = useState("")
    const [productData, setProductData] = useState([])
    useEffect(() => {
        axios.get("https://alkemapi.indusnettechnologies.com/api/feed/dist_divisions/E?dist_id=" + id, { headers: { "Authorization": `Bearer ${tokStr}` } })
            .then((res) => {
                console.log("this is distributer data for second input feild ", res.data.data)

                setLocationCode(res.data.data[0].division_code)
                console.log(locationCode)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, tokStr])
    useEffect(() => {
        axios.get(`https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/1603?dist_id=${id}&page=1&sv=&div_code=${locationCode}&product_nm=
        `, { headers: { "Authorization": `Bearer ${tokStr}` } })
            .then((res) => {
                console.log(res.data.data)
                // setData(res.data.data)
                setProductData(res.data.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, locationCode, tokStr])



    return <>




        <div >


            {
                (<div style={{"border" : "1px solid black" , "marginTop":"10px" }}>
                    {productData.map(el => (
                        <div  style={{"border" : "1px solid black" , "marginTop":"10px" ,"padding":"10px"}} >
                            <li>Product Name :- {el.product_name}</li>
                            <li>Unit : {el.unit_description}</li>
                                   </div>

                        ))}
                </div>) }


        </div>





    </>
}
