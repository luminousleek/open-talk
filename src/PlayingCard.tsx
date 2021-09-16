import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CSSProperties } from 'react';

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
        this.depth = "\u200b";
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

    let cardStyle:CSSProperties = {width:'100%', maxWidth:'12rem', minHeight: '18rem', wordBreak:'break-word'}
    let displayed:JSX.Element;

    if (covered) {
      displayed = <Card 
                bg='light'
                text='dark' 
                style={cardStyle}>
                <Card.Header>{depth}</Card.Header>
                <Card.Body>
                  <Card.Title>{category}</Card.Title>
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
                style={cardStyle}>
                <Card.Header>{depth}</Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle>{category}</Card.Subtitle>
                  <Card.Text>{question}</Card.Text>
                </Card.Body>
              </Card>
    } else {
      displayed = <Card 
                bg='dark'
                text='white' 
                style={cardStyle}>
                <Card.Header>{depth}</Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle>{category}</Card.Subtitle>
                  <Card.Text>{question}</Card.Text>
                </Card.Body>
              </Card>
    }
    return displayed;
}