'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardLink = ({href, icon, children}) => {
    const pathname = usePathname()
    const modifiedHref= href.split('/')?.at(-1)
    const isActive = pathname.split('/')?.at(-1)?.includes(modifiedHref)

    return (
        <Link href={href} className={`text-center flex gap-1 items-center justify-center font-semibold py-2 px-1 rounded-l-sm relative   ${isActive && '!text-white !bg-primary-main'}`}>
            {isActive && <div className='absolute -right-1 top-0 h-full w-1 bg-secondary-main rounded-r-lg'></div>}
            <span className='hidden md:inline-block'>{children}</span>
            <span className='md:hidden'>{icon}</span>
        </Link>
    );
};

export default DashboardLink;