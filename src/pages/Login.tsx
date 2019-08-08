import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

type Props = RouteComponentProps<any>;

export default function Login({ history }:Props) {
    const [user, setUser] = useState('');

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await api.post('/api/devs/create', { user });

        const { _id } = response.data.payload;

        history.push(`/dev/${_id}`);
    }

    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="tindev" />
          <input
            placeholder="Digite seu usúario no Github"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>


    );
}
