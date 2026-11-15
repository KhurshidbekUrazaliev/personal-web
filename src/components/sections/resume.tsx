'use client';

import { motion } from 'framer-motion';
import { Download, Calendar, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { SkillGroup, Experience } from '@/types';
import { EDUCATION, SITE } from '@/lib/site';
import { SPOKEN_LANGUAGES } from '@/lib/languages';

/* ─── Data ───────────────────────────────────────────────── */
// Tools I have shipped something with, next to the projects that used them.
const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Web',
    tools: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'jQuery', 'Vite', 'GSAP', 'Three.js'],
    usedIn: 'AI 해바, Silk Node website, Jinie EduTech website, Frontend Hub, LifePath for Telegram, Korean Vocabulary App, this site',
  },
  {
    title: 'Mobile',
    tools: ['React Native', 'Expo', 'Zustand', 'NativeWind'],
    usedIn: 'LifePath, TrY',
  },
  {
    title: 'Backend and data',
    tools: ['Node.js', 'Express', 'PHP', 'Supabase', 'SQL', 'Cloudflare Workers', 'Cloudflare D1'],
    usedIn: 'Jinie EduTech website, TrY server, LifePath sync and rankings, LifePath for Telegram server',
  },
  {
    title: 'Python and AI',
    tools: ['Python', 'Gemini API', 'python-telegram-bot', 'pytest'],
    usedIn: 'IlmulHaq Telegram bot, Study & Discipline Tracker',
  },
];

const TOOLS = ['Git', 'GitHub', 'Vercel', 'GitHub Pages', 'Cloudflare'];

const experiences: Experience[] = [
  {
    id: 'work',
    title: SITE.role,
    company: SITE.company,
    duration: 'Sep 2026 - Present',
    description: [
      'AI 해바 (aihaeba.com): AI marketing and business tools for small businesses',
      'jcodeedu.com: the company website, in four languages, which I upgraded after joining',
      'silknode.ai.kr: the website of Silk Node, a software development company in Busan, in Korean and English',
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'PHP', 'jQuery'],
  },
  {
    id: 'personal',
    title: 'Full Stack Developer',
    company: 'Personal Projects',
    duration: '2023 - Present',
    description: [
      'Frontend Hub: a reference library of interface examples that run in the browser (frontendhub.site)',
      "IlmulHaq: a Telegram bot that answers questions about Islam with verified Qur'an and Hadith quotes, in five languages",
      'LifePath for Telegram: a Telegram Mini App for goals, habits and prayer times, with a 3D companion, a Cloudflare Workers server, bot reminders and Telegram Stars payments',
      'LifePath and TrY: mobile apps built with React Native and Expo',
      'Korean Vocabulary App and a Python study tracker, built for my own learning',
    ],
    technologies: ['React', 'React Native', 'TypeScript', 'Python', 'Vite', 'Cloudflare Workers'],
  },
  {
    id: 'tutor',
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
    id: 'dropshipping',
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

/* ─── Shared pieces ──────────────────────────────────────── */
const CARD = {
  background: 'rgba(10,26,15,0.6)',
  border: '1px solid var(--brand-border)',
} as const;

const GROUP_TITLE = {
  color: 'var(--brand-gold)',
  fontFamily: 'var(--font-mono, monospace)',
} as const;

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(item => (
        <li key={item} className="rounded-full px-2.5 py-0.5 text-xs font-mono"
          style={{ background:'rgba(201,168,76,0.08)', color:'var(--brand-gold)',
            border:'1px solid rgba(201,168,76,0.2)', fontFamily:'var(--font-mono,monospace)' }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Chess rules ────────────────────────────────────────── */
// Both sides use the solid shapes and differ by colour. The outline shapes
// (the hollow knight, pawn and so on) have hairline strokes in most fonts and
// all but vanish at this size.
// The pawn is the one chess glyph phones may draw as an emoji. The \uFE0E after
// it asks for the plain text shape, so it keeps the board's colours.
const SHAPES: Record<string, string> = {
  K:'♚', Q:'♛', R:'♜', B:'♝', N:'♞', P:'♟\uFE0E',
};
const PIECE_COLOR = { white: '#F0D98A', black: '#6FB08A' } as const;

const FILES = ['a','b','c','d','e','f','g','h'];
const PIECE_NAMES: Record<string, string> = {
  K:'king', Q:'queen', R:'rook', B:'bishop', N:'knight', P:'pawn',
};

/** What a screen reader says for a square, e.g. "e4, white pawn". */
function squareLabel(r:number, c:number, piece:string): string {
  const square = `${FILES[c]}${8-r}`;
  if (!piece) return `${square}, empty`;
  return `${square}, ${isW(piece)?'white':'black'} ${PIECE_NAMES[piece.toUpperCase()]}`;
}

// Kasparov vs Topalov, Wijk aan Zee 1999, after 23...Qd6. White to move
// played 24.Rxd4!!, the rook sacrifice the game is famous for.
// Rank 8 is the first row, the a-file the first column.
const KASPAROV_POS = [
  ['b','','','r','','','','r'],
  ['k','','','','','p','','p'],
  ['p','','','q','','n','p',''],
  ['N','p','p','P','','','',''],
  ['','','','p','','Q','',''],
  ['P','','','','','P','P','B'],
  ['','P','P','','','','','P'],
  ['','K','','R','R','','',''],
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

// `canCastle` is false for a position where both kings have already moved.
function makeState(pos:Board, turn:Color='white', canCastle=true): ChessState {
  const base = { board:pos.map(r=>[...r]), turn, ep:null as [number,number]|null,
    castle:{wK:canCastle,wQ:canCastle,bK:canCastle,bQ:canCastle} };
  return {...base, status:computeStatus(base)};
}

const kasparovState = () => makeState(KASPAROV_POS, 'white', false);

/* ─── Chess Widget ───────────────────────────────────────── */
function ChessWidget() {
  const [state, setState]   = useState<ChessState>(kasparovState);
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

    const next = applyMove(board,sr,sc,r,c,turn,ep);
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

  const loadKasparov = () => { setState(kasparovState()); setSel(null); setLegal([]); };
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
          <p className="text-xs mt-1 font-mono font-semibold" aria-live="polite"
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

      {/*
        Board. It is a size container, so a piece can be sized from the board
        (cqw) and stays in proportion to its square on every screen.
      */}
      <div className="grid grid-cols-8 rounded-lg overflow-hidden mb-1"
        role="group" aria-label="Chess board"
        style={{ border: '1px solid rgba(201,168,76,0.18)', containerType: 'inline-size' }}>
        {state.board.map((row,r)=>row.map((piece,c)=>{
          const light   = (r+c)%2===0;
          const isSel   = sel?.[0]===r && sel?.[1]===c;
          const isLegal = legal.some(([mr,mc])=>mr===r&&mc===c);
          const isKingCheck = state.status==='check' && r===kr && c===kc;
          return (
            <button key={`${r}-${c}`} type="button" onClick={()=>click(r,c)}
              aria-label={squareLabel(r,c,piece)} aria-pressed={isSel}
              className="chess-square aspect-square flex items-center justify-center transition-colors duration-100 relative"
              style={{
                cursor:'pointer',
                background: isSel         ? 'rgba(201,168,76,0.45)'
                  : isKingCheck           ? 'rgba(255,107,107,0.4)'
                  : isLegal && piece      ? 'rgba(61,138,90,0.55)'
                  : isLegal               ? 'rgba(61,138,90,0.22)'
                  : light                 ? 'rgba(46,102,68,0.4)'
                  :                         'rgba(10,26,15,0.95)',
                // A square is 12.5% of the board; the piece fills a bit over half of it.
                fontSize: '7.5cqw',
              }}>
              {isLegal && !piece && (
                <span className="absolute w-2 h-2 rounded-full"
                  style={{ background: 'rgba(201,168,76,0.55)' }} />
              )}
              {piece ? (
                <span aria-hidden="true" style={{ color:isW(piece)?PIECE_COLOR.white:PIECE_COLOR.black, lineHeight:1, position:'relative', zIndex:1 }}>
                  {SHAPES[piece.toUpperCase()]}
                </span>
              ) : null}
            </button>
          );
        }))}
      </div>

      {/* File labels */}
      <div className="grid grid-cols-8 mb-3" aria-hidden="true">
        {FILES.map(f=>(
          <div key={f} className="text-center text-[10px]" style={{ color:'var(--brand-muted)' }}>{f}</div>
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
          ↺ Kasparov 1999
        </button>
      </div>

      <p className="text-xs leading-relaxed" style={{ color:'var(--brand-muted)' }}>
        The board opens on Kasparov vs Topalov, Wijk aan Zee 1999, where White played 24.Rxd4!!
        Full rules: castling, en passant, promotion (auto-queen), check &amp; checkmate.
        Click a piece to see legal moves. ▶ New Game = standard start.
      </p>
    </div>
  );
}

/* ─── Resume ─────────────────────────────────────────────── */
export function Resume() {
  return (
    <section id="resume" className="py-28" style={{ background: 'var(--brand-bg-2)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Skills &amp; <span className="text-gold-gradient">Experience</span>
          </h2>
          <div className="mt-8">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF Resume
            </a>
          </div>
        </motion.div>

        {/* Skills + Chess */}
        <div className="grid gap-10 lg:grid-cols-3 mb-24 items-start">
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <div className="rounded-xl p-6" style={CARD}>
              {/* No percentages: each group names the tools and where I used them. */}
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {SKILL_GROUPS.map(group => (
                  <div key={group.title}>
                    <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={GROUP_TITLE}>
                      {group.title}
                    </h4>
                    <Chips items={group.tools} />
                    {group.usedIn && (
                      <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                        Used in: {group.usedIn}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2"
                style={{ borderTop: '1px solid var(--brand-border)' }}>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={GROUP_TITLE}>Tools</h4>
                  <Chips items={TOOLS} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={GROUP_TITLE}>Languages</h4>
                  <ul className="space-y-1.5 text-sm">
                    {SPOKEN_LANGUAGES.map(lang => (
                      <li key={lang.id} className="flex justify-between gap-4">
                        <span style={{ color: 'var(--brand-text)' }}>{lang.name}</span>
                        <span style={{ color: 'var(--brand-muted)' }}>
                          {lang.level}{lang.id === 'english' ? ` · ${lang.note}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <ChessWidget />
          </motion.div>
        </div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-24">
          <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: 'var(--brand-text)' }}>Education</h3>
          <div className="rounded-xl p-6 flex items-start gap-4" style={CARD}>
            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <GraduationCap className="h-5 w-5" aria-hidden="true" style={{ color: 'var(--brand-gold)' }} />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-lg font-semibold" style={{ color: 'var(--brand-text)' }}>{EDUCATION.degree}</h4>
                <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>
                  {EDUCATION.school} · {EDUCATION.place}
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-2 sm:mt-0 text-xs font-mono"
                style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />{EDUCATION.period}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: 'var(--brand-text)' }}>Experience</h3>
          <div className="space-y-5">
            {experiences.map((exp,i)=>(
              <motion.div key={exp.id}
                initial={{ opacity: 0, x: i%2===0?-16:16 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i*0.1 }} viewport={{ once: true }}
                className="rounded-xl p-6" style={CARD}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: 'var(--brand-text)' }}>{exp.title}</h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-0 text-xs font-mono"
                    style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />{exp.duration}
                  </div>
                </div>
                <ul className={`space-y-1.5 ${exp.technologies ? 'mb-4' : ''}`}>
                  {exp.description.map((item,j)=>(
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--brand-muted)' }}>
                      <span aria-hidden="true" style={{ color: 'var(--brand-gold)' }}>›</span>{item}
                    </li>
                  ))}
                </ul>
                {exp.technologies && <Chips items={exp.technologies} />}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
