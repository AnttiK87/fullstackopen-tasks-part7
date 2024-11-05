import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  
export const useCountry = (name) => {
    //console.log(name)
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
    const [country, setCountry] = useState(null)
   
    useEffect(() => {
        if (!name) return

        const fetchCountry = async () => {
            try {
                const response = await axios.get(`${baseUrl}/name/${name}`)
                setCountry(response.data)
            } catch (error) {
                //console.error('Error fetching country:', error)
                setCountry('not found')
            }
        }
        fetchCountry()
    }, [name])
  
    //console.log(country)
    return country
}