/**
 * Product visuals rendered in code (crisp at any size, no image assets).
 * Values shown are illustrative UI states, labelled as such on the page.
 */

/* Deterministic pseudo-random so server render is stable. */
function series(seed: number, n: number, base: number, jitter: number, spikes: number[]) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: n }, (_, i) => {
    const spike = spikes.includes(i) ? jitter * 4.5 : 0;
    return base + (rand() - 0.5) * jitter + spike;
  });
}

function toPath(values: number[], w: number, h: number, min: number, max: number) {
  const step = w / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

const W = 640;
const H = 170;
const before = series(7, 80, 5.6, 1.6, [9, 23, 24, 41, 58, 59, 71]);
const after = series(19, 80, 3.5, 0.35, [44]);
const MIN = 2;
const MAX = 15;
const beforePath = toPath(before, W, H, MIN, MAX);
const afterPath = toPath(after, W, H, MIN, MAX);

function Readout({ label, value, unit, delta }: { label: string; value: string; unit?: string; delta?: string }) {
  return (
    <div className="panel rounded-lg px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-mono text-lg sm:text-2xl text-white tabular">{value}</span>
        {unit && <span className="font-mono text-[11px] text-ink-400">{unit}</span>}
      </div>
      {delta && <div className="mt-0.5 font-mono text-[10px] sm:text-[11px] text-ember-300">{delta}</div>}
    </div>
  );
}

export function ProductWindow() {
  const sidebar = ["Overview", "Processes", "Latency", "Overlay", "Reports", "Profiles"];
  return (
    <figure className="window rounded-2xl overflow-hidden text-left">
      {/* title bar */}
      <div className="flex items-center gap-3 px-4 h-10 border-b border-white/[0.06]">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        </div>
        <span className="flex-1 text-center font-mono text-[11px] text-ink-400 truncate">
          Sense · Session 0412 · Frametime capture
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ember-500/10 px-2.5 py-0.5 font-mono text-[10px] text-ember-300 ring-1 ring-inset ring-ember-500/25">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember-400" />
          Profile applied
        </span>
      </div>

      <div className="grid md:grid-cols-[168px_1fr]">
        <nav aria-hidden className="hidden md:block border-r border-white/[0.06] p-3 text-[13px]">
          {sidebar.map((item, i) => (
            <div
              key={item}
              className={`rounded-md px-3 py-1.5 ${i === 0 ? "bg-white/[0.06] text-white" : "text-ink-400"}`}
            >
              {item}
            </div>
          ))}
          <div className="mt-6 px-3 font-mono text-[10px] uppercase tracking-wider text-ink-500">Device</div>
          <div className="px-3 pt-1 text-[12px] text-ink-300">WS-04 · 16 cores</div>
        </nav>

        <div className="p-3 sm:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Readout label="Avg FPS" value="287" delta="+31 vs baseline" />
            <Readout label="1% low" value="211" delta="+38 vs baseline" />
            <Readout label="Frametime" value="3.48" unit="ms" delta="σ 0.21 ms" />
            <Readout label="Input → photon" value="15.8" unit="ms" delta="−9.7 ms" />
          </div>

          <div className="panel mt-3 rounded-lg p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Frametime (ms) · 80 s window</span>
              <span className="flex items-center gap-4 font-mono text-[11px]">
                <span className="flex items-center gap-1.5 text-ink-400">
                  <span className="h-px w-4 bg-ink-400" /> Baseline
                </span>
                <span className="flex items-center gap-1.5 text-ember-300">
                  <span className="h-0.5 w-4 bg-ember-400" /> Tuned
                </span>
              </span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Frametime chart: tuned profile is lower and steadier than baseline">
              <defs>
                <linearGradient id="pw-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff8533" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#ff8533" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.05)" />
              ))}
              <path d={beforePath} fill="none" stroke="#6b6b7c" strokeWidth="1.2" strokeLinejoin="round" />
              <path d={`${afterPath} L${W} ${H} L0 ${H} Z`} fill="url(#pw-fill)" />
              <path d={afterPath} className="draw" fill="none" stroke="#ff8533" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-400">
              <span className="text-ink-200">14 changes</span> applied · every one reversible
            </span>
            <span className="rounded-md px-3 py-1 text-ink-200 ring-1 ring-inset ring-white/12">Roll back</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export function CoreMap() {
  // 8 performance cores pinned to the foreground app, 8 efficiency cores for background work.
  const cores = Array.from({ length: 16 }, (_, i) => ({ id: i, fg: i < 8, load: [92, 88, 95, 81, 90, 86, 93, 84, 22, 31, 18, 27, 12, 35, 20, 16][i] }));
  const procs = [
    { name: "game.exe", prio: "High", cores: "P0–P7", fg: true },
    { name: "obs64.exe", prio: "Above normal", cores: "E0–E3", fg: false },
    { name: "Discord.exe", prio: "Below normal", cores: "E4–E5", fg: false },
    { name: "OneDrive.exe", prio: "Idle", cores: "E6–E7", fg: false },
  ];
  return (
    <div className="window rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400">CPU affinity map</span>
        <span className="font-mono text-[11px] text-ink-400">16 threads</span>
      </div>
      <div className="grid grid-cols-8 gap-1.5 sm:gap-2" aria-hidden>
        {cores.map((c) => (
          <div key={c.id} className="relative aspect-square rounded-md overflow-hidden bg-white/[0.03] ring-1 ring-inset ring-white/[0.06]">
            <div
              className={`absolute inset-x-0 bottom-0 ${c.fg ? "bg-gradient-to-t from-ember-600/80 to-ember-400/60" : "bg-white/15"}`}
              style={{ height: `${c.load}%` }}
            />
            <span className="absolute left-1 top-0.5 font-mono text-[8px] sm:text-[9px] text-white/60">
              {c.fg ? "P" : "E"}
              {c.fg ? c.id : c.id - 8}
            </span>
          </div>
        ))}
      </div>
      <table className="mt-5 w-full text-[12px] sm:text-[13px]">
        <caption className="sr-only">Example process assignments</caption>
        <thead>
          <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-ink-400">
            <th className="pb-2 font-normal">Process</th>
            <th className="pb-2 font-normal">Priority</th>
            <th className="pb-2 font-normal text-right">Cores</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {procs.map((p) => (
            <tr key={p.name}>
              <td className="py-2 font-mono text-ink-200">
                <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${p.fg ? "bg-ember-400" : "bg-ink-500"}`} />
                {p.name}
              </td>
              <td className="py-2 text-ink-300">{p.prio}</td>
              <td className="py-2 text-right font-mono text-ink-300">{p.cores}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LatencyWaterfall() {
  const stages = ["Input poll", "OS queue", "Simulation", "Render", "Display"];
  const rows = [
    { label: "Baseline", values: [4.0, 3.2, 5.1, 6.4, 6.8] },
    { label: "Tuned", values: [1.0, 1.1, 4.6, 4.8, 4.3] },
  ];
  const max = Math.max(...rows.map((r) => r.values.reduce((a, b) => a + b, 0)));
  const shades = ["bg-ember-200", "bg-ember-300", "bg-ember-400", "bg-ember-500", "bg-ember-700"];
  return (
    <div className="window rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Input-to-photon breakdown</span>
        <span className="font-mono text-[11px] text-ink-400">ms</span>
      </div>
      <div className="space-y-5">
        {rows.map((r) => {
          const total = r.values.reduce((a, b) => a + b, 0);
          const tuned = r.label === "Tuned";
          return (
            <div key={r.label}>
              <div className="flex items-baseline justify-between mb-2">
                <span className={`text-[13px] ${tuned ? "text-white" : "text-ink-300"}`}>{r.label}</span>
                <span className={`font-mono text-sm tabular ${tuned ? "text-ember-300" : "text-ink-300"}`}>{total.toFixed(1)}</span>
              </div>
              <div className="flex h-7 rounded-md overflow-hidden" style={{ width: `${(total / max) * 100}%` }} aria-hidden>
                {r.values.map((v, i) => (
                  <div
                    key={i}
                    className={`${tuned ? shades[i] : "bg-ink-600"} ${i ? "border-l border-ink-950/60" : ""}`}
                    style={{ width: `${(v / total) * 100}%`, opacity: tuned ? 1 : 0.5 + i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ul className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-2 text-[11px] text-ink-400">
        {stages.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-sm ${shades[i]}`} />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OverlayPreview() {
  const spark = toPath(series(3, 40, 3.4, 0.4, []), 120, 22, 2, 5);
  return (
    <div className="window rounded-2xl p-2 sm:p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[radial-gradient(120%_80%_at_70%_100%,#3a1c0c_0%,#140d0b_45%,#08080a_100%)]">
        {/* abstract scene */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.6))]" />
          <div className="absolute left-[8%] right-[8%] bottom-[22%] h-px bg-ember-300/30" />
          <div className="absolute left-[30%] bottom-[22%] h-[38%] w-[18%] bg-gradient-to-t from-white/[0.06] to-transparent [clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)]" />
          <div className="absolute right-[18%] bottom-[22%] h-[52%] w-[10%] bg-gradient-to-t from-white/[0.05] to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/50" />
            <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-white/50" />
          </div>
        </div>

        {/* HUD */}
        <div className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-lg bg-black/55 backdrop-blur-sm ring-1 ring-white/10 px-3 py-2.5 font-mono text-[10px] sm:text-[11px] leading-[1.6] min-w-[150px]">
          <div className="flex justify-between gap-6"><span className="text-ink-400">FPS</span><span className="text-white tabular">288</span></div>
          <div className="flex justify-between gap-6"><span className="text-ink-400">FT</span><span className="text-white tabular">3.4 ms</span></div>
          <svg viewBox="0 0 120 22" className="my-1 w-full h-4" aria-hidden>
            <path d={spark} fill="none" stroke="#ff8533" strokeWidth="1.2" />
          </svg>
          <div className="flex justify-between gap-6"><span className="text-ink-400">CPU</span><span className="text-white tabular">61°C · 54%</span></div>
          <div className="flex justify-between gap-6"><span className="text-ink-400">GPU</span><span className="text-white tabular">67°C · 97%</span></div>
          <div className="flex justify-between gap-6"><span className="text-ink-400">MEM</span><span className="text-white tabular">9.1 GB</span></div>
        </div>

        <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 rounded-full bg-black/55 ring-1 ring-white/10 px-2.5 py-1 font-mono text-[10px] text-ink-300">
          <span className="text-ember-300">●</span> Visible in OBS scene “Main”
        </div>
      </div>
    </div>
  );
}
