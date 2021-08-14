import React, { Component } from 'react'
import bag from '../assets/bag.jpg'
import sneaker from '../assets/Sneaker.png'
import watch from '../assets/watch.jpg'
import axios from 'axios';

const itemData = [
    {img:sneaker,title:"Nike Casual Show",price:"85.00"},
    {img:bag,title:"Nike Bag",price:"95.00"},
    {img:watch,title:"Nike Watch",price:"100.00"}]
class ProductView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            conversion_rates: 1
        }
    }
    handleCurrency = (e) => {
        let exchangeRate = "INR";
        switch(e.target.value) {
            case "USD" : exchangeRate = "USD";break;
        }
        if (exchangeRate != "INR") {
            axios({
                method:'get',
                url:`https://v6.exchangerate-api.com/v6/17d425e62402531e0afe4c59/latest/${exchangeRate}`
            }).then((resp)=>this.setState({conversion_rates:resp.data.conversion_rates["INR"]}));
        }
        else {
            this.setState({
                conversion_rates: 1
            })
        }
    }    
    render() {
        console.log(this.state.conversion_rates)
        return (
            <div className={"product-list"} style={{display:"inline-flex",marginTop:"150px"}}>
                
                {itemData.map((item,index)=>{
                    return <div style={{width:'250px',height:'250px'}} key={`${item.title}-${index}`}><img src={item.img} style={{border: "1px solid #ddd", borderRadius: "4px",padding: "5px",width: "150px", height: "150px"}}/>
                        <h2>{item.title}</h2>
                        <h3>{item.price*this.state.conversion_rates}</h3>
                    </div>
                })}
                <div>
                    <select onChange={(e) => this.handleCurrency(e)}>
                        <option value={"INR"}>INR</option>
                        <option value={"USD"}>USD</option>
                    </select>
                </div>
            </div>
        )
    }
}
export default ProductView
