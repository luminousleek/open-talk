import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export type CardTuple = [string, string, string, string];

export interface PlayingCard {
    title: string;
    depth: string;
    question: string;
    category: string;
    covered: boolean;
    buttonEnabled: boolean;
    selected: boolean;

    uncover(): void;

    disableButton(): void;
    enableButton(): void;

    select(): void;
    deselect(): void;
}

export class EmptyCard implements PlayingCard {
    
    title: string;
    depth: string;
    question: string;
    category: string;
    covered: boolean;
    buttonEnabled: boolean;
    selected: boolean;

    constructor(title: string) {
        this.title = title;
        this.depth = "";
        this.question = "";
        this.category = "";
        this.covered = false;
        this.buttonEnabled = false;
        this.selected = false;
    }

    uncover = () => {};

    disableButton = () => {};
    enableButton = () => {};

    select = () => {};
    deselect = () => {};
}

export class QuestionCard implements PlayingCard {
    
    title: string;
    depth: string;
    question: string;
    category: string;
    covered: boolean;
    buttonEnabled: boolean;
    selected: boolean;

    constructor(title: string, depth: string, question: string, category: string) {
        this.title = title;
        this.depth = depth;
        this.question = question;
        this.category = category;
        this.covered = true;
        this.buttonEnabled = true;
        this.selected = false;
    }

    uncover = () => {this.covered = false};

    disableButton = () => {this.buttonEnabled = false};
    enableButton = () => {this.buttonEnabled = true};

    select = () => {this.selected = true};
    deselect = () => {this.selected = false};
}

export function DisplayCard(card: PlayingCard, onClick:() => void): JSX.Element {
    // card properties
    const title:string = card.title;
    const depth:string = card.depth;
    const question:string = card.question;
    const category:string = card.category;
    let covered: boolean = card.covered;
    let selected: boolean = card.selected;
    const buttonEnabled: boolean = card.buttonEnabled;

    let displayed:JSX.Element;

    if (covered) {
      displayed = <Card 
                bg='dark'
                text='white' 
                style={{ width: '12rem', height: '18rem'}}>
                <Card.Header>{category}</Card.Header>
                <Card.Body>
                  <Card.Title>{depth}</Card.Title>
                </Card.Body>
                {buttonEnabled && <Button
                    size='sm' 
                    variant="info"
                    onClick={onClick}>
                    Uncover card
                </Button>}
              </Card>
    } else if (selected) {
      displayed = <Card 
                bg='info'
                text='white' 
                style={{ width: '12rem', height: '18rem'}}>
                <Card.Header>{category}</Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle>{depth}</Card.Subtitle>
                  <Card.Text>{question}</Card.Text>
                </Card.Body>
              </Card>
    } else {
      displayed = <Card 
                bg='light'
                text='dark' 
                style={{ width: '12rem', height: '18rem'}}>
                <Card.Header>{category}</Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle>{depth}</Card.Subtitle>
                  <Card.Text>{question}</Card.Text>
                </Card.Body>
              </Card>
    }
    return displayed;
}