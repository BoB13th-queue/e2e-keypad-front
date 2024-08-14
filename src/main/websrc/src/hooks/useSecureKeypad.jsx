"use client";

import {useMemo, useState} from 'react';
import axios from "axios";
import {JSEncrypt} from "jsencrypt";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [userInput, setUserInput] = useState([]);

  const getSecureKeypad = () => {
      axios.get('http://localhost:8080/api/create')
      .then(response => {
        setKeypad(() => response.data);
      });
  }

  const onKeyPressed = (row, col) => {
    if (keypad.keyData[row * 4 + col] == " ") return;

    if (userInput.length < 6) {
      setUserInput(prevState => [...prevState, keypad.keyData[row * 4 + col]]);
    }
  }

  const sendUserInput = (input_list) => {
    alert(JSON.stringify(input_list));
    location.reload();
  }

  return {
    states: {
      keypad,
      userInput,
    },
    actions: {
      getSecureKeypad,
      onKeyPressed,
      sendUserInput
    }
  }
}
