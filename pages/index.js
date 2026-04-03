import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Share2,
  Mail,
  MapPin,
  Calendar,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  Info,
  Send,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const identityOptions = [
  "游客",
  "留学生",
  "本地华人",
  "外国人",
  "挪威人/本地人",
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
      "我排队到柜台时，前面几位欧洲面孔旅客都很顺利，轮到我后，对方语气明显变得敷衍，还反复质疑我的票是否有效。最后虽然办好了，但整个过程让我很不舒服。",
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
        text: "我在另一个欧洲机场也碰到过类似情况，后来发现把过程记详细真的很重要。",
      },
      {
        id: 12,
        author: "匿名用户B",
        text: "谢谢你写得这么具体，这样别人才能知道不是一句‘态度不好’就结束了。",
      },
      {
        id: 13,
        author: "匿名用户C",
        text: "建议以后补充当时有没有其他乘客在场、有没有排队顺序问题。",
      },
    ],
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
      { id: 44, author: "匿名用户M", text: "这种对比尤其让人难受，因为你知道问题不是沟通本身。" },
      { id: 45, author: "匿名用户N", text: "评论多的时候折叠起来会更好，现在这样已经很好了。" },
    ],
  },
  {
    id: 5,
    title: "商店里一直被店员盯着看，像默认我会偷东西",
    authorIdentity: "留学生",
    otherPartyIdentity: "商店工作人员",
    date: "2026-03-03",
    location: "奥斯陆某商场",
    summary:
      "进店之后，店员一路跟着我整理货架。我走到哪她就到哪，直到我离开。后面另一组顾客进来时，她又恢复了正常距离。",
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
      { id: 51, author: "匿名用户O", text: "这个我在北欧别的城市也有过。" },
      { id: 52, author: "匿名用户P", text: "内容写得很具体，看到地点和日期会更有真实感。" },
      { id: 53, author: "匿名用户Q", text: "希望之后能有地区筛选。" },
    ],
  },
];

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}

function CommentList({ comments }) {
  const [expanded, setExpanded] = useState(false);
  const visibleComments = expanded ? comments : comments.slice(0, 2);

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">
          评论 {comments.length} 条 {comments.length > 2 ? "（已折叠）" : ""}
        </p>
        {comments.length > 2 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <>
                收起评论 <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                展开评论 <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {visibleComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <p className="text-sm font-medium text-slate-800">{comment.author}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{comment.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PostCard({ post, onReact, onAddComment }) {
  const [commentInput, setCommentInput] = useState("");
  const sharePost = async () => {
    const shareData = {
      title: `${post.title} | Not Just Me`,
      text: `${post.summary}\n\n地点：${post.location}｜日期：${post.date}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert("链接和内容已复制，可以分享到其他平台。");
      } else {
        alert("当前浏览器不支持直接分享，请手动复制页面链接。");
      }
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  const submitComment = () => {
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput("");
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="overflow-hidden rounded-[24px] border-slate-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-white via-purple-50 to-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl leading-8 text-slate-900">{post.title}</CardTitle>
              <CardDescription className="mt-2 text-sm text-slate-600">
                不是一句情绪，而是一份更完整的经历记录。
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-2xl"
              onClick={sharePost}
              aria-label="分享帖子"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              <div className="mb-1 flex items-center gap-2 font-medium text-slate-900">
                <User className="h-4 w-4" /> 我的身份
              </div>
              {post.authorIdentity}
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              <div className="mb-1 flex items-center gap-2 font-medium text-slate-900">
                <Building2 className="h-4 w-4" /> 对方身份
              </div>
              {post.otherPartyIdentity}
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              <div className="mb-1 flex items-center gap-2 font-medium text-slate-900">
                <Calendar className="h-4 w-4" /> 发生日期
              </div>
              {post.date}
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              <div className="mb-1 flex items-center gap-2 font-medium text-slate-900">
                <MapPin className="h-4 w-4" /> 发生地点
              </div>
              {post.location}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <p className="text-base leading-7 text-slate-800">{post.summary}</p>
            <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4 text-sm leading-7 text-slate-700">
              {post.details}
            </div>
          </div>

          <Separator className="my-5" />

          <div>
            <p className="mb-3 text-sm font-medium text-slate-700">你看到这条内容后的反应</p>
            <div className="flex flex-wrap gap-2">
              {reactionOptions.map((reaction) => (
                <Button
                  key={reaction.key}
                  type="button"
                  variant="outline"
                  className="rounded-2xl border-slate-200 bg-white"
                  onClick={() => onReact(post.id, reaction.key)}
                >
                  {reaction.label}
                  <Badge className="ml-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                    {post.reactions[reaction.key] || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <CommentList comments={post.comments} />

          <div className="mt-4 rounded-2xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <MessageSquare className="h-4 w-4" /> 写下你的看法
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="你可以补充自己的经历、不同看法，或者给出建设性建议。"
                className="min-h-[96px] rounded-2xl"
              />
              <Button onClick={submitComment} className="rounded-2xl md:self-end">
                发布评论 <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
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

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submitPost = () => {
    const requiredFields = [
      "title",
      "authorIdentity",
      "otherPartyIdentity",
      "date",
      "location",
      "summary",
      "details",
    ];

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
              comments: [
                ...post.comments,
                { id: Date.now() + Math.random(), author: "匿名用户", text },
              ],
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] border border-purple-100 bg-white p-8 shadow-sm"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-100 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-fuchsia-100 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                <Sparkles className="h-4 w-4" /> 让更多人愿意写下真实经历
              </div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                <span className="text-slate-900">Not Just Me</span>
                <span className="mx-3 text-purple-600">/</span>
                <span className="text-purple-600">不仅仅是我</span>
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                这不是一个只让人发泄情绪的地方，而是一个鼓励大家把经历写得更完整、更具体、更能帮助彼此理解处境的平台。
                当一段不舒服的经历被认真记录下来，别人就更容易判断：这到底是偶发事件，还是很多人都曾遇到过的问题。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge className="rounded-full bg-purple-100 px-4 py-2 text-purple-700 hover:bg-purple-100">记录身份信息</Badge>
                <Badge className="rounded-full bg-purple-100 px-4 py-2 text-purple-700 hover:bg-purple-100">记录日期地点</Badge>
                <Badge className="rounded-full bg-purple-100 px-4 py-2 text-purple-700 hover:bg-purple-100">多元反应与评论</Badge>
                <Badge className="rounded-full bg-purple-100 px-4 py-2 text-purple-700 hover:bg-purple-100">可分享至其他平台</Badge>
              </div>
            </div>

            <Card className="rounded-[28px] border-purple-100 bg-white/90 shadow-sm backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">发布前建议</h3>
                    <p className="text-sm text-slate-600">写得越具体，越能帮助后来的人。</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm leading-7 text-slate-600">
                  <li>请尽量写清你的身份、对方身份、日期、地点和事情经过。</li>
                  <li>描述你具体经历了什么，而不只是“态度不好”或“让我难受”。</li>
                  <li>避免公开他人的私人信息，保护自己也保护他人。</li>
                  <li>欢迎表达感受，但更鼓励提供能帮助别人判断情境的事实细节。</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <Card className="rounded-[28px] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <SectionTitle
                  icon={HeartHandshake}
                  title="发布你的经历"
                  subtitle="每一条内容都应尽量完整，帮助更多人理解真实场景。"
                />

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Input
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    placeholder="帖子标题，例如：在某机场被区别对待"
                    className="rounded-2xl md:col-span-2"
                  />

                  <div className="rounded-2xl border border-slate-200 p-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">我的身份</label>
                    <select
                      value={form.authorIdentity}
                      onChange={(e) => updateForm("authorIdentity", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
                    >
                      <option value="">请选择</option>
                      {identityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">让我不舒服的人的身份</label>
                    <select
                      value={form.otherPartyIdentity}
                      onChange={(e) => updateForm("otherPartyIdentity", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
                    >
                      <option value="">请选择</option>
                      {otherPartyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">发生日期</label>
                    <Input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className="rounded-xl" />
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">发生地点</label>
                    <Input
                      value={form.location}
                      onChange={(e) => updateForm("location", e.target.value)}
                      placeholder="例如：奥斯陆机场 / 某餐厅 / 某博物馆"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="md:col-span-2 rounded-2xl border border-slate-200 p-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">事情经过概述</label>
                    <Textarea
                      value={form.summary}
                      onChange={(e) => updateForm("summary", e.target.value)}
                      placeholder="请写清当时发生了什么，最好让第一次看到的人也能读懂。"
                      className="min-h-[120px] rounded-xl"
                    />
                  </div>

                  <div className="md:col-span-2 rounded-2xl border border-slate-200 p-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">补充细节与感受</label>
                    <Textarea
                      value={form.details}
                      onChange={(e) => updateForm("details", e.target.value)}
                      placeholder="你可以补充上下文、对比、自己的感受，以及这些细节为什么值得被记录。"
                      className="min-h-[140px] rounded-xl"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={submitPost} className="rounded-2xl bg-purple-600 hover:bg-purple-700">
                    发布帖子
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl"
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
                  >
                    清空内容
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <SectionTitle
                  icon={Info}
                  title="关于这个网站"
                  subtitle="一个让经历被认真记录、认真阅读、认真回应的空间。"
                />
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                  <p>
                    这个网站的初衷，是让那些曾经让人感到委屈、被轻视、被区别对待、被误解的瞬间，不再只停留在心里。
                    有些经历很小，小到别人一句“是不是你想多了”就能轻轻带过；但也正因为它们太常见、太细微，才更需要被认真写下来。
                  </p>
                  <p>
                    你可以分享在机场、餐厅、酒店、景点、商店、学校、职场或其他公共场所中让你感到不舒服的经历。
                    重点不是煽动情绪，而是通过更完整的信息，让更多人看见模式、理解情境，也让后来的人知道自己并不孤单。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <SectionTitle
                  icon={Sparkles}
                  title="发布指南"
                  subtitle="请尽量写得具体、克制、真实，让内容真正有参考价值。"
                />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                    <p className="font-semibold text-slate-900">建议写清楚：</p>
                    <p>你的身份、对方身份、具体日期、地点、事情经过、周围环境，以及你为什么感到不舒服。</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                    <p className="font-semibold text-slate-900">请避免：</p>
                    <p>只写情绪不写事实、泄露私人信息、进行人身攻击、发布无法辨认上下文的片段化内容。</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <SectionTitle
                  icon={Mail}
                  title="联系与反馈"
                  subtitle="欢迎你提供改进建议，让这个网站一点点变得更完整。"
                />
                <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-4 text-sm leading-7 text-slate-700">
                  <p>如果你对网站内容结构、发布方式、互动功能或社区规范有建议，可以通过下面的邮箱联系我：</p>
                  <p className="mt-2 font-semibold text-purple-700">contact@notjustme.site</p>
                  <p className="mt-2">你也可以把你希望新增的栏目、筛选方式、地区分类、语言支持等意见发送到这个邮箱。</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[28px] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <SectionTitle
                    icon={MessageSquare}
                    title="社区内容"
                    subtitle="这些示例内容已经补充为更完整的记录形式。"
                  />
                  <div className="relative w-full md:max-w-xs">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="搜索标题、地点、身份…"
                      className="rounded-2xl pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} onReact={reactToPost} onAddComment={addComment} />
                ))
              ) : (
                <Card className="rounded-[28px] border-slate-200 shadow-sm">
                  <CardContent className="p-10 text-center text-slate-600">
                    没有找到匹配内容，换个关键词试试。
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
