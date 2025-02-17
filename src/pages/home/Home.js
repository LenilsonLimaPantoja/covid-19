import axios from 'axios';
import './Home.scss';
import { FaGithub, FaReact, FaYoutube } from "react-icons/fa";
import { SiSass, SiAxios } from "react-icons/si";

import { useEffect, useState } from 'react';
const Home = () => {
    const [paises, setPaises] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [paisSelect, setPaisSelect] = useState('BRA');
    const [provinciaSelect, setProvinciaSelect] = useState('');
    const [casos, setCasos] = useState({});
    const [loading, setLoading] = useState(false);
    const handlePaises = async () => {
        const response = await axios.get('https://covid-api.com/api/regions');
        setPaises(response.data.data);
    }

    const handlePaisesProvincias = async () => {
        setProvinciaSelect('');
        const response = await axios.get(`https://covid-api.com/api/provinces/${paisSelect}`);
        setProvincias(response.data.data);
    }

    const handlePaisesCasos = async () => {
        setLoading(true);
        let url = provinciaSelect ? `https://covid-api.com/api/reports?iso=${paisSelect}&q=${provinciaSelect}` : `https://covid-api.com/api/reports/total?iso=${paisSelect}`
        const response = await axios.get(url);
        console.log(response.data.data[0]);
        setCasos(provinciaSelect ? response.data.data[0] : response.data.data);
        setLoading(false);
    }

    useEffect(() => {
        handlePaises();
    }, []);

    useEffect(() => {
        handlePaisesProvincias();
    }, [paisSelect]);

    useEffect(() => {
        handlePaisesCasos();
    }, [provinciaSelect, paisSelect]);

    return (
        <div className='container-home'>
            <div className='area-home'>
                <div className='card-1'>
                    <h1>Estatísticas do COVID-19</h1>
                    <div>
                        <select onChange={(e) => setPaisSelect(e.target.value)} value={paisSelect}>
                            {paises?.map((item, index) => (
                                <option key={index} value={item?.iso}>{item?.name}</option>
                            ))}
                        </select>
                        <select onChange={(e) => setProvinciaSelect(e.target.value)} defaultValue={provinciaSelect}>
                            {provincias?.map((item, index) => (
                                <option key={index} value={item?.province}>{item?.province}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='body-cards'>
                    <div className='card'>
                        <span className='span-1'>{loading ? <div className='loading'></div> : casos?.confirmed || 0}</span>
                        <span>Confirmados</span>
                    </div>
                    <div className='card'>
                        <span className='span-1'>{loading ? <div className='loading'></div> : casos?.active || 0}</span>
                        <span>Ativos</span>
                    </div>
                    <div className='card'>
                        <span className='span-1'>{loading ? <div className='loading'></div> : casos?.deaths || 0}</span>
                        <span>Mortes</span>
                    </div>
                    <div className='card'>
                        <span className='span-1'>{loading ? <div className='loading'></div> : casos?.fatality_rate || 0}</span>
                        <span>Taxa de letalidade</span>
                    </div>
                </div>
                <div className='card-1 footer'>
                    <a target='_blank' href='https://github.com/LenilsonLimaPantoja/covid-19.git'>
                        <FaGithub />
                    </a>
                    <a target='_blank' href='https://react.dev/'>
                        <FaReact />
                    </a>
                    <a target='_blank' href='https://axios-http.com/ptbr/docs/intro'>
                        <SiAxios />
                    </a>
                    <a target='_blank' href='https://www.youtube.com/@lenilsonlima712'>
                        <FaYoutube />
                    </a>
                    <a target='_blank' href='https://sass-lang.com/'>
                        <SiSass />
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Home;