'use client';

import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Skill, Experience, Achievement } from '@/types';

/* ─── Data ───────────────────────────────────────────────── */
const skills: Skill[] = [
  { name: 'JavaScript/TypeScript', level: 85, category: 'technical' },
  { name: 'React/Next.js',         level: 90, category: 'technical' },
  { name: 'Python',                level: 80, category: 'technical' },
  { name: 'Node.js',               level: 75, category: 'technical' },
  { name: 'AI/Machine Learning',   level: 70, category: 'technical' },
  { name: 'TailwindCSS',           level: 85, category: 'technical' },
  { name: 'Git/GitHub',            level: 80, category: 'technical' },
  { name: 'Database Design',       level: 70, category: 'technical' },
  { name: 'Uzbek',   level: 100, category: 'language' },
  { name: 'English', level: 95,  category: 'language' },
  { name: 'Korean',  level: 60,  category: 'language' },
  { name: 'Russian', level: 60,  category: 'language' },
  { name: 'Turkish', level: 50,  category: 'language' },
  { name: 'Arabic',  level: 40,  category: 'language' },
  { name: 'Leadership',      level: 85, category: 'soft' },
  { name: 'Communication',   level: 90, category: 'soft' },
  { name: 'Problem Solving', level: 90, category: 'soft' },
  { name: 'Time Management', level: 85, category: 'soft' },
];

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'Personal Projects',
    duration: '2023 - Present',
    description: [
      'Built responsive web applications using React, Next.js, and TypeScript',
      'Implemented AI-powered features using modern ML libraries',
      'Created e-commerce solutions with Shopify integration',
      'Developed portfolio websites with focus on performance and SEO',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Python'],
  },
  {
    id: '2',
    title: 'SAT Prep Tutor',
    company: 'Freelance',
    duration: '2023 - Present',
    description: [
      'Helped students improve SAT scores through personalized teaching',
      'Developed custom study materials and practice tests',
      'Achieved consistent student score improvements of 200+ points',
      'Specialized in Math and English sections',
    ],
  },
  {
    id: '3',
    title: 'Business Development',
    company: 'Dropshipping Ventures',
    duration: '2022 - 2023',
    description: [
      'Launched and managed multiple e-commerce stores',
      'Implemented data-driven marketing strategies',
      'Achieved profitability through systematic product research',
      'Gained experience in international trade and logistics',
    ],
    technologies: ['Shopify', 'Facebook Ads', 'Google Analytics', 'Excel'],
  },
];

const achievements: Achievement[] = [
  { id:'1', title:'SAT Score 1400+',  description:'Achieved high SAT score, aiming for 1600',             date:'2024',       category:'academic' },
  { id:'2', title:'IELTS Band 7.5',   description:'Demonstrated advanced English proficiency',             date:'2024',       category:'academic' },
  { id:'3', title:'6 Languages',      description:'Uzbek, English, Korean, Russian, Turkish, Arabic',     date:'2024',       category:'personal' },
  { id:'4', title:'Chess 2000 ELO',   description:'Working towards 2000 ELO rating — studying classics',  date:'In Progress', category:'personal' },
];

/* ─── Skill Bar ──────────────────────────────────────────── */
const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs">
      <span style={{ color: 'var(--brand-text)' }}>{skill.name}</span>
      <span style={{ color: 'var(--brand-muted)' }}>{skill.level}%</span>
    </div>
    <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
      <motion.div
        className="h-1.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{ background: 'linear-gradient(90deg, var(--brand-green-mid), var(--brand-gold))' }}
      />
    </div>
  </div>
);

/* ─── Full Chess Engine ──────────────────────────────────── */
const PIECES: Record<string, string> = {
  K:'♔', Q:'♕', R:'♖', B:'♗', N:'♘', P:'♙',
  k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟',
};

const KASPAROV_POS = [
  ['r','','','','k','','','r'],
  ['p','b','p','','','p','p','p'],
  ['','p','','p','','n','',''],
  ['','','','N','p','','',''],
  ['','','B','','P','','',''],
  ['','','','','','N','',''],
  ['P','P','P','','','P','P','P'],
  ['R','','','Q','K','B','','R'],
];

const START_POS = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R'],
];

type Board  = string[][];
type Color  = 'white' | 'black';
interface CastleRights { wK:boolean; wQ:boolean; bK:boolean; bQ:boolean }
interface ChessState {
  board:    Board;
  turn:     Color;
  ep:       [number,number] | null;   // en-passant target square
  castle:   CastleRights;
  status:   'playing' | 'check' | 'checkmate' | 'stalemate';
}

const isW  = (p:string) => !!p && p===p.toUpperCase();
const isB  = (p:string) => !!p && p===p.toLowerCase();
const own  = (p:string, c:Color) => c==='white' ? isW(p) : isB(p);
const foe  = (p:string, c:Color) => c==='white' ? isB(p) : isW(p);
const inB  = (r:number, c:number) => r>=0&&r<8&&c>=0&&c<8;

function rawMoves(board:Board, r:number, c:number, color:Color, ep:[number,number]|null): [number,number][] {
  const p = board[r][c]; if (!p) return [];
  const t = p.toUpperCase();
  const mv: [number,number][] = [];

  const slide = (dirs:[number,number][]) => {
    for (const [dr,dc] of dirs) {
      let nr=r+dr, nc=c+dc;
      while (inB(nr,nc)) {
        if (own(board[nr][nc],color)) break;
        mv.push([nr,nc]);
        if (foe(board[nr][nc],color)) break;
        nr+=dr; nc+=dc;
      }
    }
  };
  const step = (sqs:[number,number][]) => {
    for (const [nr,nc] of sqs)
      if (inB(nr,nc) && !own(board[nr][nc],color)) mv.push([nr,nc]);
  };

  if (t==='R') slide([[1,0],[-1,0],[0,1],[0,-1]]);
  if (t==='B') slide([[1,1],[1,-1],[-1,1],[-1,-1]]);
  if (t==='Q') slide([[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]);
  if (t==='N') step([[r-2,c-1],[r-2,c+1],[r+2,c-1],[r+2,c+1],[r-1,c-2],[r-1,c+2],[r+1,c-2],[r+1,c+2]]);
  if (t==='K') step([[r-1,c-1],[r-1,c],[r-1,c+1],[r,c-1],[r,c+1],[r+1,c-1],[r+1,c],[r+1,c+1]]);
  if (t==='P') {
    const dir = color==='white'?-1:1, start = color==='white'?6:1;
    if (inB(r+dir,c) && !board[r+dir][c]) {
      mv.push([r+dir,c]);
      if (r===start && !board[r+dir*2][c]) mv.push([r+dir*2,c]);
    }
    for (const dc of [-1,1]) {
      if (inB(r+dir,c+dc)) {
        if (foe(board[r+dir][c+dc],color)) mv.push([r+dir,c+dc]);
        if (ep && ep[0]===r+dir && ep[1]===c+dc) mv.push([r+dir,c+dc]);
      }
    }
  }
  return mv;
}

function kingPos(board:Board, color:Color): [number,number] {
  const k = color==='white'?'K':'k';
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) if (board[r][c]===k) return [r,c];
  return [-1,-1];
}

function inCheck(board:Board, color:Color): boolean {
  const [kr,kc] = kingPos(board,color);
  if (kr===-1) return true;
  const opp:Color = color==='white'?'black':'white';
  for (let r=0;r<8;r++)
    for (let c=0;c<8;c++)
      if (own(board[r][c],opp))
        if (rawMoves(board,r,c,opp,null).some(([mr,mc])=>mr===kr&&mc===kc)) return true;
  return false;
}

function applyMove(board:Board, sr:number, sc:number, tr:number, tc:number, color:Color, ep:[number,number]|null): Board {
  const next = board.map(row=>[...row]);
  let piece = next[sr][sc];
  if (piece.toUpperCase()==='P' && ep && tr===ep[0] && tc===ep[1])
    next[color==='white'?tr+1:tr-1][tc]='';
  if (piece.toUpperCase()==='P' && (tr===0||tr===7))
    piece = color==='white'?'Q':'q';
  next[tr][tc]=piece; next[sr][sc]='';
  return next;
}

function legalMoves(board:Board, r:number, c:number, color:Color, ep:[number,number]|null, castle:CastleRights): [number,number][] {
  const raw = rawMoves(board,r,c,color,ep);
  const legal = raw.filter(([tr,tc])=>!inCheck(applyMove(board,r,c,tr,tc,color,ep),color));
  const p = board[r][c];
  // Castling
  if (p==='K'&&r===7&&c===4) {
    if (castle.wK&&!board[7][5]&&!board[7][6]&&board[7][7]==='R'
      &&!inCheck(board,'white')
      &&!inCheck(applyMove(board,7,4,7,5,'white',null),'white')
      &&!inCheck(applyMove(board,7,4,7,6,'white',null),'white')) legal.push([7,6]);
    if (castle.wQ&&!board[7][3]&&!board[7][2]&&!board[7][1]&&board[7][0]==='R'
      &&!inCheck(board,'white')
      &&!inCheck(applyMove(board,7,4,7,3,'white',null),'white')
      &&!inCheck(applyMove(board,7,4,7,2,'white',null),'white')) legal.push([7,2]);
  }
  if (p==='k'&&r===0&&c===4) {
    if (castle.bK&&!board[0][5]&&!board[0][6]&&board[0][7]==='r'
      &&!inCheck(board,'black')
      &&!inCheck(applyMove(board,0,4,0,5,'black',null),'black')
      &&!inCheck(applyMove(board,0,4,0,6,'black',null),'black')) legal.push([0,6]);
    if (castle.bQ&&!board[0][3]&&!board[0][2]&&!board[0][1]&&board[0][0]==='r'
      &&!inCheck(board,'black')
      &&!inCheck(applyMove(board,0,4,0,3,'black',null),'black')
      &&!inCheck(applyMove(board,0,4,0,2,'black',null),'black')) legal.push([0,2]);
  }
  return legal;
}

function allLegal(state:ChessState): [number,number,number,number][] {
  const all:[number,number,number,number][]=[];
  for (let r=0;r<8;r++)
    for (let c=0;c<8;c++)
      if (own(state.board[r][c],state.turn))
        legalMoves(state.board,r,c,state.turn,state.ep,state.castle)
          .forEach(([tr,tc])=>all.push([r,c,tr,tc]));
  return all;
}

function computeStatus(s:Omit<ChessState,'status'>): ChessState['status'] {
  const any = allLegal({...s,status:'playing'}).length>0;
  if (!any) return inCheck(s.board,s.turn)?'checkmate':'stalemate';
  if (inCheck(s.board,s.turn)) return 'check';
  return 'playing';
}

function makeState(pos:Board, turn:Color='white'): ChessState {
  const base = { board:pos.map(r=>[...r]), turn, ep:null as [number,number]|null,
    castle:{wK:true,wQ:true,bK:true,bQ:true} };
  return {...base, status:computeStatus(base)};
}

/* ─── Chess Widget ───────────────────────────────────────── */
function ChessWidget() {
  const [state, setState]   = useState<ChessState>(()=>makeState(KASPAROV_POS));
  const [sel,   setSel]     = useState<[number,number]|null>(null);
  const [legal, setLegal]   = useState<[number,number][]>([]);

  const click = (r:number, c:number) => {
    if (state.status==='checkmate'||state.status==='stalemate') return;
    const {board,turn,ep,castle} = state;
    if (!sel) {
      if (!own(board[r][c],turn)) return;
      setSel([r,c]); setLegal(legalMoves(board,r,c,turn,ep,castle));
      return;
    }
    const [sr,sc]=sel;
    if (own(board[r][c],turn)) {
      setSel([r,c]); setLegal(legalMoves(board,r,c,turn,ep,castle)); return;
    }
    if (!legal.some(([mr,mc])=>mr===r&&mc===c)) { setSel(null); setLegal([]); return; }

    let next = applyMove(board,sr,sc,r,c,turn,ep);
    const piece = board[sr][sc];
    const nc2 = {...castle};
    if (piece==='K'){nc2.wK=false;nc2.wQ=false;
      if(sc===4&&c===6){next[7][5]=next[7][7];next[7][7]='';}
      if(sc===4&&c===2){next[7][3]=next[7][0];next[7][0]='';}}
    if (piece==='k'){nc2.bK=false;nc2.bQ=false;
      if(sc===4&&c===6){next[0][5]=next[0][7];next[0][7]='';}
      if(sc===4&&c===2){next[0][3]=next[0][0];next[0][0]='';}}
    if (piece==='R'){if(sc===0)nc2.wQ=false;if(sc===7)nc2.wK=false;}
    if (piece==='r'){if(sc===0)nc2.bQ=false;if(sc===7)nc2.bK=false;}

    const newEp: [number,number]|null =
      piece.toUpperCase()==='P'&&Math.abs(r-sr)===2 ? [(sr+r)/2,c] : null;
    const nextTurn:Color = turn==='white'?'black':'white';
    const base = {board:next,turn:nextTurn,ep:newEp,castle:nc2};
    setState({...base,status:computeStatus(base)});
    setSel(null); setLegal([]);
  };

  const loadKasparov = () => { setState(makeState(KASPAROV_POS)); setSel(null); setLegal([]); };
  const loadStandard = () => { setState(makeState(START_POS));    setSel(null); setLegal([]); };

  const [kr,kc] = kingPos(state.board,state.turn);
  const statusColor = state.status==='checkmate'?'#E8C46A'
    : state.status==='check'?'#ff6b6b'
    : state.status==='stalemate'?'#7AAA88'
    : state.turn==='white'?'#E8C46A':'#7AAA88';
  const statusText = state.status==='checkmate'
    ? `Checkmate — ${state.turn==='white'?'Black':'White'} wins!`
    : state.status==='stalemate' ? 'Stalemate — Draw!'
    : state.status==='check'     ? `${state.turn==='white'?'⬜ White':'⬛ Black'} is in Check!`
    : `${state.turn==='white'?'⬜ White':'⬛ Black'} to move`;

  return (
    <div className="rounded-xl p-5 h-full"
      style={{ background: 'rgba(10,26,15,0.85)', border: '1px solid var(--brand-border)' }}>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono,monospace)', letterSpacing: '0.15em' }}>
            Side Activity · Chess
          </p>
          <p className="text-xs mt-1 font-mono font-semibold"
            style={{ color: statusColor, fontFamily: 'var(--font-mono,monospace)' }}>
            {statusText}
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full font-mono shrink-0"
          style={{ background:'rgba(201,168,76,0.1)', color:'var(--brand-gold)',
            border:'1px solid var(--brand-border)', fontFamily:'var(--font-mono,monospace)' }}>
          → 2000 ELO
        </span>
      </div>

      {/* Board */}
      <div className="grid grid-cols-8 rounded-lg overflow-hidden mb-1"
        style={{ border: '1px solid rgba(201,168,76,0.18)' }}>
        {state.board.map((row,r)=>row.map((piece,c)=>{
          const light   = (r+c)%2===0;
          const isSel   = sel?.[0]===r && sel?.[1]===c;
          const isLegal = legal.some(([mr,mc])=>mr===r&&mc===c);
          const isKingCheck = state.status==='check' && r===kr && c===kc;
          return (
            <div key={`${r}-${c}`} onClick={()=>click(r,c)}
              className="aspect-square flex items-center justify-center transition-colors duration-100 relative"
              style={{
                cursor:'pointer',
                background: isSel         ? 'rgba(201,168,76,0.45)'
                  : isKingCheck           ? 'rgba(255,107,107,0.4)'
                  : isLegal && piece      ? 'rgba(61,138,90,0.55)'
                  : isLegal               ? 'rgba(61,138,90,0.22)'
                  : light                 ? 'rgba(46,102,68,0.4)'
                  :                         'rgba(10,26,15,0.95)',
                fontSize: 'clamp(9px,1.8vw,17px)',
              }}>
              {isLegal && !piece && (
                <div className="absolute w-2 h-2 rounded-full"
                  style={{ background: 'rgba(201,168,76,0.55)' }} />
              )}
              {piece ? (
                <span style={{ color:isW(piece)?'#E8C46A':'#7AAA88', lineHeight:1, position:'relative', zIndex:1 }}>
                  {PIECES[piece]}
                </span>
              ) : null}
            </div>
          );
        }))}
      </div>

      {/* File labels */}
      <div className="grid grid-cols-8 mb-3">
        {['a','b','c','d','e','f','g','h'].map(f=>(
          <div key={f} className="text-center text-[9px]" style={{ color:'var(--brand-muted)' }}>{f}</div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mb-3">
        <button onClick={loadStandard}
          className="flex-1 text-xs py-1.5 rounded-lg transition-all hover:scale-[1.02] font-mono"
          style={{ background:'rgba(201,168,76,0.15)', border:'1px solid var(--brand-border-hi)',
            color:'var(--brand-gold)', fontFamily:'var(--font-mono,monospace)' }}>
          ▶ New Game
        </button>
        <button onClick={loadKasparov}
          className="flex-1 text-xs py-1.5 rounded-lg transition-all hover:scale-[1.02] font-mono"
          style={{ background:'rgba(201,168,76,0.05)', border:'1px solid var(--brand-border)',
            color:'var(--brand-muted)', fontFamily:'var(--font-mono,monospace)' }}>
          ↺ Kasparov pos
        </button>
      </div>

      <p className="text-xs leading-relaxed" style={{ color:'var(--brand-muted)' }}>
        Full rules: castling, en passant, promotion (auto-queen), check &amp; checkmate.
        Click a piece to see legal moves. ▶ New Game = standard start.
      </p>
    </div>
  );
}

/* ─── Resume ─────────────────────────────────────────────── */
export function Resume() {
  const technical = skills.filter(s => s.category === 'technical');
  const languages = skills.filter(s => s.category === 'language');
  const soft      = skills.filter(s => s.category === 'soft');

  return (
    <section id="resume" className="py-28" style={{ background: 'var(--brand-bg)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.2em' }}>
            04 / Resume
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Skills &amp; <span className="text-gold-gradient">Experience</span>
          </h2>
          <div className="mt-8">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
              <Download className="h-4 w-4" />
              Download PDF Resume
            </a>
          </div>
        </motion.div>

        {/* Skills + Chess */}
        <div className="grid gap-10 lg:grid-cols-3 mb-24 items-start">
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <div className="rounded-xl p-6"
              style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}>
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}>Technical</h4>
                  <div className="space-y-4">{technical.map((s,i)=><SkillBar key={s.name} skill={s} index={i}/>)}</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}>Languages</h4>
                  <div className="space-y-4">{languages.map((s,i)=><SkillBar key={s.name} skill={s} index={i}/>)}</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}>Soft Skills</h4>
                  <div className="space-y-4">{soft.map((s,i)=><SkillBar key={s.name} skill={s} index={i}/>)}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <ChessWidget />
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-24">
          <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: 'var(--brand-text)' }}>Experience</h3>
          <div className="space-y-5">
            {experiences.map((exp,i)=>(
              <motion.div key={exp.id}
                initial={{ opacity: 0, x: i%2===0?-16:16 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i*0.1 }} viewport={{ once: true }}
                className="rounded-xl p-6"
                style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: 'var(--brand-text)' }}>{exp.title}</h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-0 text-xs font-mono"
                    style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                    <Calendar className="h-3.5 w-3.5" />{exp.duration}
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {exp.description.map((item,j)=>(
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--brand-muted)' }}>
                      <span style={{ color: 'var(--brand-gold)' }}>›</span>{item}
                    </li>
                  ))}
                </ul>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech=>(
                      <span key={tech} className="rounded-full px-2.5 py-0.5 text-xs font-mono"
                        style={{ background:'rgba(201,168,76,0.08)', color:'var(--brand-gold)',
                          border:'1px solid rgba(201,168,76,0.2)', fontFamily:'var(--font-mono,monospace)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: 'var(--brand-text)' }}>Key Achievements</h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a,i)=>(
              <motion.div key={a.id}
                initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i*0.08 }} viewport={{ once: true }}
                className="rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-200"
                style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--brand-text)' }}>{a.title}</h4>
                <p className="text-sm mb-4" style={{ color: 'var(--brand-muted)' }}>{a.description}</p>
                <span className="text-xs font-mono"
                  style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono,monospace)' }}>
                  {a.date}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}