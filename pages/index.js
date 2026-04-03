// ✅ UPDATED VERSION (Chinese-first + Mobile single column)

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "notjustme_reports_v1";

const t = {
  brand: "NotJustMe",
  tagline: "你不是唯一一个",
  share: "分享你的经历",
  city: "城市",
  country: "国家",
  title: "标题",
  details: "发生了什么？",
  submit: "发布",
  similar: "我也遇到过",
  different: "不太一样",
  comment: "写下你的看法...",
  post: "发送",
  stats: "国家分布",
  feed: "最新经历",
  anonymous: "匿名"
};

function getFlag(country) {
  if (!country) return "🌍";
  const code = country.slice(0, 2).toUpperCase();
  return code.replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt()));
}

function seed() {
  return [{
    id: 1,
    city: "奥斯陆",
    country: "Norway",
    title: "商务舱柜台被拒",
    details: "当时我被告知不能使用商务舱柜台，但后来发现其他人似乎可以使用，让我很困惑。",
    likes: 3,
    dislikes: 1,
    comments: [{ id: 1, text: "我在别的机场也遇到过类似情况" }]
  }];
}

export default function Home() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ city: "", country: "", title: "", details: "" });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setData(JSON.parse(saved));
    else {
      const s = seed();
      setData(s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const stats = useMemo(() => {
    const map = {};
    data.forEach(d => {
      map[d.country] = (map[d.country] || 0) + 1;
    });
    return Object.entries(map);
  }, [data]);

  const submit = () => {
    if (!form.title) return;
    setData([{ ...form, id: Date.now(), likes:0, dislikes:0, comments:[] }, ...data]);
    setForm({ city:"", country:"", title:"", details:"" });
  };

  const vote = (id, type) => {
    setData(data.map(d => d.id===id ? {
      ...d,
      likes: type==="like" ? d.likes+1 : d.likes,
      dislikes: type==="dislike" ? d.dislikes+1 : d.dislikes
    }:d));
  };

  const comment = (id, text) => {
    if (!text) return;
    setData(data.map(d => d.id===id ? {
      ...d,
      comments:[...d.comments, { id:Date.now(), text }]
    }:d));
  };

  return (
    <div style={{maxWidth:600, margin:"0 auto", padding:16, fontFamily:"sans-serif"}}>

      {/* HEADER */}
      <h1 style={{fontSize:28, color:"#4f46e5"}}>{t.brand}</h1>
      <p style={{color:"#666"}}>{t.tagline}</p>

      {/* FORM */}
      <div style={{marginTop:20}}>
        <input style={input} placeholder={t.city} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
        <input style={input} placeholder={t.country} value={form.country} onChange={e=>setForm({...form,country:e.target.value})}/>
        <input style={input} placeholder={t.title} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <textarea style={input} placeholder={t.details} value={form.details} onChange={e=>setForm({...form,details:e.target.value})}/>
        <button style={btn} onClick={submit}>{t.submit}</button>
      </div>

      {/* STATS */}
      <div style={{marginTop:30}}>
        <h3>{t.stats}</h3>
        {stats.map(([c,n])=> (
          <div key={c}>{getFlag(c)} {c} · {n}</div>
        ))}
      </div>

      {/* FEED */}
      <div style={{marginTop:30}}>
        <h3>{t.feed}</h3>
        {data.map(d=>(
          <div key={d.id} style={card}>
            <b>{d.title}</b> {getFlag(d.country)}
            <div style={{fontSize:12,color:"gray"}}>{d.city}, {d.country} · {t.anonymous}</div>
            <p>{d.details}</p>

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>vote(d.id,"like")}>{t.similar} 👍 {d.likes}</button>
              <button onClick={()=>vote(d.id,"dislike")}>{t.different} 👎 {d.dislikes}</button>
            </div>

            <div style={{marginTop:10}}>
              {d.comments.map(c=>(<div key={c.id}>• {c.text}</div>))}
              <input style={input} placeholder={t.comment} onKeyDown={e=>{
                if(e.key==="Enter"){
                  comment(d.id,e.target.value);
                  e.target.value="";
                }
              }}/>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

const input = {
  width:"100%",
  marginBottom:10,
  padding:10,
  border:"1px solid #ddd",
  borderRadius:8
};

const btn = {
  width:"100%",
  padding:12,
  background:"#4f46e5",
  color:"white",
  border:"none",
  borderRadius:8
};

const card = {
  border:"1px solid #eee",
  padding:12,
  borderRadius:10,
  marginTop:10
};
