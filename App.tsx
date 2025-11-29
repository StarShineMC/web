import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Hammer, 
  Users, 
  Server, 
  Cpu, 
  Sparkles, 
  Map, 
  Sword, 
  Github, 
  Youtube, 
  Copy, 
  CheckCheck,
  Menu,
  X,
  MessageCircle,
  Video
} from 'lucide-react';
import { TeamMember, Feature, SocialLink } from './types';

// --- Constants & Data ---

const SERVER_IP = "play.starshine.example.com"; // Placeholder IP
const QQ_GROUP = "123456789"; // Placeholder QQ

const TEAM_DATA: TeamMember[] = [
  {
    name: "StarAdmin",
    role: "服主 / 技术总监",
    description: "全栈开发，负责服务器核心架构与性能优化。拥有多年服务器运维经验。",
    avatar: "https://picsum.photos/200/200?random=1"
  },
  {
    name: "PixelArchitect",
    role: "总建筑师",
    description: "主导服务器主城及大型景观建设，审美在线，细节控。",
    avatar: "https://picsum.photos/200/200?random=2"
  },
  {
    name: "ModMaster",
    role: "玩法策划",
    description: "设计RPG数值与生存玩法，致力于平衡性与趣味性的完美统一。",
    avatar: "https://picsum.photos/200/200?random=3"
  },
  {
    name: "CommunityLead",
    role: "社区管理",
    description: "维护社区秩序，处理玩家反馈，举办服务器活动。",
    avatar: "https://picsum.photos/200/200?random=4"
  }
];

const FEATURES_DATA: Feature[] = [
  {
    title: "建筑创造",
    description: "目前主打玩法。提供超大领地、WorldEdit支持、海量装饰性方块，释放你的创造力。",
    icon: <Hammer className="w-6 h-6" />,
    status: 'active'
  },
  {
    title: "生存探索",
    description: "计划2025年Q2上线。定制地形生成，硬核生存挑战，经济系统。",
    icon: <Map className="w-6 h-6" />,
    status: 'planned'
  },
  {
    title: "RPG 剧情",
    description: "正在筹备中。沉浸式主线剧情，职业系统，副本挑战。",
    icon: <Sword className="w-6 h-6" />,
    status: 'planned'
  },
  {
    title: "高性能硬件",
    description: "采用实体公网服务器，高性能CPU与大内存，拒绝卡顿，保障流畅体验。",
    icon: <Cpu className="w-6 h-6" />,
    status: 'active'
  }
];

const SOCIALS: SocialLink[] = [
  {
    name: "Bilibili",
    url: "#",
    icon: <Youtube className="w-5 h-5" />, // Lucide doesn't have Bilibili, using Youtube as placeholder icon
    label: "官方 B站"
  },
  {
    name: "Douyin",
    url: "#",
    icon: <Video className="w-5 h-5" />,
    label: "官方 抖音"
  },
  {
    name: "Github",
    url: "https://github.com",
    icon: <Github className="w-5 h-5" />,
    label: "开源项目"
  }
];

// --- Sub-Components ---

const SectionTitle = ({ children, subtitle }: { children?: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center overflow-hidden">
    <motion.h2 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 w-20 bg-star-500 mx-auto rounded-full"
      />
    )}
  </div>
);

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-space-700/50 hover:bg-space-700 border border-star-500/30 rounded-lg transition-all active:scale-95 group"
    >
      <span className="text-gray-300 font-mono text-sm">{label}: {text}</span>
      {copied ? <CheckCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-star-400 group-hover:text-white" />}
    </button>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax for hero background
  const yBg = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-star-500/30 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-space-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-star-400 w-6 h-6" />
            <span className="text-xl font-bold tracking-tight text-white">StarShine<span className="text-star-400">.</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">关于我们</a>
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">特色玩法</a>
            <a href="#team" className="text-sm text-gray-300 hover:text-white transition-colors">管理团队</a>
            <a href="#contact" className="px-5 py-2 bg-star-500 hover:bg-star-400 text-white text-sm font-medium rounded-full transition-all shadow-[0_0_15px_rgba(83,109,254,0.3)]">
              加入 QQ 群
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-space-900/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-medium">关于我们</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-medium">特色玩法</a>
            <a href="#team" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-medium">管理团队</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-star-400 font-medium">加入社区</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-space-900/40 via-space-900/60 to-space-900 z-10" />
          <img 
            src="https://t.alcy.cc/moez" 
            alt="Server Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: opacityHero }}
          className="relative z-20 container mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
              星光 <span className="text-transparent bg-clip-text bg-gradient-to-r from-star-400 to-purple-400">StarShine</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            2024年底创立 · 宝藏小服 · 技术驱动<br />
            在这里，创造你的世界，谱写新的传奇。
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <CopyButton text={SERVER_IP} label="IP" />
            <CopyButton text={QQ_GROUP} label="Q群" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative bg-space-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">关于 StarShine</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                StarShine 服务器创立于 2024 年底，是一个致力于提供高质量游戏体验的宝藏小服。
                我们不仅仅是一个游戏服务器，更是一个充满活力的社区。
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                我们采用<span className="text-star-400 font-semibold">实体公网服务器</span>托管，拥有优越的硬件配置和专业的管理团队。
                无论你是建筑大神、红石专家，还是喜欢冒险的生存玩家，这里都有属于你的一片天地。
              </p>
              <div className="flex gap-4 text-sm text-gray-500 font-mono">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-star-400" />
                  <span>24/7 在线</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-star-400" />
                  <span>和谐社区</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-star-500/10 blur-3xl rounded-full" />
              <img 
                src="https://picsum.photos/600/400?grayscale" 
                alt="About Server" 
                className="relative rounded-2xl border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-space-800/50">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Features">玩法与特色</SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_DATA.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-space-900 border border-white/5 p-6 rounded-xl hover:border-star-500/50 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${feature.status === 'active' ? 'bg-star-500/20 text-star-400 group-hover:bg-star-500 group-hover:text-white' : 'bg-gray-800/50 text-gray-500'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                {feature.status === 'planned' && (
                  <span className="inline-block px-2 py-1 text-xs font-mono bg-yellow-500/10 text-yellow-500 rounded border border-yellow-500/20">
                    开发中
                  </span>
                )}
                {feature.status === 'active' && (
                  <span className="inline-block px-2 py-1 text-xs font-mono bg-green-500/10 text-green-500 rounded border border-green-500/20">
                    运行中
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-space-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-star-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Team">管理团队</SectionTitle>
          <p className="text-center text-gray-400 mb-12 -mt-8">技术水平优越 · 用心打造每一个细节</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_DATA.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-space-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 text-center group hover:bg-space-800 transition-colors"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-star-500 rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full rounded-full object-cover relative z-10 border-2 border-space-700"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-star-400 text-sm font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer id="contact" className="bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Sparkles className="text-star-400 w-6 h-6" />
                <span className="text-2xl font-bold text-white">StarShine</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                2024年底创立的宝藏Minecraft服务器。
                <br />
                期待你的加入。
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <h4 className="text-white font-medium mb-2">关注我们</h4>
              <div className="flex gap-4">
                {SOCIALS.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-space-800 flex items-center justify-center text-gray-400 hover:bg-star-500 hover:text-white transition-all hover:-translate-y-1"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-space-900/50 p-8 rounded-2xl border border-white/5 max-w-3xl mx-auto">
             <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">加入玩家交流群</h3>
                <p className="text-gray-400 text-sm">获取最新公告、白名单申请及客户端下载</p>
             </div>
             <div className="flex items-center gap-3">
               <MessageCircle className="text-star-400 w-8 h-8" />
               <div className="text-2xl font-mono text-white font-bold tracking-wider">{QQ_GROUP}</div>
               <CopyButton text={QQ_GROUP} label="复制" />
             </div>
          </div>

          <div className="text-center text-gray-600 text-xs mt-16">
            &copy; 2024-2025 StarShine Server. Not affiliated with Mojang Studios.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;