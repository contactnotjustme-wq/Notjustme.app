import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const identityOptions = [
  "游客",
  "留学生",
  "本地华人",
  "外国人",
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

const countryOptions = [
  // Europe / 欧洲
  { code: "AL", emoji: "🇦🇱", en: "Albania", zh: "阿尔巴尼亚", region: "Europe / 欧洲" },
  { code: "AD", emoji: "🇦🇩", en: "Andorra", zh: "安道尔", region: "Europe / 欧洲" },
  { code: "AM", emoji: "🇦🇲", en: "Armenia", zh: "亚美尼亚", region: "Europe / 欧洲" },
  { code: "AT", emoji: "🇦🇹", en: "Austria", zh: "奥地利", region: "Europe / 欧洲" },
  { code: "AZ", emoji: "🇦🇿", en: "Azerbaijan", zh: "阿塞拜疆", region: "Europe / 欧洲" },
  { code: "BY", emoji: "🇧🇾", en: "Belarus", zh: "白俄罗斯", region: "Europe / 欧洲" },
  { code: "BE", emoji: "🇧🇪", en: "Belgium", zh: "比利时", region: "Europe / 欧洲" },
  { code: "BA", emoji: "🇧🇦", en: "Bosnia and Herzegovina", zh: "波黑", region: "Europe / 欧洲" },
  { code: "BG", emoji: "🇧🇬", en: "Bulgaria", zh: "保加利亚", region: "Europe / 欧洲" },
  { code: "HR", emoji: "🇭🇷", en: "Croatia", zh: "克罗地亚", region: "Europe / 欧洲" },
  { code: "CY", emoji: "🇨🇾", en: "Cyprus", zh: "塞浦路斯", region: "Europe / 欧洲" },
  { code: "CZ", emoji: "🇨🇿", en: "Czech Republic", zh: "捷克", region: "Europe / 欧洲" },
  { code: "DK", emoji: "🇩🇰", en: "Denmark", zh: "丹麦", region: "Europe / 欧洲" },
  { code: "EE", emoji: "🇪🇪", en: "Estonia", zh: "爱沙尼亚", region: "Europe / 欧洲" },
  { code: "FI", emoji: "🇫🇮", en: "Finland", zh: "芬兰", region: "Europe / 欧洲" },
  { code: "FR", emoji: "🇫🇷", en: "France", zh: "法国", region: "Europe / 欧洲" },
  { code: "GE", emoji: "🇬🇪", en: "Georgia", zh: "格鲁吉亚", region: "Europe / 欧洲" },
  { code: "DE", emoji: "🇩🇪", en: "Germany", zh: "德国", region: "Europe / 欧洲" },
  { code: "GR", emoji: "🇬🇷", en: "Greece", zh: "希腊", region: "Europe / 欧洲" },
  { code: "HU", emoji: "🇭🇺", en: "Hungary", zh: "匈牙利", region: "Europe / 欧洲" },
  { code: "IS", emoji: "🇮🇸", en: "Iceland", zh: "冰岛", region: "Europe / 欧洲" },
  { code: "IE", emoji: "🇮🇪", en: "Ireland", zh: "爱尔兰", region: "Europe / 欧洲" },
  { code: "IT", emoji: "🇮🇹", en: "Italy", zh: "意大利", region: "Europe / 欧洲" },
  { code: "XK", emoji: "🇽🇰", en: "Kosovo", zh: "科索沃", region: "Europe / 欧洲" },
  { code: "LV", emoji: "🇱🇻", en: "Latvia", zh: "拉脱维亚", region: "Europe / 欧洲" },
  { code: "LI", emoji: "🇱🇮", en: "Liechtenstein", zh: "列支敦士登", region: "Europe / 欧洲" },
  { code: "LT", emoji: "🇱🇹", en: "Lithuania", zh: "立陶宛", region: "Europe / 欧洲" },
  { code: "LU", emoji: "🇱🇺", en: "Luxembourg", zh: "卢森堡", region: "Europe / 欧洲" },
  { code: "MT", emoji: "🇲🇹", en: "Malta", zh: "马耳他", region: "Europe / 欧洲" },
  { code: "MD", emoji: "🇲🇩", en: "Moldova", zh: "摩尔多瓦", region: "Europe / 欧洲" },
  { code: "MC", emoji: "🇲🇨", en: "Monaco", zh: "摩纳哥", region: "Europe / 欧洲" },
  { code: "ME", emoji: "🇲🇪", en: "Montenegro", zh: "黑山", region: "Europe / 欧洲" },
  { code: "NL", emoji: "🇳🇱", en: "Netherlands", zh: "荷兰", region: "Europe / 欧洲" },
  { code: "MK", emoji: "🇲🇰", en: "North Macedonia", zh: "北马其顿", region: "Europe / 欧洲" },
  { code: "NO", emoji: "🇳🇴", en: "Norway", zh: "挪威", region: "Europe / 欧洲" },
  { code: "PL", emoji: "🇵🇱", en: "Poland", zh: "波兰", region: "Europe / 欧洲" },
  { code: "PT", emoji: "🇵🇹", en: "Portugal", zh: "葡萄牙", region: "Europe / 欧洲" },
  { code: "RO", emoji: "🇷🇴", en: "Romania", zh: "罗马尼亚", region: "Europe / 欧洲" },
  { code: "SM", emoji: "🇸🇲", en: "San Marino", zh: "圣马力诺", region: "Europe / 欧洲" },
  { code: "RS", emoji: "🇷🇸", en: "Serbia", zh: "塞尔维亚", region: "Europe / 欧洲" },
  { code: "SK", emoji: "🇸🇰", en: "Slovakia", zh: "斯洛伐克", region: "Europe / 欧洲" },
  { code: "SI", emoji: "🇸🇮", en: "Slovenia", zh: "斯洛文尼亚", region: "Europe / 欧洲" },
  { code: "ES", emoji: "🇪🇸", en: "Spain", zh: "西班牙", region: "Europe / 欧洲" },
  { code: "SE", emoji: "🇸🇪", en: "Sweden", zh: "瑞典", region: "Europe / 欧洲" },
  { code: "CH", emoji: "🇨🇭", en: "Switzerland", zh: "瑞士", region: "Europe / 欧洲" },
  { code: "TR", emoji: "🇹🇷", en: "Turkey", zh: "土耳其", region: "Europe / 欧洲" },
  { code: "UA", emoji: "🇺🇦", en: "Ukraine", zh: "乌克兰", region: "Europe / 欧洲" },
  { code: "GB", emoji: "🇬🇧", en: "United Kingdom", zh: "英国", region: "Europe / 欧洲" },
  { code: "VA", emoji: "🇻🇦", en: "Vatican City", zh: "梵蒂冈", region: "Europe / 欧洲" },

  // Asia / 亚洲
  { code: "AF", emoji: "🇦🇫", en: "Afghanistan", zh: "阿富汗", region: "Asia / 亚洲" },
  { code: "BH", emoji: "🇧🇭", en: "Bahrain", zh: "巴林", region: "Asia / 亚洲" },
  { code: "BD", emoji: "🇧🇩", en: "Bangladesh", zh: "孟加拉国", region: "Asia / 亚洲" },
  { code: "BN", emoji: "🇧🇳", en: "Brunei", zh: "文莱", region: "Asia / 亚洲" },
  { code: "KH", emoji: "🇰🇭", en: "Cambodia", zh: "柬埔寨", region: "Asia / 亚洲" },
  { code: "CN", emoji: "🇨🇳", en: "China", zh: "中国", region: "Asia / 亚洲" },
  { code: "HK", emoji: "🇭🇰", en: "Hong Kong", zh: "中国香港", region: "Asia / 亚洲" },
  { code: "IN", emoji: "🇮🇳", en: "India", zh: "印度", region: "Asia / 亚洲" },
  { code: "ID", emoji: "🇮🇩", en: "Indonesia", zh: "印度尼西亚", region: "Asia / 亚洲" },
  { code: "IR", emoji: "🇮🇷", en: "Iran", zh: "伊朗", region: "Asia / 亚洲" },
  { code: "IQ", emoji: "🇮🇶", en: "Iraq", zh: "伊拉克", region: "Asia / 亚洲" },
  { code: "IL", emoji: "🇮🇱", en: "Israel", zh: "以色列", region: "Asia / 亚洲" },
  { code: "JP", emoji: "🇯🇵", en: "Japan", zh: "日本", region: "Asia / 亚洲" },
  { code: "JO", emoji: "🇯🇴", en: "Jordan", zh: "约旦", region: "Asia / 亚洲" },
  { code: "KZ", emoji: "🇰🇿", en: "Kazakhstan", zh: "哈萨克斯坦", region: "Asia / 亚洲" },
  { code: "KW", emoji: "🇰🇼", en: "Kuwait", zh: "科威特", region: "Asia / 亚洲" },
  { code: "LA", emoji: "🇱🇦", en: "Laos", zh: "老挝", region: "Asia / 亚洲" },
  { code: "LB", emoji: "🇱🇧", en: "Lebanon", zh: "黎巴嫩", region: "Asia / 亚洲" },
  { code: "MO", emoji: "🇲🇴", en: "Macau", zh: "中国澳门", region: "Asia / 亚洲" },
  { code: "MY", emoji: "🇲🇾", en: "Malaysia", zh: "马来西亚", region: "Asia / 亚洲" },
  { code: "MV", emoji: "🇲🇻", en: "Maldives", zh: "马尔代夫", region: "Asia / 亚洲" },
  { code: "MN", emoji: "🇲🇳", en: "Mongolia", zh: "蒙古", region: "Asia / 亚洲" },
  { code: "MM", emoji: "🇲🇲", en: "Myanmar", zh: "缅甸", region: "Asia / 亚洲" },
  { code: "NP", emoji: "🇳🇵", en: "Nepal", zh: "尼泊尔", region: "Asia / 亚洲" },
  { code: "KP", emoji: "🇰🇵", en: "North Korea", zh: "朝鲜", region: "Asia / 亚洲" },
  { code: "OM", emoji: "🇴🇲", en: "Oman", zh: "阿曼", region: "Asia / 亚洲" },
  { code: "PK", emoji: "🇵🇰", en: "Pakistan", zh: "巴基斯坦", region: "Asia / 亚洲" },
  { code: "PH", emoji: "🇵🇭", en: "Philippines", zh: "菲律宾", region: "Asia / 亚洲" },
  { code: "QA", emoji: "🇶🇦", en: "Qatar", zh: "卡塔尔", region: "Asia / 亚洲" },
  { code: "SA", emoji: "🇸🇦", en: "Saudi Arabia", zh: "沙特阿拉伯", region: "Asia / 亚洲" },
  { code: "SG", emoji: "🇸🇬", en: "Singapore", zh: "新加坡", region: "Asia / 亚洲" },
  { code: "KR", emoji: "🇰🇷", en: "South Korea", zh: "韩国", region: "Asia / 亚洲" },
  { code: "LK", emoji: "🇱🇰", en: "Sri Lanka", zh: "斯里兰卡", region: "Asia / 亚洲" },
  { code: "SY", emoji: "🇸🇾", en: "Syria", zh: "叙利亚", region: "Asia / 亚洲" },
  { code: "TW", emoji: "🇹🇼", en: "Taiwan", zh: "中国台湾", region: "Asia / 亚洲" },
  { code: "TH", emoji: "🇹🇭", en: "Thailand", zh: "泰国", region: "Asia / 亚洲" },
  { code: "AE", emoji: "🇦🇪", en: "United Arab Emirates", zh: "阿联酋", region: "Asia / 亚洲" },
  { code: "VN", emoji: "🇻🇳", en: "Vietnam", zh: "越南", region: "Asia / 亚洲" },
  { code: "YE", emoji: "🇾🇪", en: "Yemen", zh: "也门", region: "Asia / 亚洲" },

  // Americas / 美洲
  { code: "AR", emoji: "🇦🇷", en: "Argentina", zh: "阿根廷", region: "Americas / 美洲" },
  { code: "BS", emoji: "🇧🇸", en: "Bahamas", zh: "巴哈马", region: "Americas / 美洲" },
  { code: "BB", emoji: "🇧🇧", en: "Barbados", zh: "巴巴多斯", region: "Americas / 美洲" },
  { code: "BZ", emoji: "🇧🇿", en: "Belize", zh: "伯利兹", region: "Americas / 美洲" },
  { code: "BO", emoji: "🇧🇴", en: "Bolivia", zh: "玻利维亚", region: "Americas / 美洲" },
  { code: "BR", emoji: "🇧🇷", en: "Brazil", zh: "巴西", region: "Americas / 美洲" },
  { code: "CA", emoji: "🇨🇦", en: "Canada", zh: "加拿大", region: "Americas / 美洲" },
  { code: "CL", emoji: "🇨🇱", en: "Chile", zh: "智利", region: "Americas / 美洲" },
  { code: "CO", emoji: "🇨🇴", en: "Colombia", zh: "哥伦比亚", region: "Americas / 美洲" },
  { code: "CR", emoji: "🇨🇷", en: "Costa Rica", zh: "哥斯达黎加", region: "Americas / 美洲" },
  { code: "CU", emoji: "🇨🇺", en: "Cuba", zh: "古巴", region: "Americas / 美洲" },
  { code: "DO", emoji: "🇩🇴", en: "Dominican Republic", zh: "多米尼加", region: "Americas / 美洲" },
  { code: "EC", emoji: "🇪🇨", en: "Ecuador", zh: "厄瓜多尔", region: "Americas / 美洲" },
  { code: "SV", emoji: "🇸🇻", en: "El Salvador", zh: "萨尔瓦多", region: "Americas / 美洲" },
  { code: "GT", emoji: "🇬🇹", en: "Guatemala", zh: "危地马拉", region: "Americas / 美洲" },
  { code: "HN", emoji: "🇭🇳", en: "Honduras", zh: "洪都拉斯", region: "Americas / 美洲" },
  { code: "JM", emoji: "🇯🇲", en: "Jamaica", zh: "牙买加", region: "Americas / 美洲" },
  { code: "MX", emoji: "🇲🇽", en: "Mexico", zh: "墨西哥", region: "Americas / 美洲" },
  { code: "NI", emoji: "🇳🇮", en: "Nicaragua", zh: "尼加拉瓜", region: "Americas / 美洲" },
  { code: "PA", emoji: "🇵🇦", en: "Panama", zh: "巴拿马", region: "Americas / 美洲" },
  { code: "PY", emoji: "🇵🇾", en: "Paraguay", zh: "巴拉圭", region: "Americas / 美洲" },
  { code: "PE", emoji: "🇵🇪", en: "Peru", zh: "秘鲁", region: "Americas / 美洲" },
  { code: "PR", emoji: "🇵🇷", en: "Puerto Rico", zh: "波多黎各", region: "Americas / 美洲" },
  { code: "TT", emoji: "🇹🇹", en: "Trinidad and Tobago", zh: "特立尼达和多巴哥", region: "Americas / 美洲" },
  { code: "US", emoji: "🇺🇸", en: "United States", zh: "美国", region: "Americas / 美洲" },
  { code: "UY", emoji: "🇺🇾", en: "Uruguay", zh: "乌拉圭", region: "Americas / 美洲" },
  { code: "VE", emoji: "🇻🇪", en: "Venezuela", zh: "委内瑞拉", region: "Americas / 美洲" },

  // Oceania / 大洋洲
  { code: "AU", emoji: "🇦🇺", en: "Australia", zh: "澳大利亚", region: "Oceania / 大洋洲" },
  { code: "FJ", emoji: "🇫🇯", en: "Fiji", zh: "斐济", region: "Oceania / 大洋洲" },
  { code: "KI", emoji: "🇰🇮", en: "Kiribati", zh: "基里巴斯", region: "Oceania / 大洋洲" },
  { code: "MH", emoji: "🇲🇭", en: "Marshall Islands", zh: "马绍尔群岛", region: "Oceania / 大洋洲" },
  { code: "FM", emoji: "🇫🇲", en: "Micronesia", zh: "密克罗尼西亚", region: "Oceania / 大洋洲" },
  { code: "NR", emoji: "🇳🇷", en: "Nauru", zh: "瑙鲁", region: "Oceania / 大洋洲" },
  { code: "NZ", emoji: "🇳🇿", en: "New Zealand", zh: "新西兰", region: "Oceania / 大洋洲" },
  { code: "PW", emoji: "🇵🇼", en: "Palau", zh: "帕劳", region: "Oceania / 大洋洲" },
  { code: "PG", emoji: "🇵🇬", en: "Papua New Guinea", zh: "巴布亚新几内亚", region: "Oceania / 大洋洲" },
  { code: "WS", emoji: "🇼🇸", en: "Samoa", zh: "萨摩亚", region: "Oceania / 大洋洲" },
  { code: "SB", emoji: "🇸🇧", en: "Solomon Islands", zh: "所罗门群岛", region: "Oceania / 大洋洲" },
  { code: "TO", emoji: "🇹🇴", en: "Tonga", zh: "汤加", region: "Oceania / 大洋洲" },
  { code: "TV", emoji: "🇹🇻", en: "Tuvalu", zh: "图瓦卢", region: "Oceania / 大洋洲" },
  { code: "VU", emoji: "🇻🇺", en: "Vanuatu", zh: "瓦努阿图", region: "Oceania / 大洋洲" },

  // Africa / 非洲
  { code: "DZ", emoji: "🇩🇿", en: "Algeria", zh: "阿尔及利亚", region: "Africa / 非洲" },
  { code: "EG", emoji: "🇪🇬", en: "Egypt", zh: "埃及", region: "Africa / 非洲" },
  { code: "ET", emoji: "🇪🇹", en: "Ethiopia", zh: "埃塞俄比亚", region: "Africa / 非洲" },
  { code: "GH", emoji: "🇬🇭", en: "Ghana", zh: "加纳", region: "Africa / 非洲" },
  { code: "KE", emoji: "🇰🇪", en: "Kenya", zh: "肯尼亚", region: "Africa / 非洲" },
  { code: "MA", emoji: "🇲🇦", en: "Morocco", zh: "摩洛哥", region: "Africa / 非洲" },
  { code: "NG", emoji: "🇳🇬", en: "Nigeria", zh: "尼日利亚", region: "Africa / 非洲" },
  { code: "ZA", emoji: "🇿🇦", en: "South Africa", zh: "南非", region: "Africa / 非洲" },
  { code: "TN", emoji: "🇹🇳", en: "Tunisia", zh: "突尼斯", region: "Africa / 非洲" },

  // Other / 其他
  { code: "OTHER", emoji: "🌍", en: "Other", zh: "其他", region: "Other / 其他" },
];

function getCountryMeta(countryCode) {
  return (
    countryOptions.find((item) => item.code === countryCode) ||
    countryOptions.find((item) => item.code === "OTHER")
  );
}

function getPostHotScore(post) {
  const reactionTotal = Object.values(post.reactions || {}).reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    (post.likes || 0) * 3 +
    (post.comments?.length || 0) * 4 +
    (post.shares || 0) * 3 +
    (post.saves || 0) * 2 +
    reactionTotal
  );
}

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

function ExpandableText({
  text,
  preview = 100,
  maxLength = 1000,
  textClassName = "text-base leading-7 text-gray-800",
}) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const trimmedText = text.slice(0, maxLength);
  const needsExpand = trimmedText.length > preview;
  const visibleText =
    expanded || !needsExpand
      ? trimmedText
      : `${trimmedText.slice(0, preview)}...`;

  return (
    <div>
      <p className={`${textClassName} whitespace-pre-wrap`}>{visibleText}</p>
      {needsExpand && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-sm font-medium text-purple-700 hover:text-purple-800"
        >
          {expanded ? "收起全文" : "展开全文"}
        </button>
      )}
      <div className="mt-1 text-xs text-gray-400">正文最多建议 1000 字</div>
    </div>
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
            <div className="text-sm font-medium text-gray-800">
              {comment.author}
            </div>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              {comment.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onReact, onLike, onSave, onShare, onAddComment }) {
  const [commentInput, setCommentInput] = useState("");
  const [showReactions, setShowReactions] = useState(false);
  const countryMeta = getCountryMeta(post.country);

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
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
              <span>{countryMeta.emoji}</span>
              <span>{countryMeta.en} / {countryMeta.zh}</span>
              <span>·</span>
              <span>热度 {getPostHotScore(post)}</span>
            </div>
            <h3 className="text-2xl font-bold leading-9 text-gray-900">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              不是一句情绪，而是一份更完整的经历记录。
            </p>
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
          <ExpandableText text={post.summary} preview={100} maxLength={1000} />
          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
            <ExpandableText
              text={post.details}
              preview={120}
              maxLength={1000}
              textClassName="text-sm leading-7 text-gray-700"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <ActionButton active={false} onClick={() => onLike(post.id)}>
              👍 赞同 {post.likes}
            </ActionButton>
            <ActionButton
              active={false}
              onClick={() => setShowReactions(!showReactions)}
            >
              💬 评论 {post.comments.length}
            </ActionButton>
            <ActionButton active={false} onClick={() => onSave(post.id)}>
              ★ 收藏 {post.saves}
            </ActionButton>
            <ActionButton active={false} onClick={() => onShare(post.id)}>
              ↗ 分享 {post.shares}
            </ActionButton>
            <button type="button" className="px-2 py-2 text-xl text-gray-400">
              …
            </button>
          </div>

          {showReactions && (
            <div className="mt-4 rounded-2xl bg-gray-50 p-4">
              <div className="mb-3 text-sm font-medium text-gray-700">
                更细的互动反馈
              </div>
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
                  onChange={(e) =>
                    setCommentInput(e.target.value.slice(0, 1000))
                  }
                  maxLength={1000}
                  placeholder="写下你的看法、补充经历，或者给出建设性建议。最多 1000 字。"
                  className="min-h-[96px] w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span>建议评论尽量具体、克制、有信息量</span>
                  <span>{commentInput.length}/1000</span>
                </div>
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
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    authorIdentity: "",
    otherPartyIdentity: "",
    date: "",
    location: "",
    country: "",
    summary: "",
    details: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return;
    }

    const normalizedPosts = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      authorIdentity: item.author_identity,
      otherPartyIdentity: item.other_party_identity,
      date: item.date,
      location: item.location,
      country: item.country,
      summary: item.summary,
      details: item.details,
      reactions: item.reactions || {
        same: 0,
        shocked: 0,
        support: 0,
        angry: 0,
        different: 0,
        helpful: 0,
      },
      comments: item.comments || [],
      likes: item.likes || 0,
      saves: item.saves || 0,
      shares: item.shares || 0,
    }));

    setPosts(normalizedPosts);
  };

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => getPostHotScore(b) - getPostHotScore(a));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedPosts;
    return sortedPosts.filter((post) =>
      [
        post.title,
        post.authorIdentity,
        post.otherPartyIdentity,
        post.date,
        post.location,
        post.country,
        post.summary,
        post.details,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [sortedPosts, search]);

  const countryStats = useMemo(() => {
    const statsMap = posts.reduce((acc, post) => {
      const code = post.country || "OTHER";
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statsMap)
      .map(([code, count]) => {
        const meta = getCountryMeta(code);
        return { ...meta, count };
      })
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitPost = async () => {
    const requiredFields = [
      "title",
      "authorIdentity",
      "otherPartyIdentity",
      "date",
      "location",
      "country",
      "summary",
      "details",
    ];

    const missing = requiredFields.filter(
      (field) => !String(form[field] || "").trim()
    );

    if (missing.length > 0) {
      alert("请把标题、身份、国家、日期、地点、经过概述和补充细节都填写完整。");
      return;
    }

    const payload = {
      title: form.title.trim(),
      summary: form.summary.slice(0, 1000).trim(),
      details: form.details.slice(0, 1000).trim(),
      author_identity: form.authorIdentity,
      other_party_identity: form.otherPartyIdentity,
      location: form.location.trim(),
      country: form.country,
      date: form.date,
    };

    const { data, error } = await supabase.from("posts").insert([payload]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      alert(`发布失败：${error.message}`);
      return;
    }

    console.log("Insert success:", data);
    await fetchPosts();

    setForm({
      title: "",
      authorIdentity: "",
      otherPartyIdentity: "",
      date: "",
      location: "",
      country: "",
      summary: "",
      details: "",
    });

    alert("发布成功");
  };

  const reactToPost = async (postId, reactionKey) => {
  const targetPost = posts.find((post) => post.id === postId);
  if (!targetPost) return;

  const newReactions = {
    ...(targetPost.reactions || {
      same: 0,
      shocked: 0,
      support: 0,
      angry: 0,
      different: 0,
      helpful: 0,
    }),
    [reactionKey]: ((targetPost.reactions || {})[reactionKey] || 0) + 1,
  };

  const { error } = await supabase
    .from("posts")
    .update({ reactions: newReactions })
    .eq("id", postId);

  if (error) {
    console.error("Failed to update reactions:", error);
    alert(`反馈失败：${error.message}`);
    return;
  }

  setPosts((prev) =>
    prev.map((post) =>
      post.id === postId ? { ...post, reactions: newReactions } : post
    )
  );
};

  const addComment = async (postId, text) => {
  const safeText = text.slice(0, 1000).trim();
  if (!safeText) return;

  const targetPost = posts.find((post) => post.id === postId);
  if (!targetPost) return;

  const newComments = [
    ...(targetPost.comments || []),
    {
      id: Date.now() + Math.random(),
      author: "匿名用户",
      text: safeText,
    },
  ];

  const { error } = await supabase
    .from("posts")
    .update({ comments: newComments })
    .eq("id", postId);

  if (error) {
    console.error("Failed to add comment:", error);
    alert(`评论失败：${error.message}`);
    return;
  }

  setPosts((prev) =>
    prev.map((post) =>
      post.id === postId ? { ...post, comments: newComments } : post
    )
  );
};

  const incrementField = async (postId, field) => {
  const targetPost = posts.find((post) => post.id === postId);
  if (!targetPost) return;

  const newValue = (targetPost[field] || 0) + 1;

  const { error } = await supabase
    .from("posts")
    .update({ [field]: newValue })
    .eq("id", postId);

  if (error) {
    console.error(`Failed to update ${field}:`, error);
    alert(`操作失败：${error.message}`);
    return;
  }

  setPosts((prev) =>
    prev.map((post) =>
      post.id === postId ? { ...post, [field]: newValue } : post
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
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <span className="text-gray-900">Not Just Me</span>
                  <span className="text-purple-600">/</span>
                  <span className="text-purple-600">原来不止我</span>
                </button>
              </h1>

              <p className="mt-5 max-w-3xl whitespace-pre-line text-lg leading-8 text-gray-600">
                欧洲不适/歧视/差别对待经历收录平台
                {"\n"}
                这不是一个只让人发泄情绪的地方，而是一个鼓励大家把经历写得更完整、更具体、更能帮助彼此理解处境的平台。
              </p>
            </div>

          
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.72fr_0.28fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">社区内容</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    帖子会根据点赞、评论、分享、收藏和互动热度动态排序。
                  </p>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索标题、地点、身份、国家…"
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
                  还没有内容，成为第一个发布的人吧。
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">发布你的经历</h2>
              <p className="mt-1 text-sm text-gray-600">
                把经历写得更完整，能帮助更多人理解真实场景。
              </p>

              <div className="mt-6 grid gap-4">
                <input
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="帖子标题，例如：在某机场被区别对待"
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                />

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    我的身份
                  </label>
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
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    让我不舒服的人的身份
                  </label>
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
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    发生国家
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  >
                    <option value="">请选择 / Please select</option>
                    {Object.entries(
                      countryOptions.reduce((acc, item) => {
                        if (!acc[item.region]) acc[item.region] = [];
                        acc[item.region].push(item);
                        return acc;
                      }, {})
                    ).map(([region, countries]) => (
                      <optgroup key={region} label={region}>
                        {countries.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.emoji} {option.en} / {option.zh}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    发生日期
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    发生地点
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                    placeholder="例如：伦敦希思罗机场 / 巴黎某餐厅 / 柏林某博物馆"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    事情经过概述
                  </label>
                  <textarea
                    value={form.summary}
                    onChange={(e) => updateForm("summary", e.target.value.slice(0, 1000))}
                    maxLength={1000}
                    placeholder="请写清当时发生了什么。"
                    className="min-h-[120px] w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                  />
                  <div className="mt-2 text-right text-xs text-gray-400">
                    {form.summary.length}/1000
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 p-3">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    补充细节与感受
                  </label>
                  <textarea
                    value={form.details}
                    onChange={(e) => updateForm("details", e.target.value.slice(0, 1000))}
                    maxLength={1000}
                    placeholder="补充上下文、感受和细节。"
                    className="min-h-[140px] w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                  />
                  <div className="mt-2 text-right text-xs text-gray-400">
                    {form.details.length}/1000
                  </div>
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
                      country: "",
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
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">地区数据</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    按国家统计当前社区里被提到的次数。
                  </p>
                </div>
                <div className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                  共 {posts.length} 条帖子
                </div>
              </div>

              <div className="mt-4 grid max-h-[420px] gap-3 overflow-y-auto pr-1">
                {countryStats.map((item) => (
                  <div
                    key={item.code}
                    className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <span>{item.en} / {item.zh}</span>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 font-semibold text-gray-900 ring-1 ring-gray-200">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">关于这个网站</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                这个网站的初衷，是让那些曾经让人感到委屈、被轻视、被区别对待、被误解的瞬间，不再只停留在心里。
                你可以分享在机场、餐厅、酒店、景点、商店、学校、职场或其他公共场所中让你感到不舒服的经历。
              </p>
            </div>

            <div className="rounded-[28px] border border-purple-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">发布前建议</h3>
              <p className="mt-2 text-sm text-gray-600">写得越具体，越能帮助后来的人。</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
                <li>请尽量写清你的身份、对方身份、国家、日期、地点和事情经过。</li>
                <li>正文建议控制在 1000 字以内，但尽量把关键信息写完整。</li>
                <li>避免公开他人的私人信息，保护自己也保护他人。</li>
                <li>欢迎表达感受，但更鼓励提供能帮助别人判断情境的事实细节。</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">联系与反馈</h2>
              <div className="mt-4 rounded-2xl border border-purple-100 bg-purple-50 p-4 text-sm leading-7 text-gray-700">
                <p>
                  如果你对网站内容结构、发布方式、互动功能或社区规范有建议，可以通过下面的邮箱联系我：
                </p>
                <p className="mt-2 font-semibold text-purple-700">
                  contact.notjust.me@gmail.com
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">免责声明</h2>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                <p className="font-semibold text-gray-800">免责声明 / Disclaimer</p>

                <p className="mt-3">
                  本网站内容均由用户自行发布，仅代表发布者个人观点和经历。本平台不对内容的真实性、完整性或准确性作任何保证，也不对由此产生的任何后果承担责任。
                </p>

                <p className="mt-2">
                  我们鼓励用户尽可能提供真实、具体、有信息价值的内容，但无法对每一条信息进行审核或验证。请读者在浏览和参考时自行判断。
                </p>

                <p className="mt-2">
                  所有用户在使用本平台时，应遵守基本的法律法规和社区规范，不得发布涉及诽谤、歧视、人身攻击或侵犯他人隐私的内容。
                </p>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p>
                    All content on this platform is generated by users and reflects their personal experiences and opinions only. We do not guarantee the accuracy, completeness, or reliability of any content.
                  </p>

                  <p className="mt-2">
                    The platform does not verify every submission. Readers should use their own judgment when interpreting the information.
                  </p>

                  <p className="mt-2">
                    Users must comply with laws and community guidelines and must not post defamatory, abusive, discriminatory, or privacy-violating content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 NotJustMe.app — All rights reserved.</p>
          <p className="mt-2">
            本平台目前处于 Beta 测试阶段，部分功能和内容可能持续优化调整。
          </p>
          <p className="mt-1">
            This platform is currently in Beta. Features and content may change as we improve the experience.
          </p>
        </footer>
      </div>
    </div>
  );
}
