import React, {useEffect, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';


import './style.css';
import { styles } from 'ansi-colors';

export default function Dashboard(){
    const[spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(()=> socketio('http://localhost:3333', {
        query: {user_id},
    }), [user_id]);

    useEffect(()=>{
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    },[requests, socket])

    useEffect(()=> {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard',{
                headers: {
                    user_id
                }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(req => req._id !== id));
    }

    async function handleRejection(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(req => req._id !== id));
    }


    return (
        <>

            <ul className="notification">
                {requests.map(req=>(
                    <li key={req._id}>
                        <p>
                            <strong>{req.user.email}</strong> está solicitando uma reserva em <strong>{req.spot.company}</strong> para a data: <strong>{req.date}</strong>
                        </p>
                        <button onClick={()=>handleAccept(req._id)} className="acceptButton">ACEITAR</button>
                        <button onClick={()=>handleRejection(req._id)} className="rejectionButton">REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot=>(
                    <li key ={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia`: 'Gratuito'}</span>
                    </li>
                ))}
            </ul>

            <Link to='/new'>
                <button className='btn'>Cadastrar novo spot</button>
            </Link>
        </>
    );
};