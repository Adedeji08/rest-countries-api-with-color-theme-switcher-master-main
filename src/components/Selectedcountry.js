import React from 'react'
import { useState, useEffect } from 'react';
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Selectedcountry.css";



const Selectedcountry = () => {
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { slug: countryName } = useParams()
    const { params } = useParams()
    const navigate = useNavigate()

    let goBack = () => {
        navigate("/");
    };

    const getCountry = (val) => {
        Axios.get(`https://restcountries.com/v2/name/${countryName}`).then(
            (res) => {
                setCountry([...country, ...res.data]);
                setIsLoading(false);
            }
        )
    }
    console.log(country);


    useEffect(() => {
        getCountry()
    }, [])

    return (

        <>
            {isLoading ? <h1 className='load'>LOADING...</h1> :
                <section className='grids'>
                    <div>
                        {
                            country.map((countries, key) => {
                                const {
                                    borders
                                } = countries
                                return (
                                    <>
                                        <Link to={`/`}><button onClick={goBack} className='back'>&larr; Back</button>
                                        </Link><br /><br />

                                        <img className='imgg' src={countries.flags.png} />
                                        <div className='arr3' key={key}>

                                            <div>
                                                <h2 className='count'>{countries.name.common}</h2>
                                                <p className='text2'>Native Name: <span className='text3'>{countries.alpha3Code || 'Not Available'}</span></p>
                                                <p className='text2'>Population: <span className='text3'>{countries.population || 'Not Available'}</span></p>
                                                <p className='text2'>Region: <span className='text3'>{countries.region || 'Not Available'}</span></p>
                                                <p className='text2'>Sub Region: <span className='text3'>{countries.subregion || 'Not Available'}</span></p>
                                                <p className='text2'>Capital: <span className='text3'>{countries.capital || 'Not Available'}</span></p>
                                            </div>
                                            <div className='down'>
                                                <p className='text2'>Top Level Domain: <span className='text3'>{countries.tld || 'Not Available'}</span></p>
                                                <p className='text2'>Currencies: <span className='text1'>{countries.EUR || 'Not Available'}</span></p>
                                                <p className='text2'>Languages: <span className='text1'>{countries.languages.deu || 'Not Available'}</span></p>
                                            </div>
                                           
                                            <div className="forward">
                                            <p className='text-me'>Border Countries:</p>
                                            {borders.map((countries) => {
                                                return (
                                                 <button className='ice'>{countries || 'Not Available'}</button>
                                                )
                                            })}
                                    </div>

                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                    

                </section>
                
            }
            
        </>
    )
}

export default Selectedcountry
