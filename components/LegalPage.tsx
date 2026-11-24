import { site } from "@/lib/site";

type Props = {
  title: string;
  intro: React.ReactNode;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
};

export default function LegalPage({ title, intro, toc, children }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-24">
      <header className="max-w-3xl mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-ember-400 font-mono mb-5">Legal</p>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] mb-6">
          {title}
        </h1>
        <div className="text-ink-300 leading-relaxed">{intro}</div>
        <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono">
          <div className="flex gap-2">
            <dt className="text-ink-400">Last updated:</dt>
            <dd className="text-ink-200">{site.legalLastUpdated}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-400">Effective:</dt>
            <dd className="text-ink-200">{site.legalLastUpdated}</dd>
          </div>
        </dl>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-12">
        <aside className="lg:sticky lg:top-24 self-start rounded-lg border border-white/5 bg-ink-900/40 p-4 lg:border-0 lg:bg-transparent lg:p-0">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400 font-mono mb-3">Contents</p>
          <nav aria-label={`${title} contents`} className="toc">
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="prose-legal max-w-3xl min-w-0">{children}</article>
      </div>
    </div>
  );
}
