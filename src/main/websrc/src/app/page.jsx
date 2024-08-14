"use client";

import React, {useEffect} from 'react';
import useSecureKeypad from '../hooks/useSecureKeypad';
import SecureKeypad from "../components/SecureKeypad";
import KeypadUserInput from "../components/KeypadUserInput.jsx";

export default function Page() {
  const { states, actions } = useSecureKeypad();

  useEffect(() => {
  }, []);

  if (states.keypad === null) {
    actions.getSecureKeypad();  
    return (
      <div>
        ...isLoading...
      </div>
    )
  } else {
    if (states.userInput.length >= 6) actions.sendUserInput(states.userInput);
    return (
      <div>
        <KeypadUserInput userInput={states.userInput}/>
        <SecureKeypad keypad={states.keypad} onKeyPressed={actions.onKeyPressed}/>
      </div>
    );
  }
}
