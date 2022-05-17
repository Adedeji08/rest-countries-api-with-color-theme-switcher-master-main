/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/05/2022 - 08:59:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/05/2022
    * - Author          : 
    * - Modification    : 
**/
import React from 'react';
import { useState, useEffect, useRef } from 'react'
import './Countries.css';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import Loader from './Loader';



export const Countries = () => {
    const [countriesData, setCountriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const countriesDataInputRef = useRef();
    const regionRef = useRef();

    const noCountries = countriesData.status || countriesData.message;


    const fetchCountries = (val) => {
        Axios.get(`https://restcountries.com/v3.1/all`).then(
            (res) => {
                setCountriesData([...countriesData, ...res.data]);
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        try {
            fetchCountries();
        } catch (error) {
            console.log(error)
        };
    }, []);



    const searchCountries = (val) => {
        const searchValue = countriesDataInputRef.current.value;

        if (searchValue.trim()) {
            const fetchSearch = async () => {
                const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
                const data = await response.json();

                setCountriesData(data);
            }

            try {
                fetchSearch()
            } catch (error) {
                console.log(error)
            }
        } else {
            searchCountries()
        }

    }

    const selectRegion = () => {
        const selectValue = regionRef.current.value;

        if (selectValue.trim()) {
            const fetchSelect = async () => {
                const response = await fetch(`https://restcountries.com/v3.1/region/${selectValue}`)
                const data = await response.json();

                if (selectValue === "ALL") {
                    try {
                        searchCountries()
                    } catch (error) {
                        console.log(error)
                    }
                    return;
                }
                setCountriesData(data)
            };
            try {
                fetchSelect();
            } catch (error) {
                console.log(error)
            }
        }
    };






    console.log('countries', countriesData);

    return (
        <>
            {isLoading ? <Loader /> :
                <div className='breath'>
                    <section className='grid'>

                        <form className='submitit'>
                            <FaSearch className='search' />
                            <input
                                type="text"
                                placeholder=" Search for a country..."
                                name="search"
                                id='link-text'
                                className='inputit'
                                onChange={(event) => {
                                    searchCountries(event.target.value)
                                }}
                                ref={countriesDataInputRef}
                            />

                        </form>
                        <section className='opt'>
                            <select
                                name='select'
                                className='filt'
                                ref={regionRef}
                                onChange={selectRegion}
                            >
                                <option value="" selected>Filter by Region</option>
                                <option value="Africa" selected>Africa </option>
                                <option value="America" selected>America</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe ">Europe </option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </section>

                    </section><br /><br />
                    <section className='grid1'>
                        <article className='arr1'>

                            {!noCountries ? (countriesData.map((countries, key) => {
                                return (

                                    <div className='bord' key={key}>
                                        <Link to={`/name/${countries.name.common}`}>
                                            <img src={countries.flags.png} />
                                        </Link>
                                        <div className='details'>
                                            <h5 className='count' >{countries.name.common}</h5>
                                            <p className='text' >Population: <span className='text1'>{countries.population}</span></p>
                                            <p className='text' >Region: <span className='text1'>{countries.region}</span></p>
                                            <p className='text' >Capital: <span className='text1'>{countries.capital}</span></p>
                                        </div>
                                    </div>

                                )

                            })
                            ) : (
                                <h1 className='load'>No countries found...</h1>
                            )}
                        </article>
                    </section>


                </div>
            }
        </>
    )
}




