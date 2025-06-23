import React, { useState } from 'react'
import '../css/currency.css';
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';

let base_url="https://api.freecurrencyapi.com/v1/latest";
let api_key="fca_live_YBOIzKyPzyGkksLAcnJNbtswDII4fVN4x4Snv8FJ";
//onChange={(e)=>setAmount(e.target.value)} burada e.target.value anlamı inputların içine girip value al onları amounta setle gibi içindeki değerle eşleştirildi yani
// Ekranda görünen her bir değer için state tanımladık
function Currency() {
  const[amount,setAmount]=useState();
  //use state içine default değerleri verildi 
  const[fromCurrency,setFromCurrency]=useState('USD');
  const[toCurrency,setToCurrency]=useState('TRY');
  const[result,setResult]=useState(0);



  const exchange= async()=>{
    const response =await axios.get(`${base_url}?apikey=${api_key}&base_currency=${fromCurrency}`); //get ile erişim
    const result=(response.data.data[toCurrency]*amount).toFixed(3);// data içinde tekrar data kısmı var ondan iki kez diyoruz anxious ile data ile çekiliyor ondan 1. data ansioux tan geliyor 2. data veride tanımlanmış hali
    //data[toCurrency] dönüştürülmek istenen veri tipi ile data içindeki veri tipi eşleştirimesi yapılıyor mapleniyor
    setResult(result);
  }

  return (
    <div className='currency-div'>
      <div className='caption'>
        <h3 >DÖVİZ KURU UYGULAMASI</h3>
      </div>
      <div className='currency-calc'>
        <input 
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        type="number" className='amount'/>

        <select 
        onChange={(e)=>setFromCurrency(e.target.value)}
        className='from-currency-option'>
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
        </select>
        <FaArrowRightLong className='arrow'/>
        <select
        onChange={(e)=>setToCurrency(e.target.value)}
         className='to-currency-option'>
            <option>TRY</option>
            <option>EUR</option>
            <option>USD</option>
        </select>
        <input
       value={result}
       onChange={(e) => setResult(e.target.value)}
        type="number" className='result'/>
        </div>
        <div>
          <button 
          //butona basılınca exchange metoda git
          onClick={exchange}
          className='exchange-button'>Çevir</button>
        </div>
    </div>
  )
}

export default Currency