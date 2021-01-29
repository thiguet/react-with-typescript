import { Status } from '../../consts';
import './Square.css';

export interface SquareProps {
    status: Status;
}

const Square = (props: SquareProps) => (
    <div
        className={`Square ${props.status === Status.FOOD ? 'Food' : ''} ${
            props.status === Status.SNAKE ? 'Snake' : ''
        }`}
    ></div>
);

export default Square;
