import { translations } from '@/app/[lang]/translations';
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const t = translations[lang as 'en' | 'vi'];
  if (!t) return notFound();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-center uppercase">{t.title}</h1>
      <p className="text-lg text-center whitespace-pre-line max-w-2xl">{t.quote}</p>
      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-base font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase">{t.advice}</span>
      </div>
    </main>
  );
}
