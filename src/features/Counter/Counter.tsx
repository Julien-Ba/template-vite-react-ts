import './Counter.scss';
import { useCounterStore } from '@/store/useCounterStore';
import Button from '@/components/Button/Button';

export default function Counter() {
    const { count, increment, decrement } = useCounterStore();
    
    return (
        <div className="counter">
            <h2 className="counter__value">{count}</h2>
            <div className="counter__buttons">
                <Button onClick={() => decrement()}>-</Button>
                <Button onClick={() => increment()}>+</Button>
            </div>
        </div>
    );
}
