import dynamic from 'next/dynamic'

const XTerminal = dynamic(() => import('../components/xterminal/xterminal'), {
    ssr: false
})

export default function Home() {
    return (
        <main>
            <XTerminal/>
        </main>
    );
}
