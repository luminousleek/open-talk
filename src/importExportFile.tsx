import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { CardTuple, QuestionCard, DisplayCard } from './PlayingCard';
import { CardDeck } from "./decks";

export function ExportDeck(prop: {deck:CardDeck}): JSX.Element {
    const flattened:CardTuple[] = prop.deck.cards.reduce((accumulator, value) => accumulator.concat(value), []);

    let deckText:string = "";
    for (let card of flattened) {
        let cardInfo:string = card[0] + "|" + card[1] + "|" + card[2] + "|" + card[3] + "\n";
        deckText = deckText + cardInfo;
    }

    return (
        <pre>{deckText}</pre>
    )
}

const openCard = new QuestionCard("Title", "Depth Level", "Question", "Category");
openCard.uncover();
const closedCard = new QuestionCard("Title", "Depth Level", "Question", "Category");
closedCard.disableButton();
const openSampleCard = new QuestionCard("Names", "Launch", "What does your name mean?", "Self");
openSampleCard.uncover();
const closedSampleCard = new QuestionCard("Names", "Launch", "What does your name mean?", "Self");
closedSampleCard.disableButton();
const openMissingCard = new QuestionCard("", "\u200b", "What does your name mean?", "Self");
openMissingCard.uncover();
const closedMissingCard = new QuestionCard("", "\u200b", "What does your name mean?", "Self");
closedMissingCard.disableButton();

export const importText:JSX.Element = (
    <>
        <p>Question Cards in open talk are made up 4 components - Question Title, Depth Level, Question and Category. These components are displayed in the following manner:</p>
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Question Card Layout (click to expand)
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md="auto">
                                {DisplayCard(openCard, () => {})}
                                <p>Front of card</p>
                            </Col>
                            <Col md="auto">
                                {DisplayCard(closedCard, () => {})}
                                <p>Back of card</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <p>To import questions, each of these components must be separated by the <a href="https://en.wikipedia.org/wiki/Vertical_bar" target="_blank" rel="noreferrer">vertical bar (|)</a> character
                in this order: Question Title|Depth Level|Question|Category</p>
        <p>For example, for a Question where the Question Title is "Names", the Depth Level is "Launch", the Question is "What does your name mean?" and the Category is "Self", 
            it will be typed as</p> 
        <p>Names|Launch|What does your name mean?|Self</p>
        <p>and displayed as follows:</p>
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Sample Card Layout (click to expand)
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md="auto">
                                {DisplayCard(openSampleCard, () => {})}
                                <p>Front of card</p>
                            </Col>
                            <Col md="auto">
                                {DisplayCard(closedSampleCard, () => {})}
                                <p>Back of card</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <p>Question Titles and Depth Levels are optional, but the vertical pipe character still needs to be put in.</p>
        <p>For example, "||What does your name mean?|Self" will import a Question Card without a Title and Depth Level, and will be displayed as follows:</p>
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Card with Missing Question Title and Depth Level (click to expand)
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md="auto">
                                {DisplayCard(openMissingCard, () => {})}
                                <p>Front of card</p>
                            </Col>
                            <Col md="auto">
                                {DisplayCard(closedMissingCard, () => {})}
                                <p>Back of card</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <p>Take note that each Question Card must be put on its own line, and the maximum number of Categories is 10.</p>
        <p>It is recommended to type out the Question Cards in a separate program before copying and pasting it in.</p>
    </>
);