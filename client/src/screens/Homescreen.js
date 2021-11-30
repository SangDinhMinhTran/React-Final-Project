import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import moment from "moment";

import axios from "axios";
import Loader from "../components/Loader";
import Room from "../components/Room";
import { DatePicker, Space } from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const { RangePicker } = DatePicker;
function Homescreen() {
  const [hotels, sethotels] = useState([]);
  const [duplicatehotes, setduplicatehotes] = useState([]);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('')
  const [loading, setloading] = useState(false);
  const [searchkey, setsearchkey] = useState('')
  const[type , settype]=useState('all')
  const[amenities , setamenities]=useState('all')
  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))

    var temp=[]
    for (var room of duplicatehotes) {
      var availability = false;

      for (var booking of room.currentbookings) {

        if(room.currentbookings.length)
        {
          if (
            !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
            !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
          ) {
            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true;
            }
          }
        }


      }
      if(availability || room.currentbookings.length==0)
      {
        temp.push(room)
      }
      sethotels(temp)
    }

  }

  useEffect(async () => {
    try {
      setloading(true);
      const rooms = await (await axios.get("/api/rooms/getallrooms")).data;
      console.log(rooms);
      sethotels(rooms);
      setduplicatehotes(rooms)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);

  function filterBySearch()
  {
    const dupdate = duplicatehotes.filter(room=>room.name.toLowerCase().includes(searchkey))
    sethotels(dupdate)
  }

  function filterByType(e)
  {
    settype(e)
    if(e!=='all'){
      const dupdate = duplicatehotes.filter(room=>room.type.toLowerCase().includes(e.toLowerCase()))
      sethotels(dupdate)
    }
    else{
      sethotels(duplicatehotes)
    }

  }

  function filterByAmenities(e)
  {
    setamenities(e)
    if(e!=='all'){
      const dupdate = duplicatehotes.filter(room=>room.amenities.filter( amenity => amenity.includes(e.toLowerCase())))
      sethotels(dupdate)
    }
    else{
      sethotels(duplicatehotes)
    }

  }

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            Check-in and Check-out
          </div>
          <div className="col-md-4">
            Search
          </div>
          <div className="col-md-2">
            Room Type
          </div>
          <div className="col-md-2">
            Amenities
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <RangePicker style={{ height: "38px" }} onChange={filterByDate} format='DD-MM-YYYY' className='m-2'/>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='Search Rooms'
              value={searchkey}
              onKeyUp={filterBySearch}
              onChange={(e)=>{setsearchkey(e.target.value)}}
            />
          </div>
          <div className="col-md-2">
            <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >

            <option value="all">All</option>
              <option value="standard">Standard</option>
              <option value="Queen">Queen</option>
              <option value="King">King</option>

            </select>
          </div>
          <div className="col-md-2">
            <select className="form-control m-2" value={amenities} onChange={(e)=>{filterByAmenities(e.target.value)}} >

            <option value="all">All</option>
              <option value="pool">Pool</option>
              <option value="gym">Gym</option>
              <option value="spa">Spa</option>
              <option value="business office">Business Office</option>
            </select>
          </div>

        </div>
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          hotels.map((room) => {
            return (
              <div className="col-md-8" data-aos='zoom-in'>
                <Room room={room} fromdate={fromdate} todate={todate}/>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
