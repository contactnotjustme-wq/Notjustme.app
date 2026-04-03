// ✅ UI UPGRADE VERSION (Brand + Footer + Guidelines)

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "notjustme_reports_v3";

const TEXT = {
  zh: {
    brandCN: "不仅仅是我",
    brandEN: "NotJustMe",
    slogan: "有些事情，你不知道是不是自己想多了 · 也许不只是你一个人",
    share: "分享你的经历",
    browse: "浏览经历",
    city: "城市",
    country: "国家（英文，如 Norway）",
    title: "标题",
    details: "发生了什么？",
    submit: "发布",
    similar: "我也遇到过",
    different: "不太一样",
    comment: "写下你的看法...",
    anonymous: "匿名",
    switch: "EN",
    shareBtn: "分享",
    stats: "国家分布",
    aboutTitle: "关于这个网站",
    aboutText: "这是一个记录真实体验的平台。你可以分享那些让你感到不舒服、困惑、或者说不清的瞬间。通过其他人的反馈，帮助判断这些经历是否具有共性。",
    guidelineTitle: "发布建议",
    guidelineText: "请尽量描述事实经过，而不是直接下结论。避免公开个人隐私信息。尊重不同观点，保持理性讨论。"
  }
};

function flag(country) {
  if (!country) return "🌍";
  const code = country.slice(0,2).toUpperCase();
  return code.replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt()));
}

function seed() {
  return [{
    id:1,
    city:"奥斯陆",
    country:"Norway",
    title:"商务舱柜台被拒",
    details:"我在机场被告知不能使用商务舱柜台，但后来看到其他人似乎可以使用，这让我有点困惑，也有点不舒服。",
    likes:5,
    dislikes:1,
    comments:[{id:1,text:"我在别的机场也遇到过类似情况"}]
  }];
}

export default function App(){
  const [data,setData]=useState([]);
  const [form,setForm]=useState({city:"",country:"",title:"",details:""});

  useEffect(()=>{
    const s = localStorage.getItem(STORAGE_KEY);
    if(s) setData(JSON.parse(s));
    else{
      const d=seed();
      setData(d);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(d));
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
  },[data]);

  const stats = useMemo(()=>{
    const map={};
    data.forEach(d=>map[d.country]=(map[d.country]||0)+1);
    return Object.entries(map);
  },[data]);

  const submit=()=>{
    if(!form.title) return;
    setData([{...form,id:Date.now(),likes:0,dislikes:0,comments:[]},...data]);
    setForm({city:"",country:"",title:"",details:""});
  };

  const vote=(id,type)=>{
    setData(data.map(d=>d.id===id?{
      ...d,
      likes:type==="like"?d.likes+1:d.likes,
      dislikes:type==="dislike"?d.dislikes+1:d.dislikes
    }:d));
  };

  const addComment=(id,text)=>{
    if(!text) return;
    setData(data.map(d=>d.id===id?{
      ...d,
      comments:[...d.comments,{id:Date.now(),text}]
    }:d));
  };

  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:16,fontFamily:"sans-serif"}}>

      {/* BRAND */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <h1 style={{fontSize:32,fontWeight:800,color:"#6d28d9",margin:0}}>
          不仅仅是我
        </h1>
        <h1 style={{fontSize:32,fontWeight:800,color:"#4f46e5",margin:0}}>
          NotJustMe
        </h1>
        <p style={{color:"#666",marginTop:8}}>{TEXT.zh.slogan}</p>
      </div>

      {/* FORM */}
      <h3>{TEXT.zh.share}</h3>
      <input style={input} placeholder={TEXT.zh.city} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
      <input style={input} placeholder={TEXT.zh.country} value={form.country} onChange={e=>setForm({...form,country:e.target.value})}/>
      <input style={input} placeholder={TEXT.zh.title} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <textarea style={input} placeholder={TEXT.zh.details} value={form.details} onChange={e=>setForm({...form,details:e.target.value})}/>
      <button style={btn} onClick={submit}>{TEXT.zh.submit}</button>

      {/* STATS */}
      <h3>{TEXT.zh.stats}</h3>
      {stats.map(([c,n])=>(
        <div key={c}>{flag(c)} 国家 {c} · {n}</div>
      ))}

      {/* FEED */}
      <h3>{TEXT.zh.browse}</h3>
      {data.map(d=>(
        <div key={d.id} style={card}>
          <b>{d.title}</b> {flag(d.country)}
          <div style={{fontSize:12,color:"gray"}}>{d.city}, {d.country} · {TEXT.zh.anonymous}</div>
          <p>{d.details.slice(0,50)}...</p>

          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>vote(d.id,"like")}>{TEXT.zh.similar} 👍 {d.likes}</button>
            <button onClick={()=>vote(d.id,"dislike")}>{TEXT.zh.different} 👎 {d.dislikes}</button>
          </div>

          <div>
            {d.comments.map(c=>(<div key={c.id}>• {c.text}</div>))}
            <input style={input} placeholder={TEXT.zh.comment} onKeyDown={e=>{
              if(e.key==="Enter"){
                addComment(d.id,e.target.value);
                e.target.value="";
              }
            }}/>
          </div>
        </div>
      ))}

      {/* FOOTER */}
      <div style={{marginTop:40,paddingTop:20,borderTop:"1px solid #eee"}}>
        <h3>{TEXT.zh.aboutTitle}</h3>
        <p style={{color:"#555",lineHeight:1.6}}>{TEXT.zh.aboutText}</p>

        <h3 style={{marginTop:20}}>{TEXT.zh.guidelineTitle}</h3>
        <p style={{color:"#555",lineHeight:1.6}}>{TEXT.zh.guidelineText}</p>
      </div>

    </div>
  );
}

const input={width:"100%",marginBottom:10,padding:10,border:"1px solid #ddd",borderRadius:8};
const btn={width:"100%",padding:12,background:"#6d28d9",color:"white",border:"none",borderRadius:8};
const card={border:"1px solid #eee",padding:12,borderRadius:10,marginTop:10};
