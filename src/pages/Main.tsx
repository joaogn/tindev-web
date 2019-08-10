import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { RouteComponentProps, Link } from 'react-router-dom';
import './Main.css';


import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

interface User {
    _id: string;
    name: string,
    user: string,
    bio?: string,
    avatar: string,
}

type Props = RouteComponentProps<any>;

export default function Main({ match }:Props) {
    const [users, setUsers] = useState<User[]>([]);
    const [matchDev, setMatchDev] = useState< User | null >(null);

    useEffect(() => {
      const socket = io('http://localhost:3333', {
        query: { user: match.params.id },
      });

      socket.on('match', (dev:User) => {
        setMatchDev(dev);
      });
    }, [match.params.id]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/api/devs/all', {
                headers: {
                    user: match.params.id,
                },
            });
         setUsers(response.data.payload);
        }
        loadUsers();
    }, [match.params.id]);

    async function handleLike(id:string) {
        await api.post(`/api/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id,
            },
        });
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDisLike(id:string) {
        await api.post(`/api/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id,
            },
        });
        setUsers(users.filter(user => user._id !== id));
    }
    return (
      <div className="main-container">
        <Link to="/">
          <img src={logo} alt="tindev" />
        </Link>
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleDisLike(user._id)}>
                    <img src={dislike} alt="dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="like" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (<div className="empty">Acabou :(</div>) }
        { matchDev && (
          <div className="match-container">
            <img src={itsamatch} alt="Match" />

            <img className="avatar" src={matchDev.avatar} alt="Match" />
            <strong>{matchDev.name}</strong>
            <p>{matchDev.bio}</p>

            <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
          </div>
        ) }
      </div>

    );
}
