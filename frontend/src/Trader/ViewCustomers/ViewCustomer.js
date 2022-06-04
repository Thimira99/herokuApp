import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import TraderNavbar from '../TraderNavbar';


function ViewCustomer() {
    const url = "http://localhost:3000/customer/";
    const [customer, setcustomer] = useState([]);

    function getData() {
        function getAllCustomers() {
            axios.get(url).then((res) => {
                setcustomer(res.data);
            }).catch((error) => {
                alert(error);
            })
        }

        getAllCustomers();

    }



    return (
        <div>
            <TraderNavbar />
            <div>
                <button className='btn btn-primary' onClick={getData}>Click to get</button>
                <div style={{ marginLeft: '600px' }} >
                    <table border='1px'>
                        <tr >
                            <th style={{ border: '1px solid black' }}>First Name</th>
                            <th style={{ border: '1px solid black' }}>Last Name</th>
                            <th style={{ border: '1px solid black' }}>Phone Number</th>
                            <th style={{ border: '1px solid black' }}>Address</th>
                        </tr>
                        {customer.map((value) => (

                            <tr style={{ border: '1px solid black' }}>
                                <td style={{ border: '1px solid black' }}>{value.firstname}</td>
                                <td style={{ border: '1px solid black' }}>{value.lastname}</td>
                                <td style={{ border: '1px solid black' }}>{value.phoneNumber}</td>
                                <td style={{ border: '1px solid black' }}>{value.address}</td>
                            </tr>
                        ))}

                    </table>
                </div>

                <br />


            </div>
        </div>

    )
}

export default ViewCustomer;