import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AppModes } from './AppModes';
import { CategoriesMode } from './Categories';
import { GridMode } from './Grid';
import { CardTuple } from './PlayingCard';
import { CardDeck, openTalkDeck, flatten } from "./decks";
import { ExportDeck, importText } from './importExportFile';
import { aboutText } from './About';
import { MenuCard } from './MenuCard';
import './App.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {

  // hooks for state
  const [mode, setMode] = React.useState<AppModes>(AppModes.MainScreen);
  const [deck, setDeck] = React.useState<CardDeck>(openTalkDeck);
  
  const [importQns, setQn] = React.useState("Question Title|Depth Level|Question|Category");
  const [importTitle, setTitle] = React.useState("Custom Deck");
  const [hasImported, setImported] = React.useState(false);
  const [importDeck, setImportDeck] = React.useState<CardDeck>({cards:[], title:"", categories: []});
  const [isValidImport, setValidImport] = React.useState(false);
  const [importErrorString, setErrorString] = React.useState("");
  const [hasImportError, toggleImportError] = React.useState(false);

  // to force the dom to re-render when starting a new game
  // it's very clunky so if you know a better solution let me know thanks
  const [forceRender, toggleRender] = React.useState(true);
  const [forceRender2, toggleRender2] = React.useState(false);

  function toggleRenders() {
    forceRender ? toggleRender(false) : toggleRender(true);
    forceRender2 ? toggleRender2(false) : toggleRender2(true);
  }

  // function to handle importing a custom deck
  const handleImport = (event:React.FormEvent) => {
    event.preventDefault();
    if (hasImported) {
      //popup to warn of overwriting custom deck
      const ImportSwal = withReactContent(Swal);
      ImportSwal.fire({
        title: 'Are you sure?',
        text: "Importing a new deck will overwrite " + importDeck.title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, overwrite it!',
        confirmButtonColor: '#3682fb',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          actuallyImport();
        }
      })
    } else {
      actuallyImport();
    }
  }

  function actuallyImport() {
    let importedDeck: CardDeck = {
      cards: [],
      title: "Custom Deck",
      categories: []
    };
    let errors:string[] = [];
    let errorString:string = "";
    let numCards:number = 0;
    toggleImportError(false);

    let category:string = "";
    let categoryIndex:number = 0;
    let categoryCount:number = 0;
    const categoryMap = new Map();

    const cards:string[] = importQns.split("\n");
    
    for (let cardString of cards) {
      // ignore blank rows  
      if (cardString === "") {
        continue;
      }
      let cardInfo:string[] = cardString.split("|", 4);
      if (cardInfo.length < 4) {
        cardString = cardString + " - Missing | character(s)";
        errors.push(cardString);
        continue;
      }      
      if (cardInfo[2] === "") {
        cardString = cardString + " - Missing Question Text";
        errors.push(cardString);
        continue;
      }
      category = cardInfo[3];
      if (category === "") {
        cardString = cardString + " - Missing Category Text";
        errors.push(cardString);
        continue;
      }
      if (categoryMap.has(category)) {
        categoryIndex = categoryMap.get(category);
      } else {
        // limit number of categories to 10
        if (categoryCount > 9) {
          cardString = cardString + " - Exceeded Maximum Number of Categories";
          errors.push(cardString);
          continue;
        }
        categoryIndex = categoryCount;
        categoryMap.set(category, categoryIndex);
        importedDeck.categories.push(category);
        importedDeck.cards[categoryIndex] = [];
        categoryCount++;
      }
      let cardTuple:CardTuple = [cardInfo[0], cardInfo[1], cardInfo[2], cardInfo[3]];

      // if missing depth level, set it to 0 width space
      if (cardTuple[1] === "") {
        cardTuple[1] = "\u200b";
      }

      importedDeck.cards[categoryIndex].push(cardTuple);
      numCards++;
    }
    
    importedDeck.title = importTitle;
    if (errors.length > 0) {
      for (let error of errors) {
        errorString = errorString + error + "\n";
      }
      toggleImportError(true);
    }
    setErrorString(errorString);
    if (numCards > 0) {
      setImported(true);
      setImportDeck(importedDeck);
      setDeck(importedDeck);
      setValidImport(true);
    } else {
      setValidImport(false);
    }
    setMode(AppModes.Imported);
  }

  function handleNewGame() {
    const newGameSwal = withReactContent(Swal);
    newGameSwal.fire({
      title: "Are you sure?",
      text: "This will reset all cards opened!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, start a new game!",
      confirmButtonColor: '#3682fb',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        toggleRenders();
      }
    })
  }

  let display:JSX.Element = <h1>Hello World!</h1>

  let header:JSX.Element = (
    <Container fluid>
        <Row className="justify-content-md-center"><h1>open talk</h1></Row>
        <Row className="justify-content-md-center"><h3>An online conversational tool</h3></Row>
    </Container>
  );

  function ScreenHeader(prop: {title:string}):JSX.Element {
    return (
      <Row className="justify-content-md-center">
        <h3>{prop.title}</h3>
      </Row>
    )
  }

  let deckHeader:JSX.Element = (
    <Row className="justify-content-md-center">
      <h4>Deck Selected: {deck.title}</h4>
    </Row>
  )

  let modeSelectButtons:JSX.Element = (
    <Row className="justify-content-center">
      <Col md="auto"><Button onClick={() => setMode(AppModes.SelectGameMode)}>Select another Game Mode</Button></Col>
      <Col md="auto"><Button onClick={() => setMode(AppModes.MainScreen)}>Return to the Main Menu</Button></Col>
    </Row>
  )

  let mainMenuButton:JSX.Element = (
    <Row className="justify-content-center">
      <Col md="auto"><Button onClick={() => setMode(AppModes.MainScreen)}>Return to the Main Menu</Button></Col>
    </Row>
  )

  switch (mode as AppModes) {
    case AppModes.MainScreen: {
      display = (
        <Container fluid>
          <ScreenHeader title = "Main Menu" />
          <br />
          <Row className="justify-content-md-center">
            <Col md="auto">
              <MenuCard header = "Play" title = "open talk" cardText = "Questions to get to know people in varying levels of depth."
                onClick = {() => {setDeck(openTalkDeck); setMode(AppModes.SelectGameMode)}} buttonText = "Play open talk" disableButton = {false}/>
            </Col>
            {hasImported &&
            <Col md="auto">
              <MenuCard header = "Play" title = {importDeck.title} cardText = "The custom deck that you have imported previously"
                onClick = {() => {setDeck(importDeck); setMode(AppModes.SelectGameMode)}} buttonText = {"Play  " + importDeck.title} disableButton = {false}/>
            </Col>
            }
            <Col md="auto">
              <MenuCard header = "Import" title = "Import Custom Deck" cardText = "Import a custom deck with your own questions! Note that there can only be one imported deck loaded at a time." 
                onClick = {() => {setMode(AppModes.Importing)}} buttonText = "Import Custom Deck" disableButton = {false}/>
            </Col>
            <Col md="auto">
              <MenuCard header = "About" title = "About open talk" cardText = "Information about open talk, and instructions on how to play it"
                onClick = {() => {setMode(AppModes.About)}} buttonText = "About open talk" disableButton = {false}/>
            </Col>
          </Row>
        </Container>
      )
      break;
    }
    case AppModes.SelectGameMode: {
      display = (
        <Container fluid>
          <ScreenHeader title = "Select Playing Mode" />
          {deckHeader}
          <br />
          <Row className="justify-content-md-center">
            <Col md="auto">
              <MenuCard header = "Mode" title = "Categories" cardText = "Deck is split into its categories, choose a card from any of the categories"
                onClick = {() => {setMode(AppModes.Categories)}} buttonText = "Select Categories Mode" disableButton = {false}/>
            </Col>
            <Col md="auto">
              <MenuCard header = "Mode" title = "Grid" cardText = "Cards are arranged into a 5 by 5 grid, only cards adjacent to previously revealed cards can be uncovered. Requires at least 24 cards in the deck."
                onClick = {() => {setMode(AppModes.Grid)}} buttonText = "Select Grid Mode" disableButton = {(flatten(deck.cards).length < 24)}/>
            </Col>
          </Row>
          <br />
          {mainMenuButton}
          <br />
        </Container>
      )
      break;
    } 
    case AppModes.Categories: {
      display = (
        <Container fluid>
          <ScreenHeader title = "Categories Mode" />
          {deckHeader}
          <br />
          {forceRender && <CategoriesMode deck={deck} />}
          {forceRender2 && <CategoriesMode deck={deck} />}
          <br />
          <Row className="justify-content-center">
            <Col md="auto"><Button onClick={handleNewGame}>New Game</Button></Col>
          </Row>
          <br />
          {modeSelectButtons}
          <br />
        </Container>
      )
      break;
    } 
    case AppModes.Grid: {
      display = (
        <Container fluid>
          <ScreenHeader title = "Grid Mode" />
          {deckHeader}
          <br />
          {forceRender && <GridMode deck={deck} />}
          {forceRender2 && <GridMode deck={deck} />}
          <br />
          <Row className="justify-content-center">
            <Col md="auto"><Button onClick={handleNewGame}>New Game</Button></Col>
          </Row>
          <br />
          {modeSelectButtons}
          <br />
        </Container>
      )
      break;
    } 
    case AppModes.Importing: {
      display = (
        <Container>
          <ScreenHeader title = "Import Custom Deck" />
          {importText}
          <br />
          <Form id="importForm" onSubmit={handleImport}>
            <Form.Group controlId="import.Title">
              <Form.Label>Input a title for your Custom Deck (max 30 characters)</Form.Label>
              <Form.Control as="input" onChange={e => setTitle(e.target.value)} required defaultValue={importTitle} maxLength={30}/>
            </Form.Group>
            
            <Form.Group controlId="import.Questions">
              <Form.Label>Input Custom Question Cards below (max 30,000 characters)</Form.Label>
              <Form.Control as="textarea" rows={15} onChange={e => setQn(e.target.value)} required defaultValue={importQns} maxLength={30000}/>
            </Form.Group>
            <Button type="submit">Import Deck</Button>
          </Form>
          <br />
          {mainMenuButton}
          <br />
        </Container>
      )
      break;
    } 
    case AppModes.Imported: {
      display = (
        <Container>
          <ScreenHeader title = "Custom Deck Import Results" />
          {isValidImport &&
            <div>
              <h5>{importDeck.title} imported</h5>
              <p>The following cards were imported. You can copy the following text and paste it into a file.</p>
              <ExportDeck deck={importDeck} />
            </div>}
            {!isValidImport &&
            <div>
              <h5>{importDeck.title} not imported</h5>
              <p>None of the question cards typed in were imported successfully. Please return to the import deck screen and try again.</p>
            </div>}
          {hasImportError && 
            <div>
              <p>The following question cards were not imported: </p>
              <pre>{importErrorString}</pre>
            </div>
          }
          <br />
          <Row className="justify-content-center">
            {isValidImport && <Col md="auto"><Button onClick={() => setMode(AppModes.SelectGameMode)}>Select Game Mode</Button></Col>}
            <Col md="auto"><Button onClick={() => setMode(AppModes.Importing)}>Return to Import Deck screen</Button></Col>
          </Row>
          <br />
        </Container>
      )
      break;
    } 
    case AppModes.About: {
      display = (
        <Container>
          <ScreenHeader title = "About open talk" />
          {aboutText}
          <br />
          {mainMenuButton}
        </Container>
      );
      break;
    }
    default: {
      display = <h1>Something went wrong!</h1>
    }
  }


  return (
    <div>
      {header}
      <br />
      {display}
    </div>
  );
}

export default App;