"use client";

import {useMemo, useState} from 'react';
import axios from "axios";
import {JSEncrypt} from "jsencrypt";

function encryptMessage(publicKey, message) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(String(publicKey));
  
  const encryptedMessage = encryptor.encrypt(message);
  
  if (!encryptedMessage) {
    throw new Error("Encryption failed.");
  }
  
  return encryptedMessage;
}

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [userInput, setUserInput] = useState([]);

  const getSecureKeypad = () => {
      axios.get('http://localhost:8080/api/create')
      .then(response => {
        console.info(response.data);
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
    let data = input_list.join(""); 
    console.log("user input: " + data);

    axios.post('http://localhost:8080/api/submit', {
      keypadId: keypad.keypadId,
      timeStamp: keypad.timeStamp,
      input: encryptMessage(keypad.pubKey, data),
      hash: keypad.hash,
    })
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      console.error(error);
      alert("Error submitting");
    })
    
    setTimeout(() => location.reload(), 500);
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
