// ✅ FULL UPDATED VERSION (ZH-first + EN switch + feed preview + share)

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "notjustme_reports_v2";

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
    stats: "国家分布"
  },
  en: {
    brandCN: "NotJustMe",
    brandEN: "NotJustMe",
    slogan: "Real stories. Shared patterns.",
    share: "Share your story",
    browse: "Browse",
    city: "City",
    country: "Country",
    title: "Title",
    details: "What happened?",
    submit: "Submit",
    similar: "I had similar experience",
    different: "Not the same",
    comment: "Add a comment...",
    anonymous: "Anonymous",
    switch: "中文",
    shareBtn: "Share",
    stats: "Country stats"
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
  const [lang,setLang]=useState("zh");
  const t = TEXT[lang];

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

  const share=(item)=>{
    const text=`${item.title}\n${item.details.slice(0,50)}...\nhttps://notjustme.app`;
    navigator.clipboard.writeText(text);
    alert("已复制，可分享到小红书/微信");
  };

  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:16,fontFamily:"sans-serif"}}>

      {/* header */}
      <h1>{t.brandCN}</h1>
      <h2 style={{marginTop:0}}>{t.brandEN}</h2>
      <p>{t.slogan}</p>

      <button onClick={()=>setLang(lang==="zh"?"en":"zh")}>{t.switch}</button>

      {/* form */}
      <h3>{t.share}</h3>
      <input style={input} placeholder={t.city} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
      <input style={input} placeholder={t.country} value={form.country} onChange={e=>setForm({...form,country:e.target.value})}/>
      <input style={input} placeholder={t.title} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <textarea style={input} placeholder={t.details} value={form.details} onChange={e=>setForm({...form,details:e.target.value})}/>
      <button style={btn} onClick={submit}>{t.submit}</button>

      {/* stats */}
      <h3>{t.stats}</h3>
      {stats.map(([c,n])=>(
        <div key={c}>{flag(c)} {lang==="zh"?"国家":""} {c} · {n}</div>
      ))}

      {/* feed */}
      <h3>{t.browse}</h3>
      {data.map(d=>(
        <div key={d.id} style={card}>
          <b>{d.title}</b> {flag(d.country)}
          <div style={{fontSize:12,color:"gray"}}>{d.city}, {d.country}</div>

          {/* preview mode */}
          <p>{d.details.slice(0,50)}...</p>

          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>vote(d.id,"like")}>{t.similar} 👍 {d.likes}</button>
            <button onClick={()=>vote(d.id,"dislike")}>{t.different} 👎 {d.dislikes}</button>
            <button onClick={()=>share(d)}>{t.shareBtn}</button>
          </div>

          <div>
            {d.comments.map(c=>(<div key={c.id}>• {c.text}</div>))}
            <input style={input} placeholder={t.comment} onKeyDown={e=>{
              if(e.key==="Enter"){
                addComment(d.id,e.target.value);
                e.target.value="";
              }
            }}/>
          </div>
        </div>
      ))}

    </div>
  );
}

const input={width:"100%",marginBottom:10,padding:10,border:"1px solid #ddd",borderRadius:8};
const btn={width:"100%",padding:12,background:"#4f46e5",color:"white",border:"none",borderRadius:8};
const card={border:"1px solid #eee",padding:12,borderRadius:10,marginTop:10};
