import {useState,useEffect} from 'react'
import axios from 'axios';
import AdSense from 'react-adsense';
import './App.css';

function App(){
  //creating IP state
  const [ip,setIP] = useState({});
  const [errors, setErrors] = useState()
  
  //creating function to load ip address from the API
  const getData = async()=>{
    try {
      const res = await axios.get('https://get.geojs.io/v1/ip/geo.json')
      console.log(res.data);
      setIP(res.data)      
    } catch (error) {
      if(error.code==="ERR_NETWORK"){
        setErrors("Sem conexão com a internet")
      }
    }
  }
  
  useEffect(()=>{
      //passing getData method to the lifecycle method
      getData()
  },[])
  
  return (
    <div className = "App">
        {errors ? (
          <div>{errors}</div>
          ) : (
          <>
          {/* <AdSense.Google
            client='ca-pub-6290466418969499'
            slot='4706454978'
          /> */}
          <div className='boxSuperior'>
            <h2>Seu IP é</h2>
            <h4>{ip.ip}</h4>
          </div>
          <table className="table table-striped table-hover tableCentered">
            <thead>
            </thead>
            <tbody>
              <tr><td>País</td><td>{ip.country} [{ip.country_code}]</td></tr>
              <tr><td>Cidade</td><td>{ip.city}</td></tr>
              <tr><td>Região</td><td>{ip.region}</td></tr>
              <tr><td>Latitude</td><td>{ip.latitude}</td></tr>
              <tr><td>Longitude</td><td>{ip.longitude}</td></tr>
              <tr><td>Timezone</td><td>{ip.timezone}</td></tr>
              <tr><td>Company</td><td>{ip.organization_name}</td></tr>
            </tbody>
          </table>
          {/* <div>
            <iframe src='https://maps.google.com/maps?q=${ip.latitude},${ip.longitude}&amp;z=15&amp;output=embed' id="iframeId" height="500px" width="100%"></iframe>
          </div> */}
          </>
        )}
    </div>
  )
}

export default App;