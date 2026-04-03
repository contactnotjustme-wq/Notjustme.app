import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "notjustme_reports_v1";

const translations = {
  en: {
    brand: "NotJustMe",
    tagline: "Real stories. Shared patterns.",
    disclaimer:
      "This is a community space to share experiences, not to make accusations.",
    shareTitle: "Share your experience",
    city: "City",
    country: "Country",
    title: "Title",
    details: "What happened?",
    submit: "Submit",
    similar: "I had similar experience",
    different: "Not the same",
    commentPlaceholder: "Add a comment...",
    commentButton: "Post",
    comments: "Comments",
    statsTitle: "Country overview",
    stories: "stories",
    feedTitle: "Recent stories",
    noStories: "No stories yet.",
    anonymous: "Anonymous",
    switchTo: "中文"
  },
  zh: {
    brand: "NotJustMe",
    tagline: "真实经历，共同模式。",
    disclaimer: "这是一个分享经历的社区，不是一个直接指控他人的平台。",
    shareTitle: "分享你的经历",
    city: "城市",
    country: "国家",
    title: "标题",
    details: "发生了什么？",
    submit: "提交",
    similar: "我也遇到过",
    different: "不太一样",
    commentPlaceholder: "写下你的看法…",
    commentButton: "发布",
    comments: "评论",
    statsTitle: "国家统计",
    stories: "条",
    feedTitle: "最新经历",
    noStories: "还没有内容。",
    anonymous: "匿名",
    switchTo: "EN"
  }
};

function countryToCode(country) {
  const map = {
    norway: "NO",
    germany: "DE",
    france: "FR",
    sweden: "SE",
    denmark: "DK",
    finland: "FI",
    netherlands: "NL",
    belgium: "BE",
    austria: "AT",
    switzerland: "CH",
    italy: "IT",
    spain: "ES",
    portugal: "PT",
    ireland: "IE",
    poland: "PL",
    czechia: "CZ",
    "czech republic": "CZ",
    uk: "GB",
    "united kingdom": "GB",
    england: "GB",
    scotland: "GB",
    wales: "GB",
    china: "CN",
    japan: "JP",
    korea: "KR",
    "south korea": "KR",
    singapore: "SG",
    usa: "US",
    "united states": "US",
    canada: "CA"
  };

  const key = String(country || "").trim().toLowerCase();
  return map[key] || null;
}

function getFlagEmoji(country) {
  const code = countryToCode(country);
  if (!code) return "🌍";
  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
    .join("");
}

function seedData() {
  return [
    {
      id: 1,
      city: "Oslo",
      country: "Norway",
      title: "Denied business class counter access",
      details:
        "At the airport, I was told I could not use the business class counter. What made it uncomfortable was that I later noticed other passengers seemed to be allowed through more easily. I still do not know whether it was strict policy, inconsistency, or something else, but it left me feeling singled out.",
      likes: 4,
      dislikes: 1,
      comments: [
        { id: 11, text: "I had a similar experience in another airport." },
        { id: 12, text: "Could also be inconsistent staff training." }
      ],
      createdAt: new Date().toISOString()
    }
  ];
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
    title: "",
    details: ""
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setReports(JSON.parse(saved));
        return;
      } catch (e) {}
    }
    const initial = seedData();
    setReports(initial);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    }
  }, [reports]);

  const countryStats = useMemo(() => {
    const counts = {};
    for (const report of reports) {
      const country = report.country || "Unknown";
      counts[country] = (counts[country] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [reports]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.city.trim() || !form.country.trim() || !form.title.trim() || !form.details.trim()) {
      return;
    }

    const newReport = {
      id: Date.now(),
      city: form.city.trim(),
      country: form.country.trim(),
      title: form.title.trim(),
      details: form.details.trim(),
      likes: 0,
      dislikes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    setReports((prev) => [newReport, ...prev]);
    setForm({
      city: "",
      country: "",
      title: "",
      details: ""
    });
  }

  function handleVote(id, type) {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id !== id) return report;
        return {
          ...report,
          likes: type === "like" ? report.likes + 1 : report.likes,
          dislikes: type === "dislike" ? report.dislikes + 1 : report.dislikes
        };
      })
    );
  }

  function handleAddComment(id, text) {
    const clean = text.trim();
    if (!clean) return;

    setReports((prev) =>
      prev.map((report) => {
        if (report.id !== id) return report;
        return {
          ...report,
          comments: [
            ...report.comments,
            {
              id: Date.now(),
              text: clean
            }
          ]
        };
      })
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.brand}>{t.brand}</h1>
            <p style={styles.tagline}>{t.tagline}</p>
            <p style={styles.disclaimer}>{t.disclaimer}</p>
          </div>

          <button
            onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))}
            style={styles.langButton}
          >
            🌐 {t.switchTo}
          </button>
        </header>

        <section style={styles.heroCard}>
          <div style={styles.heroTextWrap}>
            <h2 style={styles.heroTitle}>notjustme.app</h2>
            <p style={styles.heroText}>
              A place to say what happened, see how others respond, and find out
              whether it was just you — or not just you.
            </p>
          </div>
        </section>

        <section style={styles.grid}>
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>{t.shareTitle}</h3>

              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  style={styles.input}
                  placeholder={t.city}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder={t.country}
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder={t.title}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                  style={styles.textarea}
                  placeholder={t.details}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                />
                <button type="submit" style={styles.submitButton}>
                  {t.submit}
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>{t.statsTitle}</h3>
              <div style={styles.statsList}>
                {countryStats.map(([country, count]) => (
                  <div key={country} style={styles.statRow}>
                    <span>
                      {getFlagEmoji(country)} {country}
                    </span>
                    <strong>
                      {count} {lang === "en" ? "stories" : "条"}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>{t.feedTitle}</h3>

              {reports.length === 0 ? (
                <p>{t.noStories}</p>
              ) : (
                <div style={styles.feed}>
                  {reports.map((report) => (
                    <StoryCard
                      key={report.id}
                      report={report}
                      lang={lang}
                      t={t}
                      onVote={handleVote}
                      onAddComment={handleAddComment}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StoryCard({ report, t, onVote, onAddComment }) {
  const [comment, setComment] = useState("");

  return (
    <article style={styles.storyCard}>
      <div style={styles.storyTop}>
        <div>
          <h4 style={styles.storyTitle}>{report.title}</h4>
          <div style={styles.storyMeta}>
            <span>
              {getFlagEmoji(report.country)} {report.city}, {report.country}
            </span>
            <span>•</span>
            <span>{t.anonymous}</span>
          </div>
        </div>
      </div>

      <p style={styles.storyDetails}>{report.details}</p>

      <div style={styles.voteRow}>
        <button style={styles.voteButton} onClick={() => onVote(report.id, "like")}>
          👍 {t.similar} ({report.likes})
        </button>
        <button style={styles.voteButtonAlt} onClick={() => onVote(report.id, "dislike")}>
          👎 {t.different} ({report.dislikes})
        </button>
      </div>

      <div style={styles.commentsSection}>
        <div style={styles.commentsTitle}>
          {t.comments} ({report.comments.length})
        </div>

        <div style={styles.commentList}>
          {report.comments.map((item) => (
            <div key={item.id} style={styles.commentItem}>
              • {item.text}
            </div>
          ))}
        </div>

        <div style={styles.commentInputRow}>
          <input
            style={styles.commentInput}
            placeholder={t.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            style={styles.commentButton}
            onClick={() => {
              onAddComment(report.id, comment);
              setComment("");
            }}
          >
            {t.commentButton}
          </button>
        </div>
      </div>
    </article>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #eef2ff 0%, #ffffff 45%, #fdf2f8 100%)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#111827"
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 20px 60px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 24
  },
  brand: {
    margin: 0,
    fontSize: 40,
    fontWeight: 800,
    color: "#4338ca"
  },
  tagline: {
    margin: "8px 0 6px",
    color: "#4b5563",
    fontSize: 18
  },
  disclaimer: {
    margin: 0,
    color: "#6b7280",
    fontSize: 14,
    maxWidth: 700
  },
  langButton: {
    border: "1px solid #d1d5db",
    background: "#fff",
    borderRadius: 14,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600
  },
  heroCard: {
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    borderRadius: 24,
    padding: 28,
    marginBottom: 24
  },
  heroTextWrap: {
    maxWidth: 760
  },
  heroTitle: {
    margin: 0,
    fontSize: 28
  },
  heroText: {
    marginTop: 10,
    color: "#4b5563",
    lineHeight: 1.6
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    gap: 24
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 24
  },
  rightColumn: {
    minWidth: 0
  },
  card: {
    background: "#ffffff",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)"
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 20
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: 14,
    padding: "12px 14px",
    fontSize: 14
  },
  textarea: {
    border: "1px solid #d1d5db",
    borderRadius: 14,
    padding: "12px 14px",
    fontSize: 14,
    minHeight: 120,
    resize: "vertical"
  },
  submitButton: {
    border: "none",
    borderRadius: 14,
    padding: "12px 16px",
    fontSize: 14,
    fontWeight: 700,
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer"
  },
  statsList: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 12px",
    background: "#eef2ff",
    borderRadius: 14
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  storyCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 18
  },
  storyTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12
  },
  storyTitle: {
    margin: 0,
    fontSize: 18
  },
  storyMeta: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    color: "#6b7280",
    fontSize: 13,
    marginTop: 8
  },
  storyDetails: {
    color: "#374151",
    lineHeight: 1.6,
    marginTop: 14,
    marginBottom: 14
  },
  voteRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap"
  },
  voteButton: {
    border: "none",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: 999,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600
  },
  voteButtonAlt: {
    border: "none",
    background: "#f3f4f6",
    color: "#374151",
    borderRadius: 999,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600
  },
  commentsSection: {
    marginTop: 18
  },
  commentsTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10
  },
  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 12
  },
  commentItem: {
    fontSize: 14,
    color: "#4b5563"
  },
  commentInputRow: {
    display: "flex",
    gap: 8
  },
  commentInput: {
    flex: 1,
    border: "1px solid #d1d5db",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14
  },
  commentButton: {
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    background: "#e5e7eb",
    cursor: "pointer",
    fontWeight: 600
  }
};
