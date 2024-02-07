import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-bl from-slate-300 to-slate-200 '>
      <div className='text-center'>
        <h1 className='text-6xl font-bold tracking-wide text-sky-600'>
          Next-Nest-Corbado-Supabase-Prisma
        </h1>
        <Link href='/login'>
          <button className='mt-8 text-xl font-semibold bg-gradient-to-l from-green-600 to-green-500 text-white rounded-md py-4 px-8 hover:opacity-75'>
            ログイン
          </button>
        </Link>
      </div>
    </div>
  );
}
