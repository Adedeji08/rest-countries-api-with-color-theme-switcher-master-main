/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/05/2022 - 09:00:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/05/2022
    * - Author          : 
    * - Modification    : 
**/
import React from 'react'
import loader from './img.gif'

function Loader() {
    return (
        <div>
            <img src={loader} className="loader" width="50px" height="50px" alt='...loading'/>
        </div>
    )
}

export default Loader
