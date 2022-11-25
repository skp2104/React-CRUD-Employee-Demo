import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { CSVDownload, CSVLink} from "react-csv";
const EmpListing = () => {

    const [empdata, empdatachange] = useState([]);

    const[check,setchecked]=useState([]);

    const [checkAll, setCheckAll] = useState(false);

    const navigate = useNavigate();

  //getdata

    useEffect(() => {

        const getEmpData=async() => {

            const empreq=await fetch("http://localhost:8000/employee");

            const empres=await empreq.json();

            console.log(empres);

            empdatachange(empres);

        }

        getEmpData();

    }

 , []

    );

   

 

    const LoadDetail = (id) => {

        navigate("/employee/detail/" + id);

    }

    const LoadEdit = (id) => {

        navigate("/employee/edit/" + id);

    }

    const Removefunction = (id) => {

        if (window.confirm('Do you want to remove?')) {

            fetch("http://localhost:8000/employee/" + id, {

                method: "DELETE"

            }).then((res) => {

                alert('Removed successfully.')

                window.location.reload();

            }).catch((err) => {

                console.log(err.message)

            })

        }

    }

 

   

   

    return (

        <center>

        <div className="container">

            <div className="card cardsize">

                <div className="card-title">

                    <h2>Employee Listing</h2>

                </div>

                <div className="card-body">

            <div className="divbtn">

                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>

                    </div>

 

                    <div className="divbtn">

                       <CSVLink data={empdata} filename="Employee Data.xlsx" className="btn btn-primary">Export(↓)</CSVLink>

                    </div>

                   

                   

                    <div className="divbtn">

                        <button className="btn btn-danger">Remove(-)</button>

                    </div>

                   

                    <table className="table table-bordered table table-hover fixed_header">

                        <thead className="bg-dark text-white stickheader">

                            <tr>

                                <td><input type="checkbox"

                                onChange={ e=>{

                                    let checked=e.target.checked;

                                    empdatachange(empdata.map(d=>{

                                        d.select=checked;

                                       

                                        return d;

                                       

                                       

                                    }));

                                }}/> ID</td>

                                <td>Name</td>

                                <td>Email</td>

                                <td>Phone</td>

                                <td>Action</td>

                            </tr>

                        </thead>

                        <tbody>

 

                            {

                                empdata.map(item => (

                                    <tr key={item.id}>

                                        <td>

                                            <input

                                             type="checkbox" checked={item.select}/> {item.id}</td>

                                        <td>{item.name}</td>

                                        <td>{item.email}</td>

                                        <td>{item.phone}</td>

                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>

                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>

                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>

                                        </td>

                                    </tr>

                                ))

                            }

 

                        </tbody>

 

                    </table>

                   

                   

                </div>

            </div>

        </div>

        </center>

    );

}

 

export default EmpListing;

 
