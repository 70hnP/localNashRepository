import React, {useState,useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
const API='http://localhost:8000/api';

function Login({setAuth}){const[email,setE]=useState('admin@test.com');const[password,setP]=useState('secret12');const[msg,setM]=useState('');
const go=async()=>{const r=await fetch(API+'/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password})});const j=await r.json();if(j.access_token){localStorage.setItem('t',j.access_token);localStorage.setItem('role',j.role);setAuth(true)}else setM(j.detail||'error')};
return <div><h2>Login</h2><input value={email} onChange={e=>setE(e.target.value)}/><input type='password' value={password} onChange={e=>setP(e.target.value)}/><button onClick={go}>Login</button><p>{msg}</p></div>}
function Dashboard(){const[s,setS]=useState([]);useEffect(()=>{fetch(API+'/scenarios',{headers:{Authorization:'Bearer '+localStorage.getItem('t')}}).then(r=>r.json()).then(setS)},[]);return <div><h2>Scenarios</h2>{s.map(x=><div key={x.id}>{x.id} - {x.name}</div>)}<BarChart width={500} height={220} data={s.map(x=>({name:x.name,val:x.result.total_liquid_yield}))}><XAxis dataKey='name'/><YAxis/><Tooltip/><Bar dataKey='val' fill='#1f77b4'/></BarChart></div>}
function Run(){const [f,setF]=useState({name:'Base',feed_api:32,sulfur_pct:1.2,naphtha_cut:30,diesel_cut:35});const[msg,setM]=useState('');
const run=async()=>{const r=await fetch(API+'/scenarios/run',{method:'POST',headers:{'content-type':'application/json',Authorization:'Bearer '+localStorage.getItem('t')},body:JSON.stringify({...f,feed_api:+f.feed_api,sulfur_pct:+f.sulfur_pct,naphtha_cut:+f.naphtha_cut,diesel_cut:+f.diesel_cut})});const j=await r.json();setM(JSON.stringify(j))}
return <div><h2>Run CDU</h2>{Object.keys(f).map(k=><div key={k}><input value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/></div>)}<button onClick={run}>Run</button><p>{msg}</p></div>}
function App(){const[a,setA]=useState(!!localStorage.getItem('t'));if(!a) return <Login setAuth={setA}/>; return <BrowserRouter><nav><Link to='/'>Dashboard</Link> | <Link to='/run'>Run</Link> <button onClick={()=>{localStorage.clear();setA(false)}}>Logout</button></nav><Routes><Route path='/' element={<Dashboard/>}/><Route path='/run' element={<Run/>}/><Route path='*' element={<Navigate to='/'/>}/></Routes></BrowserRouter>}
createRoot(document.getElementById('root')).render(<App/>);
