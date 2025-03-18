import './Home.scss';
import Counter from '@/features/Counter/Counter';

export default function Home() {
    return (
        <main className='home'>
            <h1 className='home__title'>template-vite-react-ts</h1>
            <h2 className='home__subtitle'>Welcome to Your React App</h2>
            <p className='home__description'>A clean starting point for your new project</p>
            <Counter />
        </main>
    );
}
