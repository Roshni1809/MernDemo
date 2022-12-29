import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DeleteProduct = () => {

    const [pdata, setpData] = useState([]);
    const Navigate=useNavigate()
    const DeleteItemList = []

    useEffect(() => {
        fetchData()
    }, [])

    const CkeckBoxList = (name) => {
        if(DeleteItemList.includes(name)) {
            DeleteItemList.pop(name)
            return false;
        }
        DeleteItemList.push(name)
        console.log(DeleteItemList)

        return true;
    }

    const fetchData = async () => {
        var result = await fetch('http://localhost:5000/deleteProducts', {
            method: 'POST',
            body: JSON.stringify({ ids: DeleteItemList }),
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        if(result.status != 200) {
            Navigate("/login")
        }
        result = await result.json();
        console.log(result)
        setpData(result);
    }

    const onDeletePress = async () => {
        var getData = await fetch('http://localhost:5000/deleteProducts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            },
            body : JSON.stringify({ids : DeleteItemList})
        })
        if(getData.status != 200) {
            Navigate("/login")

        }
        getData = await getData.json();
        setpData(getData);
    }


    return (
        <div className="main">
            {pdata.length > 0
                ? (<>
                    <h4>list of the products</h4>
                    <table className="table">
                        <tr className="tableRow">
                            <th className="tableRow">
                                S.No
                            </th>
                            <th className="tableRow">
                                Product
                            </th>
                            <th className="tableRow">
                                Brand
                            </th>
                            <th className="tableRow">
                                Price
                            </th>
                            <th className="tableRow">
                                Select
                            </th>

                        </tr>
                        {
                            pdata?.map((value, i) => (
                                <tr className="tableRow">
                                                                   { console.log(value)}

                                    <td className="tableRow">{i + 1}</td>
                                    <td className="tableRow">{value.name}</td>
                                    <td className="tableRow">{value.brand}</td>
                                    <td className="tableRow">{value.price}</td>
                                    <td className="tableRow">
                                    <input
                                        type="checkbox"
                                        id={i}
                                        onChange={() => CkeckBoxList(value._id)}
                                    />

                                    </td>
                                </tr>
                            ))

                        }
                    </table>
                    <button onClick={onDeletePress} className="btn">Delete</button>
                </>) : <div><h4>No products added</h4></div>
            }
        </div>

    )
}

export default DeleteProduct;