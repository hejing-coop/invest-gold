/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowDownUp, 
  ChevronsUp, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Scale, 
  ShieldCheck, 
  Clock, 
  MonitorPlay, 
  Landmark, 
  Gauge, 
  Cpu, 
  BarChart2, 
  Building2,
  Menu,
  X,
  MessageCircle 
} from 'lucide-react';

// 常量定義
const LOGO_URL = "https://www.dropbox.com/scl/fi/1lg91xa98mrfe7hghs8t1/Logo.png?rlkey=332lexpb0cg3edsgckdaad1j5&st=61xlef0b&dl=1";
const VIDEO_URL = "https://www.dropbox.com/scl/fi/chtzsye61p2xf6shv0gh7/.mp4?rlkey=h6yscrsphzggtm5oiao2enhmc&st=s7ro4ol5&dl=1";
// 更新為您提供的 LINE 官方帳號連結
const CONTACT_LINK = "https://lin.ee/gGmdaU2"; 

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const checkSession = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // 亞盤: 09:00 - 11:00 (540 - 660)
      if (totalMinutes >= 540 && totalMinutes <= 660) setCurrentSession('asia');
      // 歐盤: 15:00 - 17:00 (900 - 1020)
      else if (totalMinutes >= 900 && totalMinutes <= 1020) setCurrentSession('europe');
      // 美盤: 20:30 - 22:30 (1230 - 1350)
      else if (totalMinutes >= 1230 && totalMinutes <= 1350) setCurrentSession('america');
      else setCurrentSession(null);
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F9F1D8] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* 背景裝飾 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C5A059] opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C5A059] opacity-[0.03] blur-[120px] rounded-full"></div>
      </div>

      {/* 導覽列 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#0B0E14]/90 backdrop-blur-md border-[#7A6030]/30 py-3 shadow-2xl' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] overflow-hidden">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest bg-gradient-to-r from-[#F9F1D8] via-[#D4AF37] to-[#F9F1D8] bg-clip-text text-transparent animate-pulse">合境</span>
              <span className="text-[10px] text-[#C5A059] tracking-[0.2em] font-medium uppercase">Co&operation</span>
            </div>
          </div>

          {/* 桌面端菜單 */}
          <div className="hidden md:flex items-center space-x-8">
            {['orders', 'nfp', 'mindset', 'indicators'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)}
                className="text-sm font-medium text-[#F9F1D8]/70 hover:text-[#D4AF37] transition-colors capitalize"
              >
                {item === 'orders' ? '訂單類型' : item === 'nfp' ? '非農數據' : item === 'mindset' ? '操作心法' : '市場指標'}
              </button>
            ))}
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold hover:bg-[#D4AF37] hover:text-black transition-all">
              立即諮詢
            </a>
          </div>

          {/* 手機端菜單按鈕 */}
          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 手機端抽屜 */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0B0E14] border-b border-[#7A6030]/30 py-6 px-4 space-y-4 shadow-2xl">
            {['orders', 'nfp', 'mindset', 'indicators'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)}
                className="block w-full text-left py-2 text-lg text-[#F9F1D8]/80"
              >
                {item === 'orders' ? '四大訂單類型' : item === 'nfp' ? '非農數據分析' : item === 'mindset' ? '風險控制心法' : '關鍵市場指標'}
              </button>
            ))}
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 bg-[#D4AF37] text-black font-bold rounded-xl mt-4">
              聯繫專業導師
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
            Professional • Stable • Legacy
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
            合境 <span className="bg-gradient-to-b from-[#F9F1D8] to-[#D4AF37] bg-clip-text text-transparent">黃金投資指南</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            掌握市場脈動，學會風險控制。從基礎訂單到宏觀經濟數據，為您的投資之路打下堅實基礎。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => scrollTo('orders')} className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-bold hover:bg-[#F9F1D8] transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
              開始學習 <ArrowRight size={20} />
            </button>
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-bold hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2">
              <MessageCircle size={20} /> 免費諮詢
            </a>
          </div>
        </div>
        
        {/* 背景裝飾球 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7A6030]/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* 四大訂單類型 */}
      <section id="orders" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Order Types</h2>
          <h3 className="text-4xl md:text-5xl font-bold">四大訂單類型</h3>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OrderCard 
            title="Buy Limit (買入限價)" 
            slogan="低價買"
            desc="在低於當前市價掛「買單」，逢低買入。"
            example="現價 3530，預期回調至 3510 後上漲。在 3510 設 Buy Limit。"
            icon={<ArrowDownUp className="text-emerald-400" />}
            borderColor="emerald"
          />
          <OrderCard 
            title="Sell Limit (賣出限價)" 
            slogan="高價賣"
            desc="在高於當前市價掛「賣單」，逢高賣出。"
            example="現價 3530，預期反彈至 3550 遇阻回落。在 3550 設 Sell Limit。"
            icon={<ArrowDownUp className="text-rose-400" />}
            borderColor="rose"
          />
          <OrderCard 
            title="Buy Stop (買入突破)" 
            slogan="突破買"
            desc="在高於當前市價掛「買單」，突破追漲。"
            example="現價 3530，阻力 3550。判斷突破 3550 會大漲，在此設 Buy Stop。"
            icon={<ArrowDownUp className="text-emerald-400" />}
            borderColor="emerald"
          />
          <OrderCard 
            title="Sell Stop (跌破賣出)" 
            slogan="跌破賣"
            desc="在低於當前市價掛「賣單」，跌破殺跌。"
            example="現價 3530，支撐 3510。判斷跌破 3510 會暴跌，在此設 Sell Stop。"
            icon={<ChevronsUp className="text-rose-400" />}
            borderColor="rose"
          />
        </div>
      </section>

      {/* 非農數據 Section */}
      <section id="nfp" className="py-24 px-4 bg-[#121620] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold mb-6">
              <Calendar size={18} /> 每月第一個週五 20:30/21:30 公佈
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">美國非農就業數據<br/><span className="text-[#D4AF37]">Non-Farm Payrolls</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              這是影響國際金價最重要的經濟指標之一。它直接反映美國就業市場狀況，進而撼動聯準會 (Fed) 的利率政策與美元走勢。
            </p>
            
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#0B0E14] border border-[#7A6030]/20 hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><TrendingUp size={24} /></div>
                  <h4 className="text-xl font-bold">數據強勁 (高於預期)</h4>
                </div>
                <p className="text-slate-400 ml-12">經濟穩健 → 升息機率高 → <span className="text-emerald-400 font-bold">美元強</span> → <span className="text-rose-400 font-bold">金價弱</span></p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0B0E14] border border-[#7A6030]/20 hover:border-rose-500/50 transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400"><TrendingDown size={24} /></div>
                  <h4 className="text-xl font-bold">數據疲弱 (低於預期)</h4>
                </div>
                <p className="text-slate-400 ml-12">經濟降溫 → 降息機率高 → <span className="text-rose-400 font-bold">美元弱</span> → <span className="text-emerald-400 font-bold">金價強</span></p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0B0E14] p-8 md:p-12 rounded-[2rem] border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
             <h3 className="text-2xl font-bold text-[#D4AF37] mb-8 flex items-center gap-2">
               <Zap size={24} /> 核心影響力機制
             </h3>
             <ul className="space-y-8">
               <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold shrink-0">1</div>
                 <div>
                   <h5 className="font-bold text-lg mb-1">利率持有成本</h5>
                   <p className="text-sm text-slate-400 leading-relaxed">黃金不孳息。當利率上升，資金流向有息資產(如國債)，黃金相對吸引力下降。</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold shrink-0">2</div>
                 <div>
                   <h5 className="font-bold text-lg mb-1">避險情緒驅動</h5>
                   <p className="text-sm text-slate-400 leading-relaxed">若非農數據極差，市場擔心經濟衰退，避險資金會迅速湧入黃金市場。</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold shrink-0">3</div>
                 <div>
                   <h5 className="font-bold text-lg mb-1">數據瞬間洗盤</h5>
                   <p className="text-sm text-slate-400 leading-relaxed">公佈當下常伴隨「先漲後跌」或「雙邊掃單」，新手建議觀察 15 分鐘後再行進場。</p>
                 </div>
               </li>
             </ul>
          </div>
        </div>
      </section>

      {/* 心法與風控 Section */}
      <section id="mindset" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Risk Management</h2>
          <h3 className="text-4xl md:text-5xl font-bold">操作心法與風險控制</h3>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">合境強調穩健投資，倉位控制是活在市場的唯一秘訣。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <CardContainer title="利率與國債關係" icon={<Scale size={24} />}>
            <div className="space-y-4">
              <div className="bg-[#121620] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-emerald-400">利率 ⬇</span>
                <ArrowRight size={16} />
                <span className="text-emerald-400">國債 ⬆</span>
              </div>
              <div className="bg-[#121620] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-rose-400">利率 ⬆</span>
                <ArrowRight size={16} />
                <span className="text-rose-400">國債 ⬇</span>
              </div>
              <p className="text-xs text-slate-500 pt-2 italic">※ 黃金與國債呈正相關，與利率呈負相關。</p>
            </div>
          </CardContainer>

          <CardContainer title="倉位管理建議" icon={<ShieldCheck size={24} />}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#D4AF37] font-bold">
                  <td className="py-2">本金 (USD)</td>
                  <td className="py-2 text-right">建議手數</td>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-white/5">
                <tr><td className="py-3">$1,000</td><td className="py-3 text-right font-mono">0.01 - 0.02</td></tr>
                <tr><td className="py-3">$3,000</td><td className="py-3 text-right font-mono">0.03 - 0.05</td></tr>
                <tr><td className="py-3">$5,000+</td><td className="py-3 text-right font-mono">0.05 - 0.10</td></tr>
              </tbody>
            </table>
          </CardContainer>

          <CardContainer title="黃金交易熱區" icon={<Clock size={24} />}>
             <div className="space-y-4">
                <TimeRow label="亞盤" time="09:00 - 11:00" highlight={currentSession === 'asia'} />
                <TimeRow label="歐盤" time="15:00 - 17:00" highlight={currentSession === 'europe'} />
                <TimeRow label="美盤" time="20:30 - 22:30" highlight={currentSession === 'america'} />
                <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
                  <div className="bg-[#121620] p-2 rounded text-slate-500">夏令系統維護<br/>05:00-06:00</div>
                  <div className="bg-[#121620] p-2 rounded text-slate-500">冬令系統維護<br/>06:00-07:00</div>
                </div>
             </div>
          </CardContainer>
        </div>

        {/* 實戰影片 */}
        <div className="bg-gradient-to-r from-[#121620] to-[#0B0E14] rounded-3xl border border-[#D4AF37]/30 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch">
          <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
            <h4 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
              <MonitorPlay className="text-[#D4AF37]" /> 分單平倉教學
            </h4>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-[#D4AF37] font-bold mb-2 flex items-center gap-2">
                  <Zap size={16} /> 什麼是分單平倉？
                </h5>
                <p className="text-slate-300 text-sm leading-relaxed">
                  簡單說就是：<span className="text-white font-bold">「先落袋為安，再讓利潤奔跑。」</span><br/>
                  你不用一次把貨出光，而是先賣掉一部分鎖定獲利，剩下的部位繼續留在場內拚更高的報酬。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <h5 className="text-[#D4AF37] font-bold mb-2 flex items-center gap-2">
                    <Zap size={16} /> 兩大核心價值
                  </h5>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h6 className="text-emerald-400 font-bold text-xs mb-2 uppercase tracking-wider">穩賺不賠(保本流)</h6>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    先入袋部分獲利，並將剩下部位改為「保本止損」立於不敗之地。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h6 className="text-blue-400 font-bold text-xs mb-2 uppercase tracking-wider">心態平穩(抗壓流)</h6>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    減壓後更能拿住剩餘部分，避免因小幅震盪而驚慌離場。
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[10px] font-black uppercase">操作口訣</div>
                  <p className="text-lg font-bold tracking-widest text-[#F9F1D8]">「分批減倉，移動止損。」</p>
                </div>
              </div>
            </div>


          </div>
          <div className="flex-1 bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10">
              <video 
                className="w-full h-full object-cover" 
                controls
                poster="https://picsum.photos/400/700"
              >
                <source src={VIDEO_URL} type="video/mp4" />
                您的瀏覽器不支持影片播放。
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* 市場指標 Section */}
      <section id="indicators" className="py-24 px-4 bg-[#121620]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Market Indicators</h2>
            <h3 className="text-4xl md:text-5xl font-bold">跨市場關聯指標</h3>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            <IndicatorBox 
              icon={<Landmark className="text-blue-400" />} 
              title="聯準會 (Fed)" 
              desc="全球資金總管。關注利率決議 (FOMC) 與點陣圖預測。"
              className="md:col-span-3"
            />
            <IndicatorBox 
              icon={<Gauge className="text-purple-400" />} 
              title="恐慌與貪婪指數" 
              desc="CNN 恐慌指數。當市場處於極度恐慌時，黃金往往迎來避險買盤。"
              className="md:col-span-3"
            />
            <IndicatorBox 
              icon={<Cpu className="text-yellow-400" />} 
              title="納斯達克 (NASDAQ)" 
              desc="科技股代表。與黃金有時存在競爭關係，風險胃納量的指標。"
              className="md:col-span-2"
            />
            <IndicatorBox 
              icon={<BarChart2 className="text-emerald-400" />} 
              title="標普500 (S&P 500)" 
              desc="美股大盤。股市暴跌通常會促使資金進入黃金避險。"
              className="md:col-span-2"
            />
            <IndicatorBox 
              icon={<Building2 className="text-slate-400" />} 
              title="道瓊指數 (DJIA)" 
              desc="傳統工業代表。反映實體經濟對美元的信心強度。"
              className="md:col-span-2"
            />
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 flex flex-col justify-center items-center text-center md:col-span-6">
              <h4 className="text-xl font-bold mb-2 text-[#D4AF37]">準備好開始了嗎？</h4>
              <p className="text-sm text-slate-400 mb-6">加入合境，掌握屬於您的財富傳承。</p>
              <a 
                href={CONTACT_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full max-w-md py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F9F1D8] transition-colors text-center block"
              >
                聯繫我們
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 bg-[#050608] border-t border-[#7A6030]/30 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#D4AF37]">
              <img src={LOGO_URL} alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-widest text-[#F9F1D8]">合境 Co&operation</span>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto mb-12 leading-relaxed">
            投資有風險，入市需謹慎。本網站內容僅供教學與學術研究參考，不構成任何形式之投資建議、招攬或承諾。槓桿交易具備極大風險，請務必衡量自身財務承受能力所及之範疇。
          </p>
          <div className="flex justify-center gap-8 mb-8 text-slate-400 text-sm">
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37]">立即諮詢</a>
            <a href="#" className="hover:text-[#D4AF37]">使用條款</a>
            <a href="#" className="hover:text-[#D4AF37]">隱私政策</a>
          </div>
          <p className="text-slate-700 text-xs">
            &copy; 2024 合境 Co&operation. 版權所有。
          </p>
        </div>
      </footer>
    </div>
  );
};

const OrderCard = ({ title, slogan, desc, example, icon, borderColor }: { title: string, slogan: string, desc: string, example: string, icon: React.ReactNode, borderColor: string }) => {
  const borderClass = borderColor === 'emerald' ? 'hover:border-emerald-500/50' : 'hover:border-rose-500/50';
  return (
    <div className={`p-8 rounded-[2rem] bg-[#121620]/50 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:transform hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${borderClass} group`}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 rounded-2xl bg-[#0B0E14] border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#D4AF37] font-black tracking-widest uppercase opacity-50 block mb-1">Memorization</span>
          <span className="text-2xl font-bold text-white tracking-tighter">{slogan}</span>
        </div>
      </div>
      <h4 className="text-xl font-bold mb-4 text-[#F9F1D8]">{title}</h4>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">{desc}</p>
      <div className="p-5 rounded-xl bg-[#0B0E14] border-l-2 border-[#D4AF37] text-xs">
        <strong className="text-[#D4AF37] block mb-2 font-black uppercase tracking-tighter">實戰舉例</strong>
        <p className="text-slate-300 leading-relaxed italic">{example}</p>
      </div>
    </div>
  );
};

const CardContainer = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="p-8 rounded-3xl bg-[#121620]/50 border border-white/5 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-8 text-[#D4AF37]">
      {icon}
      <h4 className="text-xl font-bold text-white">{title}</h4>
    </div>
    {children}
  </div>
);

const IndicatorBox = ({ icon, title, desc, className }: { icon: React.ReactNode, title: string, desc: string, className?: string }) => (
  <div className={`p-8 rounded-3xl bg-[#0B0E14] border border-white/5 hover:border-[#D4AF37]/30 transition-all group ${className}`}>
    <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:rotate-12 transition-transform">{icon}</div>
    <h4 className="text-lg font-bold mb-3">{title}</h4>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const TimeRow = ({ label, time, highlight }: { label: string, time: string, highlight?: boolean }) => (
  <div className={`flex justify-between items-center p-3 rounded-lg border border-white/5 ${highlight ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30' : 'bg-transparent'}`}>
    <span className={`text-sm font-bold ${highlight ? 'text-[#D4AF37]' : 'text-slate-400'}`}>{label}</span>
    <span className={`font-mono text-sm ${highlight ? 'text-white' : 'text-slate-500'}`}>{time}</span>
  </div>
);

export default App;
