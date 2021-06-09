import React, { useEffect, useState } from 'react'
import * as d3 from 'd3';
import data from './data.csv';

const App = () => {
  
  const [dataArr, setDataArr] = useState([]);
  const [toggleNameAndFav, setToggleNameAndFav] = useState(false);
  const [toggleTotal, setToggleTotal] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [search, setSearch] = useState('');
  const [today, setToday] = useState(new Date());
  
  useEffect(() => {
    d3.csv(data, function(data) { return data })
    .then(data => {
      setDataArr(data)
    })
  }, []);

  useEffect(() => {
      const timer = setInterval(() => {
          setToday(new Date())
      }, 60 * 1000);
      return () => {
        clearInterval(timer);
      } 
  }, []);


  // ##### Excerise One Start #####
  const onClick = () => {
    setToggleNameAndFav(!toggleNameAndFav)
  }

  const getNameAndFavFridge1 = (dataArr) => {

    let dataObj = {};
    let arr = [];

    dataArr.forEach(data => {
      if (!dataObj[data.Name]){
         dataObj[data.Name] = true;
         arr.push(data)
      } 
    })

      return (
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>FavoriteFridge1</strong></td>
          </tr>
          {arr.map(d => {
            return <tr>
              <td>{d.Name}</td>
              <td>{d.FavoriteFridge1}</td>
            </tr>
            })}
        </tbody>
      )
  }
  // ##### Excerise One End #####


  // ##### Excerise Two Start #####
  const onClickTotal = () => {
    setToggleTotal(!toggleTotal)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    getItemsTotalCost(search, dataArr)
  }

  const getItemsTotalCost = (search, dataArr) => {
    let arr = dataArr.filter(d => d.Name.toLowerCase().includes(search.toLowerCase()))

    let sum = arr.map(d => {
      if (d.Cost === ''){
        return 0
      } else {
        return parseInt(d.Cost)
      }
    })

    const getSum = (total, num) => {
      return total + Math.round(num)
    }

    let finalSum = sum.reduce(getSum, 0)

    return (
      <tbody>
        <tr>
          <td><strong>Name</strong></td>
          <td><strong>Item</strong></td>
          <td><strong>Price</strong></td>
        </tr>
        {arr.map(d => 
          <tr>
            <td>{d.Name}</td>
            <td>{d.Items}</td>
            <td>{d.Cost}</td>
          </tr>
          )}
          {<tr>
            <td><strong>Total:</strong></td>
            <td></td>
            <td><strong>${finalSum}</strong></td>
            </tr>}
      </tbody>
    )
  }
  // ##### Excerise Two End #####

  
  // ##### Excerise Three Start #####
  const onClickUpdate = () => {
    setToggleUpdate(!toggleUpdate)
  }

  const updateFavoriteFridge = (dataArr) => {
    let updatedData = dataArr.map(d => {
      return {
        ...d,
        FavoriteFridge1: d.FavoriteFridge2
      }
    })    

    return (
      <tbody>
        <tr>
          <td><strong>FF1 was updated!</strong></td>
        </tr>
        {updatedData.map(d =>
          <tr>
            <td>{d.FavoriteFridge1}</td>
          </tr>
          )}
      </tbody>
    )
  }

  const favoriteFridge = (dataArr) => {
    return (
      <tbody>
        <tr>
          <td><strong>FF1 is waiting to be updated...</strong></td>
        </tr>
        {dataArr.map(d =>
          <tr>
            <td>{d.FavoriteFridge1}</td>
          </tr>
        )}
      </tbody>
    )
  }
  
  // note: month (number) is one less than acutal month
  let month = today.getMonth()
  let year = today.getFullYear()
  let day = today.getDate()
  let hour = today.getHours()
  // ##### Excerise Three End #####

  return (
    <div className="App">

      {/* Excerise One Start */}
      <h2>Name and FavoriteFridge1</h2>
      <button onClick={onClick}>{toggleNameAndFav ? "Hide" : "Show"}</button>
        <table>
          {toggleNameAndFav ? getNameAndFavFridge1(dataArr) : null }
        </table>
      {/* Excerise One End */}

      {/* Excerise Two Start */}
      <h2>Names and Total</h2>
      <p>ex. Jill, Candice, Alycia</p>
      <input type="text" onChange={handleChange} value={search}></input>
      <button onClick={onClickTotal}>{toggleTotal ? "Hide" : "Show"}</button>
      <table>
        {toggleTotal ? getItemsTotalCost(search, dataArr) : null}
      </table>
      {/* Excerise Two End */}

      {/* Excerise Three Start */}
      <h2>Update FavoriteFridge1</h2>
      <button onClick={onClickUpdate}>{toggleUpdate ? "Hide" : "Show"}</button>
      <table style={{display: toggleUpdate ? '' : 'none' }}>
        {year === 2021 && month === 5 && day === 8 && hour >= 15 ? updateFavoriteFridge(dataArr) : favoriteFridge(dataArr)}
      </table>
      {/* Excerise Two End */}

    </div>
  );
}

export default App;
