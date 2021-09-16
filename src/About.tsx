import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { QuestionCard, DisplayCard, PlayingCard, AccordionCardDisplay } from './PlayingCard';

const openCard = new QuestionCard("", "Depth Level", "Question", "Category");
openCard.uncover();
const closedCard = new QuestionCard("", "Depth Level", "Question", "Category");
closedCard.disableButton();
const openSampleCard = new QuestionCard("", "Launch", "What are your pet peeves?", "Self");
openSampleCard.uncover();
const closedSampleCard = new QuestionCard("", "Launch", "What are your pet peeves?", "Self");
closedSampleCard.disableButton();

export const aboutText:JSX.Element = (
    <>
        <br />
        <p>Welcome to open talk, a conversation-starter game for more meaningful online interactions.</p>
        <p>Click each header to expand it.</p>
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Instructions
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>The general flow of open talk is as follows:</p>
                        <ol>
                            <li>Choose and uncover a card</li>
                            <li>Answer the question on the card</li>
                            <li>Ask and answer any follow-up questions, if any</li>
                            <li>Repeat for the next person</li>
                        </ol>
                        <p>open talk is best played on a desktop or laptop, and is not optimised for mobile screens.</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    open talk Cards
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>Cards in open talk have three components - Question, Category, and Depth Level</p>
                        <p>They are displayed on the card in the following manner:</p>
                        {AccordionCardDisplay(openCard, closedCard)}
                        <p>In the card below, "What are your pet peeves?" is the Question, "Self" is the Category and "Launch" is the Depth Level</p>
                        {AccordionCardDisplay(openSampleCard, closedSampleCard)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Game Modes
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>open talk has two playing modes:</p>
                        <ol>
                            <li>Categories mode - the deck is split into its categories, cards can be played from any one of them</li>
                            <li>Grid mode - cards are randomly shuffled and arranged into a 5 x 5 grid</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    The open talk deck
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>The open talk deck has four categories:</p>
                        <ul>
                            <li>SELF - personality, preferences, priorities</li>
                            <li>CLAN - family, friends, the people around you</li>
                            <li>LOVE - romance, love, and that special someone</li>
                            <li>FUN - Weird, quirky and surprising questions</li>
                        </ul>
                        <p>Each category, apart from the Fun category, has two levels of depth:</p>
                        <ul>
                            <li>LAUNCH - Launching points for getting to know others better</li>
                            <li>DIVE - Deep dives into your values, experiences, and who you are as a person</li>
                        </ul>
                        <p>Submit your feedback on this deck <a href="https://bit.ly/opentalkfb" target="_blank" rel="noreferrer">here</a>.</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Custom Decks
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>
                            Ever had burning questions to ask your friends, or inside jokes and references you want to put in your questions?
                            open talk allows you to create your own questions and decks with up to 10 categories!
                        </p>
                        <p>Instructions on how to do so can be found in the Import Custom Deck segment</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <br />
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    About this website
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>open talk is open in three senses of the word:</p>
                        <ol>
                            <li>It promotes openness and vulnerability when answering questions and sharing about each other</li>
                            <li>It is open in allowing custom decks and questions to be played with on this website</li>
                            <li>The code of this website is open-source and found in the link below</li>
                        </ol>
                        <p>open talk is inspired by <a href="https://www.starknicked.com" target="_blank" rel="noreferrer">smol tok</a>, created by Nick Pang.</p>
                        <p>
                            open talk is distributed under the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" rel="noreferrer">GNU General Public License v3</a>. 
                            Check out its GitHub repository <a href="https://github.com/luminousleek/open-talk" target="_blank" rel="noreferrer">here</a>.
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </>
)