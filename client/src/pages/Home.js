import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Foard from '../components/formCard.js';
import TTable from '../components/transtable.js';

function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});

   

    const fetchTransaction = async () => {
        const token = Cookies.get('user_token');
        const res = await fetch('http://localhost:4000/transaction', {
            headers: {
            Authorization:`Bearer ${token}`,
        },}
        );
        const { data } = await res.json();
        setTransactions(data);
    }
    useEffect(() => {
        fetchTransaction();
    }, []);
    return (
        <>
            <Foard fetchTransaction={fetchTransaction}
                editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
            <TTable transaction={transactions} fetchTransaction={fetchTransaction}
                setEditTransaction={setEditTransaction} />
        </>
    );
}

export default Home;
