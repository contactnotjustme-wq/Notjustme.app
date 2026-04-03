import React, { useMemo, useState } from "react";

const identityOptions = [
  "游客",
  "留学生",
  "本地华人",
  "外人",
  "本国人",
  "本地人",
  "其他",
];

const otherPartyOptions = [
  "机场员工",
  "地勤",
  "航空公司员工",
  "机组人员",
  "机场餐厅工作人员",
  "餐厅工作人员",
  "博物馆/景点工作人员",
  "酒店工作人员",
  "商店工作人员",
  "其他",
];

const reactionOptions = [
  { key: "same", label: "我也遇到过" },
  { key: "shocked", label: "很震惊" },
  { key: "support", label: "抱抱你" },
  { key: "angry", label: "这太不应该了" },
  { key: "different", label: "经历不太一样" },
  { key: "helpful", label: "这个信息很有帮助" },
];

const starterPosts = [
  {
    id: 1,
    title: "在奥斯陆机场商务柜台被区别对待",
    authorIdentity: "游客",
    otherPartyIdentity: "机场员工",
    date: "2026-03-29",
    location: "奥斯陆机场 OSL",
    summary:
      "我排队到柜台时，前面几位欧洲面孔旅客都很顺利，轮到我后，对方语气明显变得敷衍，还反复质疑我的票是否有效。最后虽然办好了，但整个过程让我很不舒服。我大声告诉她我是商务舱的机票，但是她用手指着经济舱通道让我去排队，同行的挪威人也表示惊讶，但是我再次严肃地声明 business class，她才不情不愿地放我进去，就好像我占了便宜一样。",
    details:
      "我希望写下来不是为了单纯发泄，而是让后来的人知道：如果你也遇到类似情况，可以记录下时间、地点、岗位身份和说话方式。这些信息会帮助别人判断这是个例，还是某些场景中经常出现的问题。",
    reactions: {
      same: 18,
      shocked: 9,
      support: 14,
      angry: 11,
      different: 3,
      helpful: 8,
    },
    comments: [
      {
        id: 11,
        author: "匿名用户A",
        text: "我在另一个欧洲机场也碰到过类似情况，后来发现坚持自己的原则真的很重要。",
      },
      {
        id: 12,
        author: "匿名用户B",
        text: "谢谢你写得这么具体，这样别人才能知道不是一句‘态度不好’就结束了。",
      },
      {
        id: 13,
        author: "匿名用户C",
        text: "这种经历真的会让人觉得被针对，也很难受。",
      },
    ],
    likes: 24,
    saves: 8,
    shares: 5,
  },
  {
    id: 2,
    title: "在餐厅被默认安排到最角落的位置",
    authorIdentity: "留学生",
    otherPartyIdentity: "餐厅工作人员",
    date: "2026-02-14",
    location: "卑尔根市中心",
    summary:
      "店里明明有不少空位，但店员看了我一眼后，把我安排到靠近后厨和通道的位置。后面来的两组白人客人却被安排在窗边。",
    details:
      "这件事单看似乎很小，但那种‘你被自动放到次等位置’的感觉很真实。网站上如果能把身份、具体地点、日期都记录清楚，就能帮助大家看见这种难以量化的不适。",
    reactions: {
      same: 22,
      shocked: 7,
      support: 15,
      angry: 13,
      different: 5,
      helpful: 10,
    },
    comments: [
      { id: 21, author: "匿名用户D", text: "我也遇到过类似情况，但当时没有意识到要记日期和店名。" },
      { id: 22, author: "匿名用户E", text: "这种细小但重复出现的差别对待，真的很消耗人。" },
      { id: 23, author: "匿名用户F", text: "建议加一个字段：当时店内是否拥挤。" },
      { id: 24, author: "匿名用户G", text: "谢谢分享，让我知道不是自己太敏感。" },
    ],
    likes: 31,
    saves: 10,
    shares: 6,
  },
  {
    id: 3,
    title: "博物馆安检时被反复单独检查",
    authorIdentity: "外国人",
    otherPartyIdentity: "博物馆/景点工作人员",
    date: "2026-01-08",
    location: "特隆赫姆某博物馆",
    summary:
      "同行的朋友都很快通过，我却被要求反复打开包、解释随身物品。工作人员没有直接说什么，但语气和眼神让我非常不舒服。",
    details:
      "我后来才意识到，这类经历最难的是你很难证明‘哪里不对’，所以更需要把上下文写具体：谁、何时、何地、发生了什么、周围环境如何。这样网站内容才会更有价值。",
    reactions: {
      same: 13,
      shocked: 10,
      support: 17,
      angry: 9,
      different: 2,
      helpful: 12,
    },
    comments: [
      { id: 31, author: "匿名用户H", text: "你写得很完整，我觉得这种记录方式特别有意义。" },
      { id: 32, author: "匿名用户I", text: "有些经历就是靠大家一点点写出来，才知道并不是孤例。" },
    ],
    likes: 19,
    saves: 7,
    shares: 4,
  },
  {
    id: 4,
    title: "酒店前台对我和朋友的态度完全不同",
    authorIdentity: "本地华人",
    otherPartyIdentity: "酒店工作人员",
    date: "2025-12-22",
    location: "斯塔万格",
    summary:
      "我和朋友一起入住，朋友先上前沟通时一切正常，轮到我提问时，前台明显变得不耐烦，还用一种像在训人的语气回答。",
    details:
      "最刺痛我的不是一句具体的话，而是同一场景下，对不同人的默认态度差异。这个网站如果想让大家愿意填写，就必须让叙述结构足够明确、足够被看见，也足够被理解。",
    reactions: {
      same: 16,
      shocked: 6,
      support: 18,
      angry: 8,
      different: 4,
      helpful: 7,
    },
    comments: [
      { id: 41, author: "匿名用户J", text: "这真的很常见，但大家通常不会详细记下来。" },
      { id: 42, author: "匿名用户K", text: "建议以后也可以加上‘是否有同伴在场’这个字段。" },
      { id: 43, author: "匿名用户L", text: "谢谢你写出来，我看到会更有勇气发自己的经历。" },
    ],
    likes: 16,
    saves: 6,
    shares: 3,
  },
  {
    id: 5,
    title: "二刷柏林三顾冒菜，被没有服务意识的员工恶心到了",
    authorIdentity: "留学生",
    otherPartyIdentity: "商店工作人员",
    date: "2026-03-03",
    location: "柏林三顾冒菜",
    summary:
      "今天赶着 11:30 开门营业后进店的，大部分都是华人朋友，店员一路上保持极简的交流。买单时要了一碗米饭两欧，但是取餐的时候，我说为什么我的米饭没有，她却反问我你点了没有，旁边盛饭的师傅也是盛气凌人，说这个是收费的。那个女收银员就把我放到一边，说等一下，等结了两个人的账之后，才慢慢地把我结账的单子打出来，说付了 31 欧，一碗米饭两欧，才把米饭给了我，全程没有一句道歉，像是我欠了他们一样。也不知道是开门忙着赚钱，今天的冒菜都没有煮太熟就上了，经典川味也根本没什么味道，还让我选辣度，根本一点味道都没有。",
    details:
      "这种经历很难用一句话说明白，所以我特别支持把网站做成鼓励完整记录的形式，而不是只留下一句情绪宣泄。越具体，越能帮助后来的人理解情境。",
    reactions: {
      same: 25,
      shocked: 12,
      support: 19,
      angry: 21,
      different: 4,
      helpful: 15,
    },
    comments: [
      { id: 51, author: "匿名用户O", text: "这个我在德国别的城市也有过。" },
      { id: 52, author: "匿名用户P", text: "内容写得很具体，看到地点和日期会更有真实感。" },
      { id: 53, author: "匿名用户Q", text: "希望之后能有地区筛选。" },
    ],
    likes: 27,
    saves: 9,
    shares: 5,
  },
];

function ActionButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition " +
        (active
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200")
      }
    >
      {children}
    </button>
  );
}

function CommentList({ comments }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? comments : comments.slice(0, 2);

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-gray-500">{comments.length} 条评论</div>
        {comments.length > 2 && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {expanded ? "收起评论" : "展开更多评论"}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {shown.map((comment) => (
          <div key={comment.id} className="rounded-2xl bg-gray-50 p-3">
            <div className="text-sm font-medium text-gray-800">{comment.author}</div>
            <div className="mt-1 text-sm leading-6 text-gray-600">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onReact, onLike, onSave, onShare, onAddComment }) {
  const [commentInput, setCommentInput] = useState("");
  const [showReactions, setShowReactions] = useState(false);

  const submitComment = () => {
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput("");
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gradient-to-r from-white via-purple-50 to-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold leading-9 text-gray-900">{post.title}</h3>
            <p className="mt-2 text-sm text-gray-500">不是一句情绪，而是一份更完整的经历记录。</p>
          </div>
          <button
            type="button"
            onClick={() => onShare(post.id)}
            className="rounded-2xl border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            分享
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-700">
            <div className="mb-1 font-medium text-gray-900">我的身份</div>
            {post.authorIdentity}
          </div>
          <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-700">
            <div className="mb-1 font-medium text-gray-900">对方身份</div>
            {post.otherPartyIdentity}
          </div>
          <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-700">
            <div className="mb-1 font-medium text-gray-900">发生日期</div>
            {post.date}
          </div>
          <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-700">
            <div className="mb-1 font-medium text-gray-900">发生地点</div>
            {post.location}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-base leading-7 text-gray-800">{post.summary}</p>
          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4 text-sm leading-7 text-gray-700">
            {post.details}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <ActionButton active={false} onClick={() => onLike(post.id)}>
              👍 赞同 {post.likes}
            </ActionButton>
            <ActionButton active={false} onClick={() => setShowReactions(!showReactions)}>
              💬 添加评论
            </ActionButton>
            <ActionButton active={false} onClick={() => onSave(post.id)}>
              ★ 收藏 {post.saves}
            </ActionButton>
            <ActionButton active={false} onClick={() => onShare(post.id)}>
              ↗ 分享 {post.shares}
            </ActionButton>
            <button type="button" className="px-2 py-2 text-xl text-gray-400">…</button>
          </div>

          {showReactions && (
            <div className="mt-4 rounded-2xl bg-gray-50 p-4">
              <div className="mb-3 text-sm font-medium text-gray-700">更细的互动反馈</div>
              <div className="flex flex-wrap gap-2">
                {reactionOptions.map((reaction) => (
                  <button
                    key={reaction.key}
                    type="button"
                    onClick={() => onReact(post.id, reaction.key)}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {reaction.label} ({post.reactions[reaction.key] || 0})
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="写下你的看法、补充经历，或者给出建设性建议。"
                  className="min-h-[96px] w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={submitComment}
                    className="rounded-2xl bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
                  >
                    发布评论
                  </button>
                </div>
              </div>
            </div>
          )}

          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );
}

export default function NotJustMeWebsite() {
  const [posts, setPosts] = useState(starterPosts);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    authorIdentity: "",
    otherPartyIdentity: "",
    date: "",
    location: "",
    summary: "",
    details: "",
  });

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) =>
      [
        post.title,
        post.authorIdentity,
        post.otherPartyIdentity,
        post.date,
        post.location,
        post.summary,
        post.details,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, search]);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitPost = () => {
    const requiredFields = ["title", "authorIdentity", "otherPartyIdentity", "date", "location", "summary", "details"];
    const missing = requiredFields.filter((field) => !String(form[field]).trim());

    if (missing.length > 0) {
      alert("请把标题、身份、日期、地点、经过概述和补充细节都填写完整。这样内容才真正能帮助别人。");
      return;
    }

    const newPost = {
      id: Date.now(),
      ...form,
      reactions: {
        same: 0,
        shocked: 0,
        support: 0,
        angry: 0,
        different: 0,
        helpful: 0,
      },
      comments: [],
      likes: 0,
      saves: 0,
      shares: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
    setForm({
      title: "",
      authorIdentity: "",
      otherPartyIdentity: "",
      date: "",
      location: "",
      summary: "",
      details: "",
    });
  };

  const reactToPost = (postId, reactionKey) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [reactionKey]: (post.reactions[reactionKey] || 0) + 1,
              },
            }
          : post
      )
    );
  };

  const addComment = (postId, text) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { id: Date.now() + Math.random(), author: "匿名用户", text }],
            }
          : post
      )
    );
  };

  const incrementField = (postId, field) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, [field]: (post[field] || 0) + 1 } : post
      )
    );
  };

  const sharePost = async (postId) => {
    const post = posts.find((item) => item.id === postId);
    if (!post) return;

    incrementField(postId, "shares");

    const shareText = `${post.title}\n${post.summary}\n地点：${post.location}｜日期：${post.date}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: `${post.title} | Not Just Me`,
          text: shareText,
          url: typeof window !== "undefined" ? window.location.href : "",
        });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        alert("内容已复制，可以分享到其他平台。");
      } else {
        alert("当前浏览器不支持直接分享，请手动复制内容。");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] border border-purple-100 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                让更多人愿意写下真实经历
              </div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                <span className="text-gray-900">Not Just Me</span>
                <span className="mx-3 text-purple-600">/</span>
                <span className="text-purple-600">不仅仅是我</span>
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                这不是一个只让人发泄情绪的地方，而是一个鼓励大家把经历写得更完整、更具体、更能帮助彼此理解处境的平台。
              </p>
            </div>

            <div className="rounded-[28px] border border-purple-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">发布前建议</h3>
              <p className="mt-2 text-sm text-gray-600">写得越具体，越能帮助后来的人。</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
                <li>请尽量写清你的身份、对方身份、日期、地点和事情经过。</li>
                <li>描述你具体经历了什么，而不只是“态度不好”或“让我难受”。</li>
                <li>避免公开他人的私人信息，保护自己也保护他人。</li>
                <li>欢迎表达感受，但更鼓励提供能帮助别人判断情境的事实细节。</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">发布你的经历</h2>
              <p className="mt-1 text-sm text-gray-600">每一条内容都应尽量完整，帮助更多人理解真实场景。</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="帖子标题，例如：在某机场被区别对待"
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400 md:col-span-2"
                />

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">我的身份</label>
                  <select
                    value={form.authorIdentity}
                    onChange={(e) => updateForm("authorIdentity", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  >
                    <option value="">请选择</option>
                    {identityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">让我不舒服的人的身份</label>
                  <select
                    value={form.otherPartyIdentity}
                    onChange={(e) => updateForm("otherPartyIdentity", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  >
                    <option value="">请选择</option>
                    {otherPartyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">发生日期</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">发生地点</label>
                  <input
                    value={form.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                    placeholder="例如：奥斯陆机场 / 某餐厅 / 某博物馆"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-gray-200 p-3 md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">事情经过概述</label>
                  <textarea
                    value={form.summary}
                    onChange={(e) => updateForm("summary", e.target.value)}
                    placeholder="请写清当时发生了什么，最好让第一次看到的人也能读懂。"
                    className="min-h-[120px] w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                  />
                </div>

                <div className="rounded-2xl border border-gray-200 p-3 md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">补充细节与感受</label>
                  <textarea
                    value={form.details}
                    onChange={(e) => updateForm("details", e.target.value)}
                    placeholder="你可以补充上下文、对比、自己的感受，以及这些细节为什么值得被记录。"
                    className="min-h-[140px] w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={submitPost}
                  className="rounded-2xl bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-700"
                >
                  发布帖子
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      title: "",
                      authorIdentity: "",
                      otherPartyIdentity: "",
                      date: "",
                      location: "",
                      summary: "",
                      details: "",
                    })
                  }
                  className="rounded-2xl border border-gray-200 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  清空内容
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">关于这个网站</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                这个网站的初衷，是让那些曾经让人感到委屈、被轻视、被区别对待、被误解的瞬间，不再只停留在心里。
                你可以分享在机场、餐厅、酒店、景点、商店、学校、职场或其他公共场所中让你感到不舒服的经历。
              </p>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">联系与反馈</h2>
              <div className="mt-4 rounded-2xl border border-purple-100 bg-purple-50 p-4 text-sm leading-7 text-gray-700">
                <p>如果你对网站内容结构、发布方式、互动功能或社区规范有建议，可以通过下面的邮箱联系我：</p>
                <p className="mt-2 font-semibold text-purple-700">contact@notjustme.site</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">社区内容</h2>
                  <p className="mt-1 text-sm text-gray-600">这些示例内容已经补充为更完整的记录形式。</p>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索标题、地点、身份…"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400 md:max-w-xs"
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onReact={reactToPost}
                    onLike={(id) => incrementField(id, "likes")}
                    onSave={(id) => incrementField(id, "saves")}
                    onShare={sharePost}
                    onAddComment={addComment}
                  />
                ))
              ) : (
                <div className="rounded-[28px] border border-gray-200 bg-white p-10 text-center text-gray-600 shadow-sm">
                  没有找到匹配内容，换个关键词试试。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
